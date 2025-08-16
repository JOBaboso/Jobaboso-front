import React from 'react';
import { ReviewFormData } from './ReviewWriteForm';

interface InterviewInfoSectionProps {
  formData: ReviewFormData;
  onUpdate: (updates: Partial<ReviewFormData>) => void;
}

export const InterviewInfoSection: React.FC<InterviewInfoSectionProps> = ({ 
  formData, 
  onUpdate 
}) => {
  return (
    <>
      <div className="mb-4 text-h2">면접 정보</div>        
      <div className="mb-20">
        {/* 전반적 평가 */}
        <div className="mb-8">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            전반적 평가 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 w-[600px]">
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.overallRating === '긍정적' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ overallRating: '긍정적' })}
            >
              긍정적
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.overallRating === '보통' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ overallRating: '보통' })}
            >
              보통
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.overallRating === '부정적' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ overallRating: '부정적' })}
            >
              부정적
            </button>
          </div>
        </div>

        {/* 난이도 */}
        <div className="mb-8">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            난이도 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 w-[600px]">
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.difficulty === '쉬움' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ difficulty: '쉬움' })}
            >
              쉬움
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.difficulty === '보통' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ difficulty: '보통' })}
            >
              보통
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.difficulty === '어려움' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ difficulty: '어려움' })}
            >
              어려움
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
