import React from 'react';
import { TouchTable, TouchRow } from '@components/employment/TouchTable';
import { Callout } from '@components/common/Callout';

const dummyData: TouchRow[] = [
  {
    id: 1,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    manager: '김정윤',
    date: '2025. 7. 15. 14:21',
  },
  {
    id: 2,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    manager: '박재영',
    date: '2025. 7. 15. 14:21',
  },
  {
    id: 3,
    company: '주식회사 어쩌구',
    position: '브랜드 마케터',
    manager: '정윤찬',
    date: '2025. 7. 15. 14:21',
  },
];

const TouchPage: React.FC = () => {
  return (
    <div className="mx-auto w-[1096px]">
      <h2 className="mb-8 text-[40px] font-bold text-gray-800">찜 제안 확인</h2>
      <Callout text="기업으로부터 찜 제안을 받으면 이곳에 표시됩니다. 찜 제안을 받으면, 기업 담당자와 가능한 빨리 컨택하시는 걸 추천드려요. ☺️" />
      <h2 className="mb-2 mt-8 text-h2 font-bold text-gray-800">찜 제안</h2>
      <p className="text-body mb-6 text-gray-600">총 {dummyData.length}건</p>

      <TouchTable rows={dummyData} />
    </div>
  );
};

export default TouchPage;
