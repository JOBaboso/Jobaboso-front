const Sidebar = () => {
  return (
    <nav className="h-full w-full bg-subDarkBlue p-6 text-white font-sans">
      <ul className="space-y-4 text-bodyMd">
        <li className="font-bold text-lg">📂 Sidebar</li>
        <li>🏠 Dashboard</li>
        <li>⚙️ Settings</li>
        <li>📨 Messages</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
