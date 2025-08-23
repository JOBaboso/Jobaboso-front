import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';

const CompanyContentsLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="overflow-y-auto flex-1 px-4 py-6 md:px-8">
        <div className="mx-auto w-[1160px]">
          <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">기업 콘텐츠</h2>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyContentsLayout;
