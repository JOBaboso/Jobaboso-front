import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="h-full w-sidebar shrink-0">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-white px-8 py-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
