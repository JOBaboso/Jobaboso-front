import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-sidebar shrink-0 h-full">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto px-8 py-6 bg-white">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
