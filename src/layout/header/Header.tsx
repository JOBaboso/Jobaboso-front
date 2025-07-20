import { Link } from 'react-router-dom';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
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

        <Link to="/" className="font-sans text-h2 font-bold text-mainBlue">
          JobMate
        </Link>
      </div>

      {/* 오른쪽: 로그인/회원가입 */}
      <nav className="space-x-6 font-sans text-bodyMd">
        <Link to="/auth/SignIn" className="hover:text-mainBlue hover:underline">
          로그인
        </Link>
        <Link to="/auth/signup/type" className="hover:text-mainBlue hover:underline">
          회원가입
        </Link>
      </nav>
    </header>
  );
};

export default Header;
