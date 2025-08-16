import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplication, ApplicationDetail } from '../../apis/employment';
import { Status, StatusLabelMap, StatusStyleMap } from '../../type/Status';
import { Schedule, ScheduleLabelMap, ScheduleStyleMap } from '../../type/Schedules';
import { Result, ResultLabelMap, ResultStyleMap } from '../../type/Result';
import Button from '../../components/common/Button';
import Dropdown from '../../components/common/Dropdown';

interface ScheduleItem {
  id: string;
  type: Schedule;
  date: string;
  time: string;
}

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 폼 상태
  const [companyName, setCompanyName] = useState('삼성전자(주)');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [status, setStatus] = useState<Status>('preparing_documents');
  
  // 일정 입력 상태
  const [scheduleType, setScheduleType] = useState<Schedule>('document_deadline');
  const [scheduleDate, setScheduleDate] = useState('');

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
    '기타'
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
    'offer_declined'
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
          setCompanyName(data.company_name || '삼성전자(주)');
          setSelectedPosition(data.position || '');
          setStatus((data.status as Status) || 'preparing_documents');
          if (data.schedules) {
            setSchedules(data.schedules.map((schedule: any) => ({
              id: schedule.id || Math.random().toString(),
              type: (schedule.type as Schedule) || 'document_deadline',
              date: schedule.date || '',
              time: schedule.time || ''
            })));
          }
        }
      } catch (err) {
        setError('지원서를 불러오는데 실패했습니다.');
        console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  // 일정 추가
  const addSchedule = () => {
    if (scheduleType && scheduleDate) {
      const newSchedule: ScheduleItem = {
        id: Math.random().toString(),
        type: scheduleType,
        date: scheduleDate,
        time: '09:00'
      };
      
      const updatedSchedules = [...schedules, newSchedule].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
      
      setSchedules(updatedSchedules);
      setScheduleType('document_deadline');
      setScheduleDate('');
    }
  };

  // 일정 삭제
  const removeSchedule = (scheduleId: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
  };

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">{error || '지원서를 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
<div className="space-y-6">

        {/* 지원 정보 카드 */}
        <div className="bg-white rounded-[16px] border border-gray-300 p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{companyName} 입사지원</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-blue-600">삼성전자 각 부문 공개 채용</span>
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
            </div>
            <p className="text-gray-600">신입·경력 학력무관·서울</p>
          </div>

          <div className="space-y-8">
            {/* 지원부문 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">지원부문</label>
              <Dropdown
                options={positionOptions.map(pos => ({ value: pos, label: pos }))}
                value={selectedPosition}
                onChange={setSelectedPosition}
                placeholder="지원 부문을 선택해주세요."
                label="지원 부문"
              />
            </div>

            {/* 이력서 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">이력서</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  {resumeFile ? (
                    <div className="text-green-600">
                      <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xl font-medium mb-2">{resumeFile.name}</p>
                      <p className="text-gray-500">파일을 다시 클릭하여 변경할 수 있습니다</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-lg font-medium mb-2">첨부할 파일을 여기에 끌어다 놓거나, 파일 첨부 버튼을 클릭해주세요.</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                        파일 첨부
                      </Button>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* 취업 일정 입력 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">취업 일정 입력</label>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Dropdown
                      options={Object.entries(ScheduleLabelMap).map(([key, label]) => ({ value: key, label }))}
                      value={scheduleType}
                      onChange={(value) => setScheduleType(value as Schedule)}
                      placeholder="일정의 유형을 선택해주세요."
                      label="일정 유형"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">일시</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="h-[42px] w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                      placeholder="일정이 예정된 날짜를 선택해주세요."
                    />
                  </div>
                </div>
                
                <Button onClick={addSchedule} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  일정 추가
                </Button>
              </div>

              {/* 일정 리스트 */}
              {schedules.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">등록된 일정</h4>
                  <div className="space-y-2">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${ScheduleStyleMap[schedule.type]}`}>
                            {ScheduleLabelMap[schedule.type]}
                          </span>
                          <span className="text-sm text-gray-600">{schedule.date}</span>
                        </div>
                        <button
                          onClick={() => removeSchedule(schedule.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 상태 */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">상태</label>
              <Dropdown
                options={statusOptions.map(status => ({ value: status, label: StatusLabelMap[status] }))}
                value={status}
                onChange={(value) => setStatus(value as Status)}
                placeholder="상태를 선택해주세요."
                label="상태"
              />
            </div>
          </div>
        </div>

        {/* 지원하기 버튼 */}
        <div className="flex justify-end">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg">
            지원하기
          </Button>
        </div>
      </div>
  );
};

export default ApplicationDetailPage;
