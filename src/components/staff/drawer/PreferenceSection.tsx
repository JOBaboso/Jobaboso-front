import React from 'react';

interface PreferenceSectionProps {
  targetCompany: string;
  targetJob: string;
  targetRegion: string;
}

const PreferenceSection: React.FC<PreferenceSectionProps> = ({
  targetCompany,
  targetJob,
  targetRegion,
}) => {
  const fields = [
    { label: '희망기업', value: targetCompany },
    { label: '희망직군', value: targetJob },
    { label: '근무지역', value: targetRegion },
  ];

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6">
      <div className="mb-4 flex items-center">
        <img src="/ic_hope.svg" alt="희망 근무 조건" className="mr-3 h-8 w-8" />
        <h3 className="text-h2 font-semibold text-gray-800">희망 근무 조건</h3>
      </div>
      
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center">
            <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 text-sm">
              {field.label}
            </div>
            <div className="ml-3 text-bodyLg text-gray-800">
              {field.value ? field.value.split(',').map(item => item.trim()).join(', ') : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferenceSection;
