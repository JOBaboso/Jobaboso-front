import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplication, ApplicationDetail } from '../../apis/employment';
import { InputField } from '../../components/common/InputField';
import Button from '../../components/common/Button';

interface Schedule {
  id: string;
  type: string;
  date: string;
  time: string;
}

const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 폼 상태
  const [companyName, setCompanyName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [status, setStatus] = useState('');
  
  // 지원 부문 토글 상태
  const [showPositionSelector, setShowPositionSelector] = useState(false);
  
  // 일정 입력 상태
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // 지원 부문 옵션
  const positionOptions = [
    '마케팅', '경영', '개발', '백엔드', '프론트엔드', '디자인', '기획', '영업', '인사', '재무', '법무', '연구개발', '생산', '품질관리', '구매', '물류', '고객서비스', '기타'
  ];

  // 상태 옵션
  const statusOptions = [
    '지원완료', '서류검토', '서류합격', '서류불합격', '1차면접', '2차면접', '최종합격', '최종불합격', '포기'
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
          setSelectedPosition(data.position ? [data.position] : []);
          setStatus(data.status || '');
          if (data.schedules) {
            setSchedules(data.schedules.map((schedule: any) => ({
              id: schedule.id || Math.random().toString(),
              type: schedule.type || '',
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

  // 지원 부문 토글
  const togglePosition = (position: string) => {
    if (selectedPosition.includes(position)) {
      setSelectedPosition(selectedPosition.filter(p => p !== position));
    } else {
      setSelectedPosition([...selectedPosition, position]);
    }
  };

  // 일정 추가
  const addSchedule = () => {
    if (scheduleType && scheduleDate && scheduleTime) {
      const newSchedule: Schedule = {
        id: Math.random().toString(),
        type: scheduleType,
        date: scheduleDate,
        time: scheduleTime
      };
      
      const updatedSchedules = [...schedules, newSchedule].sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });
      
      setSchedules(updatedSchedules);
      setScheduleType('');
      setScheduleDate('');
      setScheduleTime('');
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
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-[16px] border border-gray-300 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">지원서 상세</h1>
        
        <div className="space-y-6">
          {/* 기업명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기업명</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-700 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="기업명을 입력하세요"
            />
          </div>
          
          {/* 지원 부문 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지원 부문</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPositionSelector(!showPositionSelector)}
                className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-700 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue text-left flex items-center justify-between"
              >
                <span className={selectedPosition.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
                  {selectedPosition.length > 0 ? selectedPosition.join(', ') : '지원 부문을 선택하세요'}
                </span>
                <svg className={`w-5 h-5 transition-transform ${showPositionSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showPositionSelector && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    {positionOptions.map((position) => (
                      <label key={position} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedPosition.includes(position)}
                          onChange={() => togglePosition(position)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{position}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 이력서 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이력서</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                    <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-gray-500">파일을 다시 클릭하여 변경할 수 있습니다</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-medium">파일을 선택하거나 드래그하여 업로드하세요</p>
                    <p className="text-sm">PDF, DOC, DOCX 파일만 지원됩니다</p>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          {/* 취업 일정 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">취업 일정 입력</label>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                                 <select
                   value={scheduleType}
                   onChange={(e) => setScheduleType(e.target.value)}
                   className="h-[42px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-mainBlue focus:outline-none"
                 >
                   <option value="">일정 유형</option>
                   <option value="서류마감">서류마감</option>
                   <option value="서류제출">서류제출</option>
                   <option value="서류검토">서류검토</option>
                   <option value="서류합격발표">서류합격발표</option>
                   <option value="1차면접">1차면접</option>
                   <option value="2차면접">2차면접</option>
                   <option value="최종면접">최종면접</option>
                   <option value="과제제출">과제제출</option>
                   <option value="코딩테스트">코딩테스트</option>
                   <option value="최종합격발표">최종합격발표</option>
                   <option value="입사일">입사일</option>
                   <option value="기타">기타</option>
                 </select>
                
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="h-[42px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-mainBlue focus:outline-none"
                />
                
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="h-[42px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-mainBlue focus:outline-none"
                />
              </div>
              
              <Button onClick={addSchedule} className="w-full">
                일정 추가
              </Button>
            </div>
            
            {/* 일정 리스트 */}
            {schedules.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">등록된 일정</h4>
                <div className="space-y-2">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900">{schedule.type}</span>
                        <span className="text-sm text-gray-600">{schedule.date} {schedule.time}</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-700 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
            >
              <option value="">상태를 선택하세요</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* 저장 버튼 */}
          <div className="pt-4">
            <Button className="w-full">
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
