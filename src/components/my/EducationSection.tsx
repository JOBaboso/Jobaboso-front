import React from 'react';

interface EducationSectionProps {
  schoolName: string;
  major: string;
  admissionYear: string;
  status: string;
  score: string;
  graduationYear: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  schoolName,
  major,
  admissionYear,
  status,
  score,
  graduationYear,
}) => {
  return (
    <div className="p-8 mt-10 rounded-xl border border-gray-200">
      <div className="flex items-center self-start mt-3">
        <img
          src="/ic_education.svg"
          alt="학력"
          className="z-10 mr-2 w-[35px] object-contain"
        />
        <p className="font-medium text-gray-800 text-h1">학력</p>
      </div>
      <div className="grid grid-cols-2 gap-6 mx-10 my-2">
        {/* 열 1 */}
        <div>
          {/* 학교명 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              학교명
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{schoolName}</div>
          </div>
          {/* 주전공 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              주전공
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{major}</div>
          </div>
          {/* 입학년도 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              입학년도
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{admissionYear}</div>
          </div>
        </div>
        {/* 열 2 */}
        <div>
          {/* 상태 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              상태
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{status}</div>
          </div>
          {/* 학점 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              학점
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{score}</div>
          </div>
          {/* 졸업년도 */}
          <div className="flex items-center self-start mt-8">
            <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-400">
              졸업년도
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">{graduationYear}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection; 