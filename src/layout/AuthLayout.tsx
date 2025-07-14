import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const SignLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto bg-white px-8 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SignLayout;
