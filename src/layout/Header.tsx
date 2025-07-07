import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-header w-full flex items-center justify-between border-b border-gray-200 bg-white px-6 text-gray-800">
      {/* 왼쪽 로고 */}
      <Link to="/" className="text-h2 font-bold text-mainBlue font-sans">
        JobMate
      </Link>

      {/* 오른쪽 링크 */}
      <nav className="space-x-6 text-bodyMd font-sans">
        <Link to="/auth/SignIn" className="hover:underline hover:text-mainBlue">
          로그인
        </Link>
        <Link to="/auth/SignUpType" className="hover:underline hover:text-mainBlue">
          회원가입
        </Link>
      </nav>
    </header>
  );
};

export default Header;