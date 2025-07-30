import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const name = localStorage.getItem('name');
    
    if (accessToken && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };

  return (
    <header className="flex h-header w-full items-center justify-between border-b border-gray-200 bg-white px-6 text-gray-800">
      {/* 왼쪽: 햄버거 + 로고 */}
      <div className="flex items-center gap-3">
        {/* 햄버거 버튼: 모바일에서만 보임 */}
        <button onClick={onToggleSidebar} className="md:hidden" aria-label="사이드바 열기">
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Link to="/" className="flex items-center">
          <img src="/jobmate.svg" alt="JobMate" className="h-6 w-auto" />
        </Link>
        
        {/* 네비게이션 메뉴 - 로그인된 경우에만 표시 */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <Link 
              to="/lounge" 
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/lounge') 
                  ? 'text-mainBlue' 
                  : 'text-gray-600 hover:text-mainBlue'
              }`}
            >
              커리어 라운지
            </Link>
            <Link 
              to="/challenge" 
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/challenge') 
                  ? 'text-mainBlue' 
                  : 'text-gray-600 hover:text-mainBlue'
              }`}
            >
              나의 챌린지
            </Link>
            <Link 
              to="/benchmark" 
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/benchmark') 
                  ? 'text-mainBlue' 
                  : 'text-gray-600 hover:text-mainBlue'
              }`}
            >
              스펙 벤치마크
            </Link>
            <Link 
              to="/my" 
              className={`text-sm font-medium transition-colors ${
                location.pathname.startsWith('/my') 
                  ? 'text-mainBlue' 
                  : 'text-gray-600 hover:text-mainBlue'
              }`}
            >
              마이페이지
            </Link>
          </nav>
        )}
      </div>

      {/* 오른쪽: 로그인 상태에 따라 다른 UI */}
      <nav className="flex items-center space-x-4 font-sans text-bodyMd">
        {isLoggedIn ? (
          <>
            {/* 검색 아이콘 */}
            <button className="p-2 hover:text-mainBlue" aria-label="검색">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* 알림 아이콘 */}
            <button className="p-2 hover:text-mainBlue" aria-label="알림">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v3.75a6 6 0 006 6h3a6 6 0 006-6V9.75a6 6 0 00-6-6h-3z" />
              </svg>
            </button>
            
            {/* 사용자 프로필 아이콘 */}
            <button className="p-2 hover:text-mainBlue" aria-label="프로필">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            {/* 사용자 이름 */}
            <span className="text-gray-700 font-medium">
              {userName}님
            </span>
            
            {/* 로그아웃 버튼 */}
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-mainBlue hover:underline"
            >
              로그아웃
            </button>
            
            {/* 기업서비스 버튼 */}
            <button className="bg-mainBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              기업서비스
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signin" className="hover:text-mainBlue hover:underline">
              로그인
            </Link>
            <Link to="/auth/signup/type" className="hover:text-mainBlue hover:underline">
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
