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
    <div className="p-6 bg-white border border-gray-300 rounded-xl">
      <div className="flex items-center mb-4">
        <img src="/ic_education.svg" alt="학력" className="w-8 h-8 mr-3" />
        <h3 className="font-semibold text-gray-800 text-h2">학력</h3>
      </div>

      <div className="grid grid-cols-2 gap-6 ml-10">
        {/* 열 1 */}
        <div className="space-y-3">
          {leftFields.map((field, index) => (
            <div key={index} className="flex items-center">
              <div className="px-3 py-1 text-sm bg-gray-100 border border-gray-400 rounded-full">
                {field.label}
              </div>
              <div className="ml-3 text-gray-800 text-bodyLg">{field.value}</div>
            </div>
          ))}
        </div>
        {/* 열 2 */}
        <div className="space-y-3">
          {rightFields.map((field, index) => (
            <div key={index} className="flex items-center">
              <div className="px-3 py-1 text-sm bg-gray-100 border border-gray-400 rounded-full">
                {field.label}
              </div>
              <div className="ml-3 text-gray-800 text-bodyLg">{field.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
