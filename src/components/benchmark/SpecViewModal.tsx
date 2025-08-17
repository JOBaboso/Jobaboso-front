import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Result, ResultLabelMap, ResultStyleMap } from '../../type/Result';

interface SpecViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  specData: {
    company: string;
    position: string;
    internships: string;
    certificates: string;
    university: string;
    major: string;
    gpa: string;
    gpaScale: string;
    acceptanceRate: string;
    result: Result;
  };
}

const SpecViewModal: React.FC<SpecViewModalProps> = ({ isOpen, onClose, specData }) => {
  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl w-[1100px] max-h-[90vh] p-3">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6">
          <div className="text-h2">스펙 보기</div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* 중간 내용 */}
        <div className="grid grid-cols-[110px_870px] gap-8 p-6">
          {/* 왼쪽: 라벨 */}
          <div className="space-y-4">
            <div className="text-[16px] font-semibold py-1">기업명</div>
            <div className="text-[16px] font-semibold py-1">직무</div>
            <div className="text-[16px] font-semibold py-1">인턴 및 대외활동</div>
            <div className="text-[16px] font-semibold py-1">자격증</div>
            <div className="text-[16px] font-semibold py-1">취업후기</div>
          </div>
          
          {/* 오른쪽: 값 */}
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <div className="py-1 pr-1 text-gray-600 text-bodyLg">{specData.company}</div>
              <span className={`font-medium rounded-full border px-[8px] py-[1px] text-bodySm ${ResultStyleMap[specData.result]}`}>
                {ResultLabelMap[specData.result]}
              </span>
            </div>
            <div className="py-1 text-bodyLg">{specData.position}</div>
            <div className="py-1 text-bodyLg">{specData.internships}</div>
            <div className="py-1 text-bodyLg">{specData.certificates}</div>
            <div className="py-1 rounded-xl border border-gray-200 text-bodyLg h-[310px] w-[850px]">
              <div className="p-4 leading-relaxed text-gray-700 h-[300px] w-[840px] overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <p className="mb-4">
                  토스 프론트엔드 개발자 면접을 준비하면서 가장 중요했던 것은 기술적 깊이와 실무 경험이었습니다. 
                  면접은 총 1시간 정도 진행되었고, React와 JavaScript 기초부터 브라우저 렌더링 원리, 
                  비동기 처리까지 폭넓게 다뤘습니다.
                </p>
                <p className="mb-4">
                  가장 기억에 남는 질문은 "React에서 상태 관리가 왜 필요한가?"였습니다. 
                  이 질문에 답할 때는 props drilling 문제가 프로젝트가 커질수록 발생한다는 점을 설명하고, 
                  Redux를 사용해 서버 상태와 클라이언트 상태를 분리하고, 
                  React Query와 Context API로 성능을 개선하는 전략을 제시했습니다.
                </p>
                <p className="mb-4">
                  모르는 질문이 나왔을 때는 솔직하게 모른다고 하되, 
                  생각하는 과정을 설명하는 것이 중요했습니다. 
                  일부 기업에서는 코딩 테스트 대신 프론트엔드 과제를 주기도 했는데, 
                  코드 구조화와 협업 능력을 중점적으로 평가받았습니다.
                </p>
                <div className="text-right text-gray-500 text-bodyMd">(3,012자)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 학력 및 합격률 */}
        <div className="w-[994px] p-6 m-6 bg-gray-100 rounded-xl">
          <div className="mb-4 text-[16px] font-semibold">학력 및 합격률</div>
          <div className="space-y-3">
            <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
              <img src="/benchmark/ic_school.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[2px]" alt="학교 아이콘"></img>
              <span>{specData.university} {specData.major}</span>
            </div>
            <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
              <img src="/benchmark/ic_book.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[4px]" alt="책 아이콘"></img>
              <span>{specData.gpa}/{specData.gpaScale}</span>
            </div>
            <div className="flex gap-2 items-center text-gray-600 text-bodyLg">
              <img src="/benchmark/ic_paperplane.svg" className="h-[25px] w-[25px] rounded-full bg-subLightBlue p-[4px]" alt="종이비행기 아이콘"></img>
              <span>합격률 {specData.acceptanceRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecViewModal;
