import { useState, useEffect } from 'react';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <footer className="flex h-footer w-full items-center justify-between border-b border-gray-200 bg-white px-6 text-gray-400">
      <div className="flex-1"></div>
      <div className="flex items-center justify-center flex-1">
        새는 알에서 나오려고 투쟁한다. 알은 세계다. 태어나려는 자는 한 세계를 파괴해야만 한다.
      </div>
      <div className="flex-1 flex justify-end">
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-[16px] font-medium text-gray-400 hover:text-mainBlue transition-colors"
          >
            로그아웃
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
