import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import BenchmarkSidebar from './sidebar/BenchmarkSidebar';
import Footer from './footer/Footer';

const BenchmarkLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header에 토글 버튼 추가 */}
      <Header onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* PC용 사이드바 */}
        <aside className="hidden w-[260px] shrink-0 border-r border-gray-200 md:block">
          <div className="h-full">
            <BenchmarkSidebar />
          </div>
        </aside>

        {/* 모바일용 사이드바 (오버레이) */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* 오버레이 */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={closeSidebar} />
            {/* 사이드바 */}
            <aside className="relative z-50 w-[240px] border-r border-gray-200 bg-white shadow-md">
              <BenchmarkSidebar />
            </aside>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BenchmarkLayout; 