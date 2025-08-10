import React from 'react';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const TabBar: React.FC<TabBarProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = "mt-4" 
}) => (
  <div className={className}>
    <div className="flex bg-gray-100 rounded-t-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 text-h3 rounded-t-lg w-[248px] h-[70px] transition-colors ${
            activeTab === tab
              ? 'bg-white text-gray-700 border-x-[1.5px] border-t-[1.5px] border-mainBlue'
              : 'bg-gray-100 text-gray-400 border-b-[1.5px] border-mainBlue hover:bg-gray-200'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default TabBar; 