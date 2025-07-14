import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex h-header w-full items-center justify-between border-b border-gray-200 bg-white px-6 text-gray-800">
      {/* 왼쪽 로고 */}
      <Link to="/" className="font-sans text-h2 font-bold text-mainBlue">
        JobMate
      </Link>

      {/* 오른쪽 링크 */}
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
