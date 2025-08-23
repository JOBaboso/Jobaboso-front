import React from 'react';

const CompanyContentsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">기업 콘텐츠</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          기업 콘텐츠 페이지입니다. 여기에 기업 관련 콘텐츠를 표시할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default CompanyContentsPage;
