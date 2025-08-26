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
  const renderTags = (item: string, label: string) => (
    <div>
      <p className="mt-2 inline-block text-bodyLg text-gray-800">{label}</p>
      <div className="mt-1">
        {item ? (
          <div className="mr-2 inline-block rounded-md border border-gray-100 bg-gray-100 px-3 py-1">
            {item.trim()}
          </div>
        ) : (
          <div className="text-bodyLg font-semibold text-gray-500">{label} 정보가 없습니다</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-6">
      <div className="mb-4 flex items-center">
        <img src="/ic_hope.svg" alt="희망 근무 조건" className="mr-3 h-8 w-8" />
        <h3 className="text-h2 font-semibold text-gray-800">희망 근무 조건</h3>
      </div>
      <div>
        {renderTags(targetCompany, '희망기업')}
        {renderTags(targetJob, '희망직군')}
        {renderTags(targetRegion, '근무지역')}
      </div>
    </div>
  );
};

export default PreferenceSection;
