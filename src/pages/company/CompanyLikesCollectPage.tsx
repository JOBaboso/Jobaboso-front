import React from 'react';

const CompanyLikesCollectPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">찜 모아보기</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          찜 모아보기 페이지입니다. 사용자가 찜한 기업이나 채용공고를 한눈에 볼 수 있습니다.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">찜한 기업 1</h3>
            <p className="text-sm text-gray-500">기업 설명...</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">찜한 기업 2</h3>
            <p className="text-sm text-gray-500">기업 설명...</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">찜한 채용공고 1</h3>
            <p className="text-sm text-gray-500">채용공고 설명...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLikesCollectPage;
