import { Link, useLocation } from 'react-router-dom';

const PersonalSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `block hover:text-mainBlue ${isActive(path) ? 'text-mainBlue font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="min-h-screen w-full px-8 py-8 text-bodyLg">
      <ul className="space-y-6">
        {/* 개인회원 홈 */}
        <li>
          <h2 className="mb-3 text-h2 font-bold text-gray-700">개인회원 홈</h2>
        </li>

        {/* 이력서 관리 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">이력서 관리</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/resume" className={linkClass('/my/resume')}>
                나의 이력서
              </Link>
            </li>
            <li>
              <Link to="/my/resume/edit" className={linkClass('/my/resume/edit')}>
                이력서 등록 및 수정
              </Link>
            </li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 나의 취업 현황 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">나의 취업 현황</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/status" className={linkClass('/my/status')}>
                전체 지원 현황
              </Link>
            </li>
            <li>
              <Link to="/my/touch" className={linkClass('/my/touch')}>
                찜 리스트 확인
              </Link>
            </li>
            <li>
              <Link to="/my/calendar" className={linkClass('/my/calendar')}>
                캘린더
              </Link>
            </li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 취업 후기 */}
        <li>
          <h4 className="mb-2 text-h4 font-bold text-gray-700">취업 후기</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/review" className={linkClass('/my/review')}>
                나의 취업 후기
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default PersonalSidebar;
