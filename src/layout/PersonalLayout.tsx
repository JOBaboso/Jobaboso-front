import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import PersonalSidebar from './sidebar/PersonalSidebar';
import Footer from './footer/Footer';

const PersonalLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="flex flex-1">
        <aside className="w-sidebar shrink-0 border-r border-gray-200">
          <div className="h-full">
            <PersonalSidebar />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-white px-8 py-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default PersonalLayout;
