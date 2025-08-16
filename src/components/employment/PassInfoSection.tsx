import React from 'react';
import { ReviewFormData } from './ReviewWriteForm';

interface PassInfoSectionProps {
  formData: ReviewFormData;
  onUpdate: (updates: Partial<ReviewFormData>) => void;
}

export const PassInfoSection: React.FC<PassInfoSectionProps> = ({ 
  formData, 
  onUpdate 
}) => {
  return (
    <>
      <div className="mb-4 text-h2">합격 정보</div>        
      <div className="mb-20">
        {/* 면접 질문 */}
        <div className="mb-6">
          <label className="block pb-3 pl-1 font-medium text-gray-700 text-h4">
            면접 질문 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 z-10 transform -translate-y-1/2">
                <span className="font-bold text-h4 text-mainBlue">Q.</span>
              </div>
              <input
                type="text"
                placeholder="면접 질문을 입력하세요"
                value={formData.interviewQuestion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  onUpdate({ interviewQuestion: e.target.value })
                }
                className="w-[1096px] h-[66px] pl-12 pr-4 border border-gray-200 rounded-lg text-h4 text-gray-700 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue bg-white"
              />
            </div>
          </div>
        </div>

        {/* 면접 후기 */}
        <div className="mb-6">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            면접 후기 <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="면접의 분위기, 답변 예시 등을 공유해 주세요! 면접 준비자들에게 큰 도움이 될 거예요."
            value={formData.interviewReview}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
              onUpdate({ interviewReview: e.target.value })
            }
            className="p-4 w-[1096px] h-[200px] placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-gray-200 resize-none text-h4 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
          />
        </div>

        {/* 합격 여부 */}
        <div className="mb-8">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            합격 여부 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 w-[800px]">
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.passStatus === '최종합격' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ passStatus: '최종합격' })}
            >
              최종합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.passStatus === '2차합격' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ passStatus: '2차합격' })}
            >
              2차합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.passStatus === '1차합격' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ passStatus: '1차합격' })}
            >
              1차합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${formData.passStatus === '불합격' ? 'border-mainBlue text-mainBlue bg-subLightBlue' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => onUpdate({ passStatus: '불합격' })}
            >
              불합격
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
