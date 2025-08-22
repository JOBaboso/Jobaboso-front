import React, { useState } from 'react';
import { Result, ResultLabelMap, ResultStyleMap } from '../../type/Result';
import SpecViewModal from './SpecViewModal';
import { deductPointsForPost } from '@apis/points';

interface SpecCardProps {
  company: string;
  position: string;
  internships: string;
  certificates: string;
  university: string;
  major: string;
  gpa: string;
  gpaScale: string;
  acceptanceRate: string;
  pointCost: number;
  result: Result;
}

const SpecCard: React.FC<SpecCardProps> = ({
  company,
  position,
  internships,
  certificates,
  university,
  major,
  gpa,
  gpaScale,
  acceptanceRate,
  pointCost,
  result,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = async () => {
    try {
      // 포인트 차감
      await deductPointsForPost();
      // 성공하면 모달 열기
      setIsModalOpen(true);
      // 포인트 새로고침
      if ((window as any).refreshBenchmarkPoints) {
        (window as any).refreshBenchmarkPoints();
      }
    } catch (error) {
      console.error('포인트 차감 실패:', error);
      alert('포인트 차감에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-6 bg-white rounded-2xl border border-gray-200 transition-shadow hover:shadow-md">
        {/* 헤더 섹션 */}
        <div className="flex items-center mb-4">
          <div className="text-gray-600 text-[18px] font-semibold">{company}</div>
          <div className="mx-1 text-gray-600">·</div>
          <div className="text-gray-600 text-[16px] font-normal mr-3">{position}</div>
          <span className={`font-medium rounded-full border px-[8px] py-[1px] text-bodySm ${ResultStyleMap[result]}`}>
            {ResultLabelMap[result]}
          </span>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-2 items-center">
            <div className="text-gray-700 bg-gray-200 text-bodyMd px-[8px] py-[2px] rounded-lg">{internships}</div>
            <div className="text-gray-700 bg-gray-200 text-bodyMd px-[8px] py-[2px] rounded-lg">{certificates}</div>
          </div>
          <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
            <img src="/benchmark/ic_school.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[2px]" alt="학교 아이콘"></img>
            <span>{university} {major}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
            <img src="/benchmark/ic_book.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[4px]" alt="책 아이콘"></img>
            <span>{gpa}/{gpaScale}</span>
          </div>
          <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
            <img src="/benchmark/ic_paperplane.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[4px]" alt="종이비행기 아이콘"></img>
            <span>합격률 {acceptanceRate}</span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <button 
          onClick={handleOpenModal}
          className="group flex items-center justify-center w-full gap-2 px-4 py-3 text-[18px] font-semibold transition-colors rounded-lg text-mainBlue bg-subLightBlue hover:bg-blue-600 hover:text-white"
        >
          <img src="/benchmark/ic_lock.svg" className="h-[20px] w-[20px] transition group-hover:invert group-hover:brightness-0" alt="자물쇠 아이콘"></img>
          <span>{pointCost}포인트로 열람하기</span>
        </button>
      </div>

      {/* 스펙 보기 모달 */}
      <SpecViewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        specData={{
          company,
          position,
          internships,
          certificates,
          university,
          major,
          gpa,
          gpaScale,
          acceptanceRate,
          result,
        }}
      />
    </>
  );
};

export default SpecCard;
