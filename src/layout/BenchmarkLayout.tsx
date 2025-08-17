import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';

interface BenchmarkLayoutProps {
  title?: string;
}

const BenchmarkLayout: React.FC<BenchmarkLayoutProps> = ({ title }) => {
  const location = useLocation();

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
      <main className="flex-1 px-4 py-6 overflow-y-auto md:px-8">
        <div className="mx-auto w-[1160px]">
          <div className="flex items-center justify-between">
            {pageTitle && (
              <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">{pageTitle}</h2>
            )}
            <div className="px-[12px] py-[8px] border-[1.3px] flex items-center rounded-lg bg-subLightBlue border-mainBlue">
              <img src="/ic_point.svg" className="h-[20px] w-[20px]"></img>
              <div className="ml-[8px] text-bodyMd">보유 포인트</div>
              <div className="ml-[8px] text-h4">1,280p</div>
            </div>
          </div>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BenchmarkLayout; 