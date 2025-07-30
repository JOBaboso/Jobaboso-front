import { Link, useLocation } from 'react-router-dom';

const PersonalSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `block hover:text-mainBlue ${isActive(path) ? 'text-mainBlue font-semibold' : 'text-gray-700'}`;

  return (
    <nav className="w-full min-h-screen px-8 py-8 text-bodyLg">
      <ul className="space-y-6">
        {/* 마이페이지 */}
        <li>
          <h2 className="mb-3 font-bold text-gray-700 text-h2">마이페이지</h2>
        </li>

        {/* 나의 목표, 직군, 스펙 */}
        <li>
          <h4 className="mb-2 font-bold text-gray-700 text-h4">나의 목표, 직군, 스펙</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/resume" className={linkClass('/my/resume')}>
                미리보기
              </Link>
            </li>
            <li>
              <Link to="/my/resume/edit" className={linkClass('/my/resume/edit')}>
                등록 및 수정하기
              </Link>
            </li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 나의 취업 현황 */}
        <li>
          <h4 className="mb-2 font-bold text-gray-700 text-h4">나의 취업 현황</h4>
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
        
        {/* 미션 */}
        <li>
          <h4 className="mb-2 font-bold text-gray-700 text-h4">미션</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/my/status" className={linkClass('/my/mission')}>
                나의 미션
              </Link>
            </li>
          </ul>
        </li>

        <hr className="border-b border-gray-200" />

        {/* 취업 후기 */}
        <li>
          <h4 className="mb-2 font-bold text-gray-700 text-h4">취업 후기</h4>
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
