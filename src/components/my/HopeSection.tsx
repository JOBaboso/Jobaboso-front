import React from 'react';

interface HopeSectionProps {
  companies: string[];
  jobs: string[];
  regions: string[];
}

const HopeSection: React.FC<HopeSectionProps> = ({ companies, jobs, regions }) => {
  const renderTags = (items: string[], label: string) => (
    <div>
      <p className="inline-block mt-8 text-gray-800 text-h3">{label}</p>
      <div className="mt-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="inline-block px-3 py-1 mr-4 bg-gray-100 rounded-md border border-gray-100"
            >
              {item.trim()}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-bodyLg">{label} 정보가 없습니다</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-10 w-[1190px] rounded-xl border border-gray-200 p-8">
      <div className="flex items-center self-start mt-3">
        <img
          src="/ic_hope.svg"
          alt="희망 근무 조건"
          className="z-10 mr-2 w-[35px] object-contain"
        />
        <p className="font-medium text-gray-800 text-h1">희망 근무 조건</p>
      </div>
      <div className="mx-10 my-2">
        {renderTags(companies, '희망기업')}
        {renderTags(jobs, '희망직군')}
        {renderTags(regions, '근무지역')}
      </div>
    </div>
  );
};

export default HopeSection; 