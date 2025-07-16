import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SignLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SignLayout;
