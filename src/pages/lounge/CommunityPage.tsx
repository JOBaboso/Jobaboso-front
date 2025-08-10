import { useState, useEffect } from 'react';
import communityData from './CommunityMockData.json';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const tabs = ['전체', 'QnA', '스터디', '잡담', '멘토링'];
  const postsPerPage = 10;

  // 탭 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // 데이터 필터링
  useEffect(() => {
    const filtered = activeTab === '전체' 
      ? communityData 
      : communityData.filter(item => item.type === activeTab);
    
    setFilteredData(filtered);
    setTotalCount(filtered.length);
  }, [activeTab]);

  // 현재 페이지 데이터 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalCount / postsPerPage);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="mx-auto ml-52 w-[1096px]">
        <p className="text-[40px] font-semibold leading-[60px] text-gray-800">
          커리어라운지: 취업이야기
        </p>

        {/* 검색창 */}
        <div className="flex justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="태그로 검색해주세요."
              className="py-2.5 pl-10 pr-4 border border-gray-300 rounded-lg w-[372px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 w-5 h-5 text-gray-500 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <button className="px-8 py-2.5 ml-4 text-white rounded-lg bg-mainBlue text-bodyLg">
              작성하기
            </button>
          </div>
        </div>

        {/* 탭 */}
        <div className="mt-4">
          <div className="flex bg-gray-100 rounded-t-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-h3 rounded-t-lg w-[248px] h-[70px] ${
                  activeTab === tab
                    ? 'bg-white text-gray-700 border-x-[1.5px] border-t-[1.5px] border-mainBlue'
                    : 'bg-gray-100 text-gray-400 border-b-[1.5px] border-mainBlue'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 건수 & 정렬 */}
        <div className="flex justify-between items-center pb-4 mt-4">
          <div className="text-h4">
            <span className="text-gray-800">총 </span>
            <span className="font-semibold text-blue-500">{totalCount.toLocaleString()}</span>
            <span className="text-gray-800">건</span>
          </div>
          <div className="text-gray-500 text-caption">
            모든 글들이 최신순으로 정렬되어 보여집니다.
          </div>
        </div>

        {/* 글 목록 */}
        <div className="">
          {currentPosts.map((post, index) => (
            <div key={index} className="py-6 border-b border-gray-200">
              {/* 태그 */}
              <div className="flex gap-2 mb-3">
                {post.tags.map((tag: string, tagIndex: number) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-gray-500 bg-gray-100 rounded-md text-[14px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* 제목 */}
              <h3 className="mb-3 font-semibold text-gray-800 text-h3">
                {(activeTab === 'QnA' || activeTab === '스터디') ? (
                  <>
                    <span className="mr-2 text-blue-500">Q.</span>
                    <span>{post.title}</span>
                  </>
                ) : (
                  post.title
                )}
              </h3>
              
              {/* 내용 */}
              <div className="mb-4 text-gray-700 text-bodyLg">
                {post.body.split('\n').slice(0, 2).map((line: string, index: number) => (
                  <p key={index} className={index === 1 ? 'line-clamp-1' : ''}>
                    {line}
                  </p>
                ))}
              </div>
              
              {/* 메타데이터 */}
              <div className="flex items-center text-gray-400 text-bodyLg">
                <span>{post.date}</span>
                <div className="flex gap-1 items-center ml-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.commentCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex gap-4 justify-center items-center mt-8 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-gray-600 disabled:text-gray-300 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentPage === page
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {page.toString().padStart(2, '0')}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-gray-600 disabled:text-gray-300 hover:text-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage; 