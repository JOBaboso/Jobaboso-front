import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="h-full w-sidebar shrink-0">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
