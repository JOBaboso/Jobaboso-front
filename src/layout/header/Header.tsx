import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ChevronDownIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
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
    <>
      {/* 고정된 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-header w-full items-center justify-between border-b border-gray-200 bg-white px-6 text-gray-800 shadow-[0px_4px_8px_rgba(0,0,0,0.08)]">
        {/* 왼쪽: 햄버거 + 로고 */}
        <div className="flex gap-3 items-center">
          {/* 햄버거 버튼: 모바일에서만 보임 */}
          <button onClick={onToggleSidebar} className="md:hidden" aria-label="사이드바 열기">
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>

          <Link to="/" className="ml-[30px] flex items-center">
            <img src="/jobmate.svg" alt="JobMate" className="h-[42px] w-[145px]" />
          </Link>

          {/* 네비게이션 메뉴 - 로그인된 경우에만 표시 */}
          {isLoggedIn && (
            <nav className="ml-20 hidden items-center space-x-[76px] md:flex">
              <Link
                to="/employment/status"
                className={`text-[20px] font-medium leading-[28px] transition-colors ${
                  location.pathname.startsWith('employment/status')
                    ? 'text-mainBlue'
                    : 'text-gray-700 hover:text-mainBlue'
                }`}
              >
                나의 취업 현황
              </Link>
              <Link
                to="/benchmark"
                className={`text-[20px] font-medium leading-[28px] transition-colors ${
                  location.pathname.startsWith('/benchmark')
                    ? 'text-mainBlue'
                    : 'text-gray-700 hover:text-mainBlue'
                }`}
              >
                스펙 벤치마크
              </Link>
              <Link
                to="/mission"
                className={`text-[20px] font-medium leading-[28px] transition-colors ${
                  location.pathname.startsWith('/mission')
                    ? 'text-mainBlue'
                    : 'text-gray-700 hover:text-mainBlue'
                }`}
              >
                나의 미션
              </Link>
              <Link
                to="/lounge/community"
                className={`text-[20px] font-medium leading-[28px] transition-colors ${
                  location.pathname.startsWith('/lounge/community')
                    ? 'text-mainBlue'
                    : 'text-gray-700 hover:text-mainBlue'
                }`}
              >
                커리어 라운지
              </Link>
            </nav>
          )}
        </div>

        {/* 오른쪽: 로그인 상태에 따라 다른 UI */}
        <nav className="flex items-center space-x-4 font-sans text-bodyMd">
          {isLoggedIn ? (
            <>
              {/* 검색 아이콘 */}
              <button className="p-2 text-gray-600 hover:text-mainBlue" aria-label="검색">
                <MagnifyingGlassIcon className="w-7 h-7" />
              </button>

              {/* 알림 아이콘 */}
              <button className="p-2 text-gray-600 hover:text-mainBlue" aria-label="알림">
                <BellIcon className="w-7 h-7" />
              </button>

              {/* 사용자 프로필 아이콘 */}
              <Link to="/my/spec" className="flex gap-2 items-center p-1 hover:opacity-80">
                <button
                  className={`flex items-center justify-center rounded-full transition-colors ${
                    location.pathname.startsWith('/my/spec')
                      ? 'border-mainBlue'
                      : 'border-gray-300 hover:border-mainBlue'
                  }`}
                  aria-label="프로필"
                >
                  <img src="/ic_profile.svg" alt="프로필" className="w-7 h-7" />
                </button>

                {/* 사용자 이름 */}
                <span
                  className={`text-[20px] font-medium leading-[28px] transition-colors ${
                    location.pathname.startsWith('/my') ? 'text-mainBlue' : 'text-gray-700'
                  }`}
                >
                  {userName}
                </span>
              </Link>

              {/* 서비스 토글 버튼 */}
              <div className="relative mr-5">
                <button
                  onClick={() => setIsServiceMenuOpen(!isServiceMenuOpen)}
                  className="flex h-[38px] items-center justify-between rounded-full border border-gray-200 bg-white px-4 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <span className="m-4 text-h3">기업서비스</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${isServiceMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* 드롭다운 메뉴 */}
                {isServiceMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg">
                    <button className="px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-50">
                      기업서비스
                    </button>
                    <button className="px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-50">
                      대학교서비스
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center mr-5 space-y-2 md:flex-row md:space-x-6 md:space-y-0">
              <Link
                to="/auth/signin"
                className="hover:none text-[20px] font-medium leading-[28px] hover:text-mainBlue"
              >
                로그인
              </Link>
              <Link
                to="/auth/signup/type"
                className="hover:none text-[20px] font-medium leading-[28px] hover:text-mainBlue"
              >
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </header>
      
      {/* 헤더 높이만큼의 공간을 만들어서 콘텐츠가 헤더 뒤로 숨지 않도록 함 */}
      <div className="h-header"></div>
    </>
  );
};

export default Header;
