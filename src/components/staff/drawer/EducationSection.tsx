import React from 'react';

interface EducationSectionProps {
  gender: string;
  status: string;
  score: string;
  graduationYear: string;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  gender,
  status,
  score,
  graduationYear,
}) => {
  const fields = [
    { label: '성별', value: gender },
    { label: '상태', value: status },
    { label: '학점', value: score },
    { label: '졸업년도', value: graduationYear },
  ];

  const leftFields = fields.slice(0, 2);
  const rightFields = fields.slice(2, 4);

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6">
      <div className="mb-4 flex items-center">
        <img src="/ic_education.svg" alt="학력" className="mr-3 h-8 w-8" />
        <h3 className="text-h2 font-semibold text-gray-800">학력</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 열 1 */}
        <div className="space-y-3">
          {leftFields.map((field, index) => (
            <div key={index} className="flex items-center">
              <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">
                {field.label}
              </div>
              <div className="ml-3 text-bodyLg text-gray-800">{field.value}</div>
            </div>
          ))}
        </div>
        {/* 열 2 */}
        <div className="space-y-3">
          {rightFields.map((field, index) => (
            <div key={index} className="flex items-center">
              <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">
                {field.label}
              </div>
              <div className="ml-3 text-bodyLg text-gray-800">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
