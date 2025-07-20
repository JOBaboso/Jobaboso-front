// pages/OverallEmploymentPage.tsx
import React from 'react';
import { ApplicationTable, ApplicationRow } from '@components/personal/ApplicationTable';

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
    <div className="p-6">
      <p className="mb-4 text-bodyLg text-gray-800">
        지원한 기업들이 최신순으로 정렬되어 나열됩니다.
      </p>
      <ApplicationTable rows={dummyData} />
    </div>
  );
};

export default OverallEmploymentPage;
