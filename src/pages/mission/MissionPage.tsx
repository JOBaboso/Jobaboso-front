import React from 'react';
import { todayMission, missionHistory } from '@mocks/missionData';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const MissionPage: React.FC = () => {
  // 로컬스토리지에서 사용자 이름 가져오기
  const userName = localStorage.getItem('name') || '사용자';

  return (
    <div>
      {/* 헤더 섹션 */}
      <p className="mb-4 text-h2 text-gray-800">{userName} 님을 위한 오늘의 미션</p>

      {/* 오늘의 미션 카드 */}
      <div className="mb-20 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 py-4 pl-12 text-white">
        <div className="flex items-center justify-between">
          {/* 1. 미션 아이콘 */}
          <div className="flex items-center">
            <img src={todayMission.icon} alt="미션 아이콘" className="h-40 w-36" />
          </div>

          {/* 2. title, description 수직 정렬 */}
          <div className="mx-8 flex-1">
            <h2 className="mb-4 text-3xl font-semibold">{todayMission.title}</h2>
            <div className="flex items-center justify-between">
              <p className="whitespace-pre-line text-bodyLg">{todayMission.description}</p>
              <button className="rounded-[999px] bg-white px-6 py-2 text-lg font-bold leading-[26px] text-gray-700 transition-colors hover:bg-blue-50">
                {todayMission.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 미션 히스토리 섹션 */}
      <div className="mb-8">
        <h2 className="mb-2 text-h2 text-gray-800">나의 미션 히스토리</h2>
        <p className="flex items-center gap-1 text-bodyLg text-gray-800">
          <InformationCircleIcon className="h-5 w-5" />
          내가 했던 미션들이 최신순으로 노출돼요.
        </p>
      </div>

      {/* 미션 히스토리 그리드 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {missionHistory.map((mission) => (
          <div
            key={mission.id}
            className="rounded-[16px] border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-lg"
          >
            <p className="mb-2 text-sm text-gray-500">{mission.date}</p>
            <h3 className="mb-4 text-h2 font-semibold text-gray-600">{mission.title}</h3>
            <p className="mb-3 text-h4 text-gray-500">
              <span className="text-mainBlue">Q. </span>
              {mission.question}
            </p>
            <p className="line-clamp-4 text-sm text-gray-600">{mission.content}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-lg">‹</span>
          </button>
          <span className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white">
            01
          </span>
          <button className="text-gray-500 hover:text-gray-700">
            <span className="text-lg">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;
