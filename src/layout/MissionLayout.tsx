import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

const MissionLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        <div className="mx-auto w-[1160px]">
          <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">나의 미션</h2>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissionLayout;
