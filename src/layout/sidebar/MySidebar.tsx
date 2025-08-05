import { Link, useLocation } from 'react-router-dom';

const MySidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `block hover:text-mainBlue ${isActive(path) ? 'text-mainBlue font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="min-h-screen w-full px-8 py-8 text-bodyLg">
      <ul className="space-y-6">
        {/* 마이페이지 */}
        <li>
          <h2 className="mb-3 text-h2 font-bold text-gray-700">마이페이지</h2>
        </li>

        {/* 나의 목표, 직군, 스펙 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">나의 목표, 직군, 스펙</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/spec" className={linkClass('/my/spec')}>
                미리보기
              </Link>
            </li>
            <li>
              <Link to="/my/spec/edit" className={linkClass('/my/spec/edit')}>
                등록 및 수정하기
              </Link>
            </li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />
      </ul>
    </nav>
  );
};

export default MySidebar;
