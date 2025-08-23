import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import EmploymentSidebar from './sidebar/EmploymentSidebar';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';
import PointDisplay from '@components/common/PointDisplay';

interface EmploymentLayoutProps {
  title?: string;
}

const MyLayout: React.FC<EmploymentLayoutProps> = ({ title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // 포인트 새로고침 함수
  const refreshPoints = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // 페이지별 제목 매핑
  const getPageTitle = () => {
    if (title) return title;

    // /employment/application/로 시작하는 경로 체크
    if (location.pathname.startsWith('/employment/applications/')) {
      return '지원하기';
    }

    switch (location.pathname) {
      case '/employment/status':
        return '전체 지원 현황';
      case '/employment/calendar':
        return '캘린더';
      case '/employment/touch':
        return '찜 제안 확인';
      case '/employment/review':
        return '나의 취업 후기';
      case '/employment/review/write':
        return '나의 취업 후기';
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
            <EmploymentSidebar />
          </div>
        </aside>

        {/* 모바일용 사이드바 (오버레이) */}
        {isSidebarOpen && (
          <div className="flex fixed inset-0 z-50 md:hidden">
            {/* 오버레이 */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeSidebar} />
            {/* 사이드바 */}
            <aside className="relative z-50 w-[240px] border-r border-gray-200 bg-white shadow-md">
              <EmploymentSidebar />
            </aside>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <main className="overflow-y-auto flex-1 px-4 py-6 md:px-8">
          <div className="mx-auto w-[1096px]">
            <div className="flex justify-between items-center">
              {pageTitle && (
                <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">{pageTitle}</h2>
              )}
              {/* ReviewWritePage가 아닐 때만 포인트 디스플레이 표시 */}
              {!location.pathname.includes('/review/write') && (
                <PointDisplay key={refreshKey} onRefresh={refreshPoints} />
              )}
            </div>
            <Outlet context={{ refreshPoints }} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MyLayout;
