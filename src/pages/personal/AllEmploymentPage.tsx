// pages/OverallEmploymentPage.tsx
import React from 'react';
import { ApplicationTable, ApplicationRow } from '@components/personal/ApplicationTable';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { StatusSection } from '@components/personal/StatusSection';
const dummyData: ApplicationRow[] = [
  {
    id: 1,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    date: '2025. 7. 15. 14:21',
    status: '진행중',
  },
  {
    id: 2,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    date: '2025. 7. 15. 14:21',
    status: '불합격',
  },
  {
    id: 3,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    date: '2025. 7. 15. 14:21',
    status: '최종합격',
  },
  {
    id: 4,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    date: '2025. 7. 15. 14:21',
    status: '서류합격',
  },
  {
    id: 5,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    date: '2025. 7. 15. 14:21',
    status: '서류준비중',
  },
];

const OverallEmploymentPage: React.FC = () => {
  return (
    <div className="p-[1.25vw]">
      <StatusSection />
      <div className="mb-[0.83vw] mt-[4.17vw] flex items-center gap-[0.42vw] text-bodyLg text-gray-800">
        <InformationCircleIcon className="h-[1.04vw] w-[1.04vw] shrink-0 self-center" />
        <span className="leading-none">지원한 기업들이 최신순으로 정렬되어 나열됩니다.</span>
      </div>
      <ApplicationTable rows={dummyData} />
    </div>
  );
};

export default OverallEmploymentPage;
