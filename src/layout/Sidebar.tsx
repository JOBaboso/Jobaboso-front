const Sidebar = () => {
  return (
    <nav className="h-full w-full bg-subDarkBlue p-6 font-sans text-white">
      <ul className="space-y-4 text-bodyMd">
        <li className="text-lg font-bold">📂 Sidebar</li>
        <li>🏠 Dashboard</li>
        <li>⚙️ Settings</li>
        <li>📨 Messages</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
