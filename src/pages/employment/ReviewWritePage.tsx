import React, { useState } from 'react';
import { InputField } from '@components/common/InputField';
import Button from '@components/common/Button';

const ReviewWritePage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [positions, setPositions] = useState<string[]>([]);
  const [positionInput, setPositionInput] = useState('');
  const [interviewExperience, setInterviewExperience] = useState<'newcomer' | 'experienced' | null>(null);
  const [interviewYear, setInterviewYear] = useState('2025');
  const [interviewMonth, setInterviewMonth] = useState('8');
  const [overallRating, setOverallRating] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [interviewQuestion, setInterviewQuestion] = useState('');
  const [interviewReview, setInterviewReview] = useState('');

  const handleSearchCompany = () => {
    // TODO: 기업 검색 로직 구현
    console.log('기업 검색:', companyName);
  };

  const handleSearchPosition = () => {
    // TODO: 직무 검색 로직 구현
    console.log('직무 검색:', positionInput);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 3; i <= currentYear + 5; i++) {
      years.push(String(i));
    }
    return years;
  };

  const generateMonths = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(String(i));
    }
    return months;
  };

  return (
    <div className="w-full">
      
      {/* 기업 정보 */}
      <div className="mb-4 text-h2">기업 정보</div>
      <div className="mb-20">
        {/* 기업명 입력 및 검색 */}
        <div className="mb-6">
          <div className="flex items-center w-[1096px] gap-4">
            <InputField
              id="company-search"
              label="기업명 *"
              placeholder="기업명을 입력하세요."
              value={companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
              className="w-[880px] !mx-0"
            />
            <Button onClick={handleSearchCompany} className="h-[66px] mt-5 rounded-lg w-auto px-[16px] !bg-white !border !border-mainBlue !text-mainBlue">
              입사지원 기업 검색하기
            </Button>
          </div>
        </div>

        {/* 직무 입력 및 검색 */}
        <div className="mb-6">
          <div className="flex items-center w-[1096px] gap-4">
            <InputField
              id="position-search"
              label="직무 *"
              placeholder="직무를 선택하세요. (최대 5개까지 선택 가능)"
              value={positionInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPositionInput(e.target.value)}
              className="w-[880px] !mx-0"
              disabled={true}
            />
            <Button onClick={handleSearchPosition} className="h-[66px] mt-5 rounded-lg w-auto px-[16px] !bg-white !border !border-mainBlue !text-mainBlue">
              직무 선택하기
            </Button>
          </div>
        </div>

        {/* 면접 당시 경력 */}
        <div className="mb-12">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            면접 당시 경력 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 w-[400px]">
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${interviewExperience === 'newcomer' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setInterviewExperience('newcomer')}
            >
              신입
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${interviewExperience === 'experienced' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setInterviewExperience('experienced')}
            >
              경력
            </button>
          </div>
        </div>

        {/* 면접 일자 */}
        <div className="mb-8">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            면접 일자 <span className="text-red-500">*</span>
          </label>
          <div className="mb-4 ml-1 text-gray-600 text-bodyMd">
            최근 3년 이내 진행한 면접만 등록 가능합니다.
          </div>
          <div className="flex gap-4 w-[400px]">
            <div className="relative flex-1">
              <select
                value={interviewYear}
                onChange={(e) => setInterviewYear(e.target.value)}
                className="w-full h-[66px] px-4 py-2 border border-gray-200 rounded-lg text-h4 font-medium text-gray-700 appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              >
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="relative flex-1">
              <select
                value={interviewMonth}
                onChange={(e) => setInterviewMonth(e.target.value)}
                className="w-full h-[66px] px-4 py-2 border border-gray-200 rounded-lg text-h4 font-medium text-gray-700 appearance-none bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-mainBlue focus:border-transparent"
              >
                {generateMonths().map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 면접 정보 */}
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
                ${overallRating === '긍정적' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setOverallRating('긍정적')}
            >
              긍정적
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${overallRating === '보통' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setOverallRating('보통')}
            >
              보통
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${overallRating === '부정적' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setOverallRating('부정적')}
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
                ${difficulty === '쉬움' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('쉬움')}
            >
              쉬움
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '보통' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('보통')}
            >
              보통
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '어려움' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('어려움')}
            >
              어려움
            </button>
          </div>
        </div>
      </div>

      {/* 면접 정보 */}
      <div className="mb-4 text-h2">합격 정보</div>        
      <div className="mb-20">
        {/* 면접 질문 */}
        <div className="mb-6">
          <label className="block pb-3 pl-1 font-medium text-gray-700 text-h4">
            면접 질문 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <div className="relative">
              <div className="absolute z-10 transform -translate-y-1/2 left-4 top-1/2">
                <span className="font-bold text-h4 text-mainBlue">Q.</span>
              </div>
              <input
                type="text"
                placeholder="면접 질문을 입력하세요"
                value={interviewQuestion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterviewQuestion(e.target.value)}
                className="w-[945px] h-[66px] pl-12 pr-4 border border-gray-200 rounded-lg text-h4 text-gray-700 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue bg-white"
              />
            </div>
            <Button onClick={handleSearchCompany} className="h-[66px] rounded-lg w-auto px-[16px] !bg-white !border !border-mainBlue !text-mainBlue">
              질문 추가하기
            </Button>
          </div>
        </div>

        {/* 면접 후기 */}
        <div className="mb-6">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            면접 후기 <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="면접의 분위기, 답변 예시 등을 공유해 주세요! 면접 준비자들에게 큰 도움이 될 거예요."
            value={interviewReview}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInterviewReview(e.target.value)}
            className="p-4 w-[1096px] h-[200px] placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-gray-200 resize-none text-h4 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
          />
        </div>

        {/* 난이도 */}
        <div className="mb-8">
          <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">
            난이도 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 w-[800px]">
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '최종합격' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('최종합격')}
            >
              최종합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '2차합격' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('2차합격')}
            >
              2차합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '1차합격' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('1차합격')}
            >
              1차합격
            </button>
            <button
              type="button"
              className={`flex-1 h-[66px] rounded-lg border text-h4 font-medium flex items-center justify-center transition-colors
                ${difficulty === '불합격' ? 'bg-mainBlue text-white' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setDifficulty('불합격')}
            >
              불합격
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-40">
        <Button onClick={() => console.log('등록하기 클릭')} className="w-auto px-[68px] h-[66px]">
          등록하기
        </Button>
      </div>

    </div>
  );
};

export default ReviewWritePage;
