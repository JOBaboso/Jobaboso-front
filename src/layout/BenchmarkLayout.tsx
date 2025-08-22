import { Outlet, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';
import PointDisplay from '@components/common/PointDisplay';

interface BenchmarkLayoutProps {
  title?: string;
}

const BenchmarkLayout: React.FC<BenchmarkLayoutProps> = ({ title }) => {
  const location = useLocation();
  const [refreshKey, setRefreshKey] = useState(0);

  // 포인트 새로고침 함수
  const refreshPoints = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // 페이지별 제목 매핑
  const getPageTitle = () => {
    if (title) return title;

    switch (location.pathname) {
      case '/benchmark':
        return '벤치마크';
      default:
        return '';
    }
  };

  const pageTitle = getPageTitle();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="overflow-y-auto flex-1 px-4 py-6 md:px-8">
        <div className="mx-auto w-[1160px]">
          <div className="flex justify-between items-center">
            {pageTitle && (
              <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">{pageTitle}</h2>
            )}
            <PointDisplay key={refreshKey} onRefresh={refreshPoints} />
          </div>
          <Outlet context={{ refreshPoints }} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BenchmarkLayout; 