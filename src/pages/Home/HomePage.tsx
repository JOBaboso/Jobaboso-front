// src/pages/Home/HomePage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingSchedules, CalendarSchedule } from '@apis/employment';
import { ScheduleLabelMap } from '@type/Schedules';
import { ResultStyleMap, ResultLabelMap } from '@type/Result';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<CalendarSchedule[]>([]);

  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setUserName(name);
    }

    // 다가오는 취업 일정 가져오기
    const fetchUpcomingSchedules = async () => {
      try {
        const schedules = await getUpcomingSchedules(4);
        setUpcomingSchedules(schedules);
      } catch (error) {
        console.error('다가오는 취업 일정 조회 실패:', error);
      }
    };

    fetchUpcomingSchedules();
  }, []);

  // 닮은 지원자 카드 렌더링 함수
  const renderSimilarUserCard = (
    matchingPercent: number,
    company: string,
    position: string,
    status: string,
    internshipCount: number,
    certificateCount: number,
    school: string,
    major: string,
    gpa: string,
    acceptanceRate: number
  ) => (
    <div className="p-4 bg-white rounded-xl">
      <div className="border-[0.8px] border-gray-300 rounded-md bg-gray-100 flex px-1 w-fit">
        <div className="text-[12px] leading-[20px]">AI 매칭</div>
        <div className="ml-1 text-[12px] leading-[20px] font-semibold text-mainBlue">{matchingPercent}%</div>
      </div>
      <div className="flex items-center mt-4">
        <div className="text-[16px] font-semibold">{company}</div>
        <span className={`ml-2 font-medium rounded-full border px-[6px] py-[2px] text-caption ${ResultStyleMap[status as keyof typeof ResultStyleMap] || 'bg-gray-100 text-gray-600 border-gray-300'}`}>
          {ResultLabelMap[status as keyof typeof ResultLabelMap] || status}
        </span>
      </div>
      <div className="mt-2 text-bodySm">{position}</div>
      <div className="flex gap-2 items-center mt-2">
        <div className="text-gray-700 text-[10px] bg-gray-100 px-1 rounded-md">인턴 및 대외활동 {internshipCount}회</div>
        <div className="text-gray-700 text-[10px] bg-gray-100 px-1 rounded-md">자격증 {certificateCount}개</div>
      </div>
      <div className="grid grid-cols-[40px_90px] gap-2">
        <div className="text-[12px] font-medium">
          <div className="mt-4">학교</div>
          <div className="mt-2">학과</div>
          <div className="mt-2">학점</div>
          <div className="mt-2">합격률</div>
        </div>
        <div className="text-[12px]">
          <div className="mt-4">{school}</div>
          <div className="mt-2">{major}</div>
          <div className="mt-2">{gpa}</div>
          <div className="mt-2">{acceptanceRate}%</div>
        </div>                
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-[1528px]">

      {/* 배너 */}
      <div className="mb-12 mt-8 text-[48px] font-['Paperlogy'] font-semibold text-gray-800 leading-[34px] font-['Pretendard'] border border-gray-300 bg-heartOfIce justify-center flex p-12 rounded-xl">
        부산교통공사 채용관 (배너)
      </div>

      {/* 환영 메세지 */}
      <div className="text-h2">{userName} 님, 환영합니다! 🤗</div>

      {/* 맞춤 피드 */}
      <div className="grid grid-cols-[400px_700px_400px] gap-4 mt-6">
        
        {/* 다가오는 취업 일정 */}
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex justify-between items-center mb-4 text-gray-700">
            <div className="flex gap-3 items-center">
              <img src="/ic_calendar.svg"></img>
              <div className="text-h3">다가오는 취업 일정</div>
            </div>
            <Link to="/employment/calendar" className="transition-colors text-bodySm hover:text-mainBlue">캘린더 보기 ﹥</Link>
          </div>
          
          {/* 일정 목록 */}
          <div className="relative">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map((schedule, index) => (
                <div key={index} className="">                  
                  {/* 일정 내용 */}
                  <div className="p-3 ml-4">
                    <div className="flex gap-5 items-center">
                      {/* 동그라미 */}
                      <div className="relative z-10 w-2 h-2 rounded-full bg-mainBlue"></div>
                      {/* 세로 선 */}
                      <div className="absolute left-[31px] top-7 h-[205px] border-[1px] border-dashed border-gray-400"></div>
                      {/* 날짜 */}
                      <div className="text-[16px] font-semibold leading-[24px]">{new Date(schedule.start_date).toLocaleDateString('ko-KR', {
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}</div>
                    </div>
                    <div className="ml-7 text-bodyMd">{schedule.company_name} {ScheduleLabelMap[schedule.schedule_type]}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                <div className="text-sm">다가오는 일정이 없습니다</div>
              </div>
            )}
          </div>
        </div>
        
        {/* 닮은 지원자 top 3 */}
        <div className="p-6 text-gray-700 rounded-xl bg-subLightBlue">
          <div className="flex gap-3 items-center mb-2">
            <img src="/ic_person.svg"></img>
            <div className="text-h3">{userName} 님과 닮은 지원자 TOP3</div>
          </div>
          <div className="mb-6 ml-9 text-bodyMd">잡메이트가 분석한 김잡메 님과 닮은 지원자를 확인하시고 취업 준비에 매진해보세요!</div>
          <div className="flex gap-4 justify-center">
            {renderSimilarUserCard(96, "토스", "프론트엔드", "final_accepted", 8, 2, "부산대학교", "컴퓨터공학과", "4.2/4.5", 95)}
            {renderSimilarUserCard(89, "네이버", "프론트엔드", "final_accepted", 5, 3, "부산대학교", "컴퓨터공학과", "4.0/4.5", 87)}
            {renderSimilarUserCard(62, "카카오", "프론트엔드", "final_accepted", 6, 1, "부산대학교", "컴퓨터공학과", "4.1/4.5", 91)}
          </div>
        </div>

        {/* 미션 */}
        <div className="px-8 py-12 bg-gradient-to-b to-blue-300 rounded-xl from-mainBlue">
          <div className="flex justify-between">
            <div className="font-['Paperlogy'] text-[16px] text-white font-light">오늘의 미션</div>
            <Link 
              to="/mission?start=true" 
              className="bg-white rounded-full text-[14px] font-semibold py-1 px-2 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              지금 시작하기 →
            </Link>
          </div>
          <img src="/ic_mission_home.svg" className="mt-10" />
          <div className="font-['Paperlogy'] text-[32px] text-white font-semibold mt-8">면접 답변 작성하기</div>
          <div className="mt-2 text-white text-bodyMd">면접 합격률을 한 단계 UP!</div>
          <div className="text-white text-bodyMd">잡메이트가 준비한 면접 문항으로 심층 면접에 대비해보세요!</div>
        </div>
      </div>

    </div>

  );
};

export default HomePage;
