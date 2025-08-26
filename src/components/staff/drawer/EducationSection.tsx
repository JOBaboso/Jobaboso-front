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
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <div className="flex items-center mb-4">
        <img src="/ic_education.svg" alt="학력" className="w-8 h-8 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">학력</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* 열 1 */}
        <div className="space-y-3">
          {/* 학교명 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">학교명</div>
            <div className="ml-3 text-sm text-gray-800">{schoolName}</div>
          </div>
          {/* 주전공 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">주전공</div>
            <div className="ml-3 text-sm text-gray-800">{major}</div>
          </div>
          {/* 입학년도 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">입학년도</div>
            <div className="ml-3 text-sm text-gray-800">{admissionYear}</div>
          </div>
        </div>
        {/* 열 2 */}
        <div className="space-y-3">
          {/* 상태 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">상태</div>
            <div className="ml-3 text-sm text-gray-800">{status}</div>
          </div>
          {/* 학점 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">학점</div>
            <div className="ml-3 text-sm text-gray-800">{score}</div>
          </div>
          {/* 졸업년도 */}
          <div className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">졸업년도</div>
            <div className="ml-3 text-sm text-gray-800">{graduationYear}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
