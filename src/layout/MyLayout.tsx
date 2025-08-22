import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import MySidebar from './sidebar/MySidebar';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';

const MyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // 페이지별 제목 매핑
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/my/spec':
        return '나의 이력서';
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      {/* Header에 토글 버튼 추가 */}
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex overflow-hidden flex-1">
        {/* PC용 사이드바 */}
        <aside className="hidden w-[260px] shrink-0 border-r border-gray-200 md:block">
          <div className="h-full">
            <MySidebar />
          </div>
        </aside>

        {/* 모바일용 사이드바 (오버레이) */}
        {isSidebarOpen && (
          <div className="flex fixed inset-0 z-50 md:hidden">
            {/* 오버레이 */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeSidebar} />
            {/* 사이드바 */}
            <aside className="relative z-50 w-[240px] border-r border-gray-200 bg-white shadow-md">
              <MySidebar />
            </aside>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <main className="overflow-y-auto flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto w-[1096px]">
            {pageTitle && (
              <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">{pageTitle}</h2>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MyLayout;
