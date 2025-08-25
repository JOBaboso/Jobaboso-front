// src/pages/Home/HomePage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingSchedules, CalendarSchedule } from '@apis/employment';
import { ScheduleLabelMap } from '@type/Schedules';
import { ResultStyleMap, ResultLabelMap } from '@type/Result';

const HomePage = () => {
  const [userName, setUserName] = useState('');
  const [upcomingSchedules, setUpcomingSchedules] = useState<CalendarSchedule[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');

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

  // 필터 버튼 렌더링 함수
  const renderFilterButton = (icon: string, label: string) => {
    const isSelected = selectedFilter === label;
    return (
      <div 
        className={`text-[14px] border rounded-full flex gap-1 w-fit pl-[4px] pr-[7px] py-1 cursor-pointer transition-colors ${
          isSelected 
            ? 'text-mainBlue border-mainBlue bg-subLightBlue' 
            : 'text-gray-400 border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => setSelectedFilter(label)}
      >
        <img src={icon} alt={label}></img>
        <div>{label}</div>
      </div>
    );
  };

  // 목록 아이템 렌더링 함수
  const renderListItem = (
    imageUrl: string,
    category: string,
    title: string,
    locationIcon: string,
    location: string
  ) => {
    // 카테고리에 따른 스타일 결정
    let categoryStyle = "px-2 py-1 rounded-full w-fit text-[12px] ";
    if (category === "채용박람회") {
      categoryStyle += "bg-subLightBlue text-mainBlue";
    } else if (category === "취업박람회") {
      categoryStyle += "bg-[#D8FDD9] text-[#27B122]";
    } else {
      categoryStyle += "bg-subLightBlue text-mainBlue";
    }

    return (
      <div className="flex gap-5">
        <div className="w-[90px] h-[90px] bg-gray-200 rounded-lg">
          {imageUrl && <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded-xl" />}
        </div>
        <div>
          <div className={categoryStyle}>{category}</div>
          <div className="mt-1">{title}</div>
          <div className="flex gap-2 mt-1">
            <img src={locationIcon} alt="위치"></img>
            <div>{location}</div>
          </div>
        </div>
      </div>
    );
  };

  // 목록 데이터
  const listData = [
    { category: "채용박람회", title: "2025 부산광역시 장애인 진로 취업 박람회", location: "부산광역시청 1층 로비 및 대강당, 지하철 통로" },
    { category: "채용박람회", title: "2025 부산 여성 취·창업박람회", location: "부산시민공원 다솜광장(다솜마당, 동백꽃방, 고등어방)" },
    { category: "취업박람회", title: "2025 부산대학교 취업박람회", location: "부산대학교 학생회관 대강당" },
    { category: "취업박람회", title: "부산시청 공공데이터 활용 아이디어 공모전", location: "부산광역시청 3층 대회의실" },
    { category: "취업박람회", title: "2025 부산 IT 기업 채용박람회", location: "부산벡스코 제1전시장" },
    { category: "기업", title: "LG화학 부산공장 기술직 채용", location: "부산광역시 울산구 염포동 LG화학로 1" },
    { category: "취업박람회", title: "2025 부산 해양대학교 취업박람회", location: "부산해양대학교 체육관" },
    { category: "공모전", title: "부산항만공사 창업 아이디어 공모전", location: "부산항만공사 본사 2층 강당" },
    { category: "채용박람회", title: "2025 부산 중소기업 채용박람회", location: "부산시민공원 야외무대" },
    { category: "기업", title: "현대자동차 부산공장 생산직 채용", location: "부산광역시 강서구 명지동 현대로 1" },
    { category: "취업박람회", title: "2025 부산여자대학교 취업박람회", location: "부산여자대학교 대강당" },
    { category: "공모전", title: "부산시청 스마트시티 솔루션 공모전", location: "부산광역시청 4층 세미나실" },
    { category: "채용박람회", title: "2025 부산 관광업계 채용박람회", location: "부산 해운대 마린시티 컨벤션센터" },
    { category: "기업", title: "포스코 부산제철소 기술직 채용", location: "부산광역시 포항시 남구 포스코대로 626" },
    { category: "취업박람회", title: "2025 부산 동의대학교 취업박람회", location: "동의대학교 학생회관 대강당" }
  ];

  // 필터링된 데이터
  const filteredData = selectedFilter === '' 
    ? listData 
    : listData.filter(item => item.category === selectedFilter);

  return (
    <div className="w-full">
      <div className="mx-auto w-[1528px]">

        {/* 배너 */}
        <div className="mb-12 mt-8 text-[48px] font-['Paperlogy'] font-semibold text-gray-800 leading-[34px] font-['Pretendard'] border border-gray-300 bg-blue-50 justify-center flex p-12 rounded-xl">
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
          <div className="px-6 pt-6 text-gray-700 rounded-xl bg-subLightBlue">
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
            <div className="font-['Paperlogy'] text-[32px] text-white font-semibold mt-3">면접 답변 작성하기</div>
            <div className="mt-2 text-white text-bodyMd">면접 합격률을 한 단계 UP!</div>
            <div className="text-white text-bodyMd">잡메이트가 준비한 면접 문항으로 심층 면접에 대비해보세요!</div>
          </div>
        </div>

        {/* 커리어 지도*/}
        <div className="mt-20 text-gray-700">
          <div className="text-h2">부산 커리어 지도</div>
          <div className="mt-2 text-bodyMd">부산의 기업은 물론,  취업 관련 행사가 열리는 곳들까지 모아볼 수 있어요.</div>
          <div className="flex mt-3 border border-gray-300">
            <img src="/map.svg" className="w-[1000px]" alt="부산 지도"></img>
            <div className="flex justify-center p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="원하는 키워드를 검색해보세요."
                  onChange={(e) => console.log('검색:', e.target.value)}
                  className="py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg w-[480px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-[13px] w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* 필터 */}
                <div className="flex gap-2 mt-4">
                  {renderFilterButton("/ic_pin.svg", "기업")}
                  {renderFilterButton("/ic_pin.svg", "채용박람회")}
                  {renderFilterButton("/ic_pin.svg", "취업박람회")}
                  {renderFilterButton("/ic_pin.svg", "공모전")}
                </div>

                {/* 목록 */}
                <div className="max-h-[500px] overflow-y-auto mt-6">
                  {filteredData.map((item, index) => (
                    <div key={index} className={index === 0 ? "" : "mt-6"}>
                      {renderListItem(
                        "",
                        item.category,
                        item.title,
                        "/ic_pin_black.svg",
                        item.location
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 전체 너비 섹션 */}
      <div className="py-12 mt-20 w-full bg-subLightBlue">
        <div className="mx-auto w-[1528px]">
          <div className="text-h2">취업 인사이트 📊</div>
          <div className="mt-2 text-bodyMd">취업에 인사이트가 될 수 있는 정보들을 제공합니다.</div>

        </div>
      </div>

    </div>

  );
};

export default HomePage;
