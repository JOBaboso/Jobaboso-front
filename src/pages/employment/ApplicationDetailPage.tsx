import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getApplication,
  ApplicationDetail,
  DocumentResponse as Document,
  Schedule,
  updateApplication,
  createSchedules,
  getApplicationSchedules,
  deleteSchedule,
  ScheduleResponse,
  uploadDocuments,
  deleteDocument,
  downloadDocument,
  getDocumentViewUrl,
  DocumentResponse,
} from '../../apis/employment';
import { Status, StatusLabelMap, StatusStyleMap } from '../../type/Status';
import { Schedule as ScheduleType, ScheduleLabelMap, ScheduleStyleMap } from '../../type/Schedules';
import { Result, ResultLabelMap, ResultStyleMap } from '../../type/Result';
import Button from '../../components/common/Button';
import Dropdown from '../../components/common/Dropdown';
import { TrashIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import DocumentViewModal from '../../components/employment/DocumentViewModal';

interface ScheduleItem {
  id: string;
  type: ScheduleType;
  start_date: string;
  end_date: string;
  notes?: string;
}

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // 폼 상태
  const [companyName, setCompanyName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [status, setStatus] = useState<Status>('preparing_documents');
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);

  // 일정 입력 상태
  const [scheduleType, setScheduleType] = useState<ScheduleType>('document_deadline');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scheduleNotes, setScheduleNotes] = useState('');

  // 지원 일시 상태
  const [applicationDate, setApplicationDate] = useState('');

  // 문서 관련 상태
  const [uploadingDocuments, setUploadingDocuments] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState<number | null>(null);
  const [viewingDocument, setViewingDocument] = useState<{ id: number; name: string; url: string } | null>(null);
  const [documentTypes, setDocumentTypes] = useState<string[]>([]);

  // 지원 부문 옵션
  const positionOptions = [
    'SW개발',
    'AI/ML',
    '데이터분석',
    '클라우드/인프라',
    '보안',
    '네트워크',
    '하드웨어개발',
    '반도체설계',
    '제품기획',
    'UX/UI디자인',
    '마케팅',
    '영업',
    '고객지원',
    '인사',
    '재무',
    '법무',
    '구매/자재',
    '물류/운송',
    '품질관리',
    '생산관리',
    '연구개발',
    '기술지원',
    '기타',
  ];

  // 상태 옵션 (Status 타입 사용)
  const statusOptions: Status[] = [
    'preparing_documents',
    'documents_submitted',
    'documents_under_review',
    'documents_passed',
    'documents_failed',
    'preparing_test',
    'test_completed',
    'test_under_review',
    'test_passed',
    'test_failed',
    'preparing_assignment',
    'assignment_submitted',
    'assignment_under_review',
    'assignment_passed',
    'assignment_failed',
    'preparing_interview',
    'interview_completed',
    'interview_under_review',
    'interview_passed',
    'interview_failed',
    'final_accepted',
    'final_rejected',
    'offer_declined',
  ];

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getApplication(parseInt(id));
        setApplication(data);

        // 기존 데이터로 폼 초기화
        if (data) {
          setCompanyName(data.company_name || '');
          setSelectedPosition(data.position || '');
          setStatus((data.status as Status) || 'preparing_documents');
          setApplicationDate(data.application_date ? data.application_date.split('T')[0] : '');
          // Document 타입을 DocumentResponse로 변환
          const convertedDocuments = (data.documents || []).map((doc: any) => ({
            id: doc.id,
            application_id: parseInt(id),
            document_type: 'resume',
            file_name: doc.name || 'document',
            file_size: 0,
            original_name: doc.name || 'document',
            uploaded_at: doc.uploaded_at || new Date().toISOString(),
            download_url: doc.file_url || '',
            view_url: doc.file_url || '',
          }));
          setDocuments(convertedDocuments);
        }

        // 일정 데이터 별도로 조회
        await fetchSchedules();
      } catch (err) {
        setError('지원서를 불러오는데 실패했습니다.');
        console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // 일정 데이터 조회
  const fetchSchedules = async () => {
    if (!id) return;

    try {
      const schedulesData = await getApplicationSchedules(parseInt(id));
      const formattedSchedules = schedulesData.schedules.map((schedule: ScheduleResponse) => ({
        id: schedule.id.toString(),
        type: (schedule.schedule_type as ScheduleType) || 'document_deadline',
        start_date: schedule.start_date,
        end_date: schedule.end_date,
        notes: schedule.notes,
      }));
      setSchedules(formattedSchedules);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    }
  };

  // 일정 추가
  const addSchedule = async () => {
    if (!id || !scheduleType || !startDate) return;

    try {
      const newSchedule = {
        schedule_type: scheduleType,
        start_date: `${startDate}T09:00:00.000Z`,
        end_date: endDate ? `${endDate}T18:00:00.000Z` : `${startDate}T18:00:00.000Z`,
        notes: scheduleNotes || '',
      };

      const createdSchedules = await createSchedules(parseInt(id), [newSchedule]);

      if (createdSchedules.length > 0) {
        const newScheduleItem: ScheduleItem = {
          id: createdSchedules[0].id.toString(),
          type: scheduleType,
          start_date: startDate,
          end_date: endDate || startDate,
          notes: scheduleNotes,
        };

        const updatedSchedules = [...schedules, newScheduleItem].sort((a, b) => {
          const dateA = new Date(a.start_date);
          const dateB = new Date(b.start_date);
          return dateA.getTime() - dateB.getTime();
        });

        setSchedules(updatedSchedules);
        setScheduleType('document_deadline');
        setStartDate('');
        setEndDate('');
        setScheduleNotes('');
      }
    } catch (err) {
      console.error('Error adding schedule:', err);
      alert('일정 추가에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 일정 삭제
  const removeSchedule = async (scheduleId: string) => {
    if (!id) return;

    try {
      await deleteSchedule(parseInt(id), parseInt(scheduleId));
      setSchedules(schedules.filter((schedule) => schedule.id !== scheduleId));
    } catch (err) {
      console.error('Error deleting schedule:', err);
      alert('일정 삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
      
      // 새로 추가된 파일들에 대한 문서 타입 초기화
      const newDocumentTypes = newFiles.map(() => 'resume');
      setDocumentTypes((prev) => [...prev, ...newDocumentTypes]);
      
      // input 초기화
      e.target.value = '';
    }
  };

  // 파일 삭제 핸들러
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDocumentTypes((prev) => prev.filter((_, i) => i !== index));
  };

  // 문서 업로드 핸들러
  const handleDocumentUpload = async () => {
    if (!id || files.length === 0) return;

    try {
      setUploadingDocuments(true);
      
      // 문서 타입이 설정되지 않은 경우 기본값 설정
      const types = documentTypes.length > 0 ? documentTypes : files.map(() => 'resume');
      
      const uploadedDocuments = await uploadDocuments(parseInt(id), files, types);
      
      // 기존 문서 목록에 새로 업로드된 문서들 추가
      setDocuments((prev) => [...prev, ...uploadedDocuments]);
      
      // 파일 목록과 문서 타입 초기화
      setFiles([]);
      setDocumentTypes([]);
      
      alert('문서가 성공적으로 업로드되었습니다.');
    } catch (err) {
      console.error('Error uploading documents:', err);
      alert('문서 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUploadingDocuments(false);
    }
  };

  // 문서 삭제 핸들러
  const handleDocumentDelete = async (documentId: number) => {
    if (!id || !confirm('정말로 이 문서를 삭제하시겠습니까?')) return;

    try {
      setDeletingDocument(documentId);
      await deleteDocument(parseInt(id), documentId);
      
      // 문서 목록에서 삭제된 문서 제거
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      
      alert('문서가 삭제되었습니다.');
    } catch (err) {
      console.error('Error deleting document:', err);
      alert('문서 삭제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setDeletingDocument(null);
    }
  };

  // 문서 다운로드 핸들러
  const handleDocumentDownload = async (documentId: number, fileName: string) => {
    if (!id) return;

    try {
      const downloadUrl = await downloadDocument(parseInt(id), documentId);
      
      // 다운로드 링크 생성 및 클릭
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading document:', err);
      alert('문서 다운로드에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 문서 보기 핸들러
  const handleDocumentView = async (documentId: number, fileName: string) => {
    if (!id) return;

    try {
      const viewUrl = await getDocumentViewUrl(parseInt(id), documentId);
      setViewingDocument({ id: documentId, name: fileName, url: viewUrl });
    } catch (err) {
      console.error('Error getting document view URL:', err);
      alert('문서 보기에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 문서 타입 변경 핸들러
  const handleDocumentTypeChange = (index: number, type: string) => {
    const newTypes = [...documentTypes];
    newTypes[index] = type;
    setDocumentTypes(newTypes);
  };

  // 지원하기 버튼 클릭 핸들러
  const handleSubmit = async () => {
    if (!id || !application) return;

    try {
      setUpdating(true);

      // API 요청 데이터 준비
      const updateData = {
        company_name: companyName,
        position: selectedPosition,
        application_date: applicationDate
          ? `${applicationDate}T00:00:00.000Z`
          : new Date().toISOString(),
        status: status,
      };

      // 지원서 수정 API 호출
      const updatedApplication = await updateApplication(parseInt(id), updateData);

      // 성공 메시지 표시 (실제로는 토스트나 알림 컴포넌트 사용 권장)
      alert('지원 정보가 성공적으로 수정되었습니다.');

      // 업데이트된 데이터로 상태 갱신 (documents와 schedules는 유지)
      setApplication({
        ...updatedApplication,
        documents: application.documents,
        schedules: application.schedules,
      });
    } catch (err) {
      console.error('Error updating application:', err);
      alert('지원 정보 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">{error || '지원서를 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 지원 정보 카드 */}
      <div className="mb-6 rounded-[16px] border border-gray-300 bg-white p-8">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">{companyName} 입사지원</h2>
          <div className="mb-2 flex items-center gap-3">
            <span className="text-lg font-bold text-blue-600">
              {selectedPosition || '지원 부문 미선택'}
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
              <span className="text-xs font-bold text-white">S</span>
            </div>
          </div>
          <p className="text-gray-600">신입·경력 학력무관·서울</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="mb-3 block text-h4 font-semibold text-gray-600">지원 일시</label>
            <input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              className="h-[46px] w-full rounded-lg border border-gray-300 bg-white px-6 py-2 text-bodyLg text-gray-900 focus-within:border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-300"
              placeholder="지원 일시를 선택해주세요."
            />
          </div>

          {/* 지원부문 */}
          <div>
            <label className="mb-3 block text-h4 font-semibold text-gray-600">지원부문</label>
            <Dropdown
              options={positionOptions.map((pos) => ({ value: pos, label: pos }))}
              value={selectedPosition}
              onChange={setSelectedPosition}
              placeholder="지원 부문을 선택해주세요."
            />
          </div>

          {/* 이력서 및 첨부 문서 */}
          <div>
            <label className="mb-3 block text-h4 font-semibold text-gray-600">
              이력서 및 첨부 문서
            </label>

            {/* 기존 첨부 문서 표시 */}
            {documents.length > 0 && (
              <div className="mb-4 space-y-2">
                <div className="mb-1 block text-bodyMd text-gray-600">기존 첨부 문서:</div>
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{doc.original_name}</span>
                      <span className="text-xs text-gray-500">{doc.uploaded_at}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDocumentView(doc.id, doc.original_name)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <EyeIcon className="h-4 w-4" />
                        보기
                      </button>
                      <button
                        onClick={() => handleDocumentDownload(doc.id, doc.original_name)}
                        className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        다운로드
                      </button>
                      <button
                        onClick={() => handleDocumentDelete(doc.id)}
                        disabled={deletingDocument === doc.id}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <TrashIcon className="h-4 w-4" />
                        {deletingDocument === doc.id ? '삭제 중...' : '삭제'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-mainBlue">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
                id="resume-upload"
                multiple
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-400 mb-4 text-bodyMd text-gray-600">
                    첨부할 파일을 여기에 끌어다 놓거나, 파일 첨부 버튼을 클릭해주세요.
                  </p>
                  <div className="flex items-center gap-2 rounded-lg border border-mainBlue bg-white px-6 py-2 text-mainBlue">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    파일 첨부
                  </div>
                </div>
              </label>
            </div>

            {/* 등록된 문서 리스트 */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="mb-1 block text-bodyMd text-gray-600">등록된 문서</div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={documentTypes[index] || 'resume'}
                          onChange={(e) => handleDocumentTypeChange(index, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="resume">이력서</option>
                          <option value="cover_letter">자기소개서</option>
                          <option value="portfolio">포트폴리오</option>
                          <option value="certificate">자격증</option>
                          <option value="other">기타</option>
                        </select>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleDocumentUpload}
                    disabled={uploadingDocuments}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {uploadingDocuments ? '업로드 중...' : '문서 업로드'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 취업 일정 입력 */}
          <div>
            <label className="mb-3 block text-h4 font-semibold text-gray-600">취업 일정 입력</label>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <div className="mb-1 block text-bodyMd text-gray-600">일정 유형</div>
                  <Dropdown
                    options={Object.entries(ScheduleLabelMap).map(([key, label]) => ({
                      value: key,
                      label,
                    }))}
                    value={scheduleType}
                    onChange={(value) => setScheduleType(value as ScheduleType)}
                    placeholder="일정의 유형을 선택해주세요."
                  />
                </div>
                <div>
                  <div className="mb-1 block text-bodyMd text-gray-600">시작일</div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-[46px] w-full rounded-lg border border-gray-300 bg-white px-6 py-2 text-bodyLg text-gray-900 focus-within:border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-300"
                    placeholder="시작일을 선택해주세요."
                  />
                </div>
                <div>
                  <div className="mb-1 block text-bodyMd text-gray-600">종료일</div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="h-[46px] w-full rounded-lg border border-gray-300 bg-white px-6 py-2 text-bodyLg text-gray-900 focus-within:border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-300"
                    placeholder="종료일을 선택해주세요."
                  />
                </div>
                <div>
                  <div className="mb-1 block text-bodyMd text-gray-600">메모</div>
                  <input
                    type="text"
                    value={scheduleNotes}
                    onChange={(e) => setScheduleNotes(e.target.value)}
                    className="h-[46px] w-full rounded-lg border border-gray-300 bg-white px-6 py-2 text-bodyLg text-gray-900 focus-within:border-gray-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-300"
                    placeholder="메모를 입력하세요"
                  />
                </div>
                <div>
                  <div className="mb-1 block text-bodyMd text-gray-600">&nbsp;</div>
                  <button
                    onClick={addSchedule}
                    disabled={!startDate}
                    className="h-[46px] w-full rounded-lg bg-mainBlue text-white hover:bg-subDarkBlue disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    일정 추가
                  </button>
                </div>
              </div>
            </div>

            {/* 일정 리스트 */}
            {schedules.length > 0 && (
              <div className="mt-6">
                <div className="mb-1 block text-bodyMd text-gray-600">등록된 일정</div>
                <div className="space-y-2">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${ScheduleStyleMap[schedule.type]}`}
                        >
                          {ScheduleLabelMap[schedule.type]}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {schedule.start_date.split('T')[0]}
                            {schedule.end_date &&
                              schedule.start_date.split('T')[0] !==
                                schedule.end_date.split('T')[0] && (
                                <span className="text-gray-600">
                                  {' '}
                                  ~ {schedule.end_date.split('T')[0]}
                                </span>
                              )}
                          </span>
                        </div>
                        {schedule.notes && (
                          <span className="text-sm text-gray-500">({schedule.notes})</span>
                        )}
                      </div>
                      <button
                        onClick={() => removeSchedule(schedule.id)}
                        className="mr-4 text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 상태 */}
          <div>
            <label className="mb-3 block text-h4 font-semibold text-gray-600">상태</label>
            <Dropdown
              options={statusOptions.map((status) => ({
                value: status,
                label: StatusLabelMap[status],
              }))}
              value={status}
              onChange={(value) => setStatus(value as Status)}
              placeholder="상태를 선택해주세요."
            />
          </div>
        </div>
        {/* 지원하기 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={updating || !selectedPosition || !applicationDate}
            className="mt-14 rounded-lg bg-mainBlue px-10 py-2 text-h4 text-white hover:bg-subDarkBlue disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {updating ? '수정 중...' : '지원하기'}
          </button>
        </div>
      </div>

      {/* 문서 보기 모달 */}
      <DocumentViewModal
        isOpen={!!viewingDocument}
        onClose={() => setViewingDocument(null)}
        documentUrl={viewingDocument?.url || ''}
        documentName={viewingDocument?.name || ''}
      />
    </div>
  );
};

export default ApplicationDetailPage;
