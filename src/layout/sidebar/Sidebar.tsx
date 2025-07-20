import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
  return (
    <nav className="min-h-screen w-full bg-subDarkBlue p-6 font-sans text-white">
      <ul className="space-y-4 text-bodyMd">
        <li className="text-lg font-bold">📂 Sidebar</li>
        <li>
          <Link to="/my">개인 회원 페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
