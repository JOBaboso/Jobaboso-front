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
    <div className="p-6 bg-white border border-gray-300 rounded-xl">
      <div className="flex items-center mb-4">
        <img src="/ic_hope.svg" alt="희망 근무 조건" className="w-8 h-8 mr-3" />
        <h3 className="font-semibold text-gray-800 text-h2">희망 근무 조건</h3>
      </div>
      
      <div className="ml-10 space-y-3">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center">
            <div className="px-3 py-1 text-sm bg-gray-100 border border-gray-400 rounded-full">
              {field.label}
            </div>
            <div className="ml-3 text-gray-800 text-bodyLg">
              {field.value ? field.value.split(',').map(item => item.trim()).join(', ') : '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreferenceSection;
