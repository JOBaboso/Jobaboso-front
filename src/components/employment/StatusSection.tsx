// components/OverallStatusSection.tsx
import React from 'react';
import { StatusCard } from './StatusCard';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  UsersIcon,
  TrophyIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

export const StatusSection = () => {
  const dummyData = {
    지원완료: '21곳',
    자소서: '21개',
    서류합격: '13곳',
    면접: '3회',
    최종합격: '2개',
    찜: '3회',
  };

  return (
    <section className="space-y-4">
      <h2 className="mb-8 text-[40px] font-bold text-gray-800">전체 지원 현황</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatusCard
          icon={<CheckCircleIcon className="h-5 w-5 text-[#27B122]" />}
          label="지원 완료"
          value={dummyData.지원완료}
        />
        <StatusCard
          icon={<DocumentTextIcon className="h-5 w-5 text-[#E66B32]" />}
          label="준비한 자소서"
          value={dummyData.자소서}
        />
        <StatusCard
          icon={<BriefcaseIcon className="h-5 w-5 text-[#1779FA]" />}
          label="서류 합격"
          value={dummyData.서류합격}
        />
        <StatusCard
          icon={<UsersIcon className="h-5 w-5 text-[#81529D]" />}
          label="면접"
          value={dummyData.면접}
        />
        <StatusCard
          icon={<TrophyIcon className="h-5 w-5 text-[#EABB25]" />}
          label="최종 합격"
          value={dummyData.최종합격}
        />
        <StatusCard
          icon={<HeartIcon className="h-5 w-5 text-[#E5522D]" />}
          label="찜"
          value={dummyData.찜}
        />
      </div>
    </section>
  );
};
