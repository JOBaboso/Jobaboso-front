import React from 'react';

const CompanyLikesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">찜하기</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          찜하기 페이지입니다. 사용자가 찜한 기업이나 채용공고를 표시할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default CompanyLikesPage;
