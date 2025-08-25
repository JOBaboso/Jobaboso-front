import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ScrollToTop from '@components/common/ScrollToTop';
import StaffPage from '@pages/staff/StaffPage';
import HomePage from '@pages/home/HomePage';

const MainLayout = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // user_type 확인
    const type = localStorage.getItem('user_type');
    setUserType(type);

    if (type === 'company') {
      navigate('/company/contents');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white py-6">
          {userType === 'university_staff' ? (
            <StaffPage />
          ) : userType === 'personal' ? (
            <HomePage />
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
