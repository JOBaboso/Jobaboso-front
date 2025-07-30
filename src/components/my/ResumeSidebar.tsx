import React from 'react';

interface ResumeSidebarProps {
  currentSection: string;
  onSectionClick: (section: string) => void;
  onSave: () => void;
  isAgreed: boolean;
}

const sidebarItems = [
  {
    icon: (isActive: boolean) => (
      <div className={`p-2 border rounded-full ${
            isActive ? 'bg-mainBlue' : 'bg-gray-300'}`}>
        <img src="/ic_sidebar_profile.svg"></img>
      </div>
    ),
    label: '인적사항',
  },
  {
    icon: (isActive: boolean) => (
      <div className={`p-2 border rounded-full ${
            isActive ? 'bg-mainBlue' : 'bg-gray-300'}`}>
        <img src="/ic_sidebar_education.svg"></img>
      </div>
    ),
    label: '학력',
  },
  {
    icon: (isActive: boolean) => (
      <div className={`p-2 border rounded-full ${
            isActive ? 'bg-mainBlue' : 'bg-gray-300'}`}>
        <img src="/ic_sidebar_hope.svg"></img>
      </div>
    ),
    label: '희망 근무 조건',
  },
  {
    icon: (isActive: boolean) => (
      <div className={`p-2 border rounded-full ${
            isActive ? 'bg-mainBlue' : 'bg-gray-300'}`}>
        <img src="/ic_sidebar_skill_1.svg"></img>
      </div>
    ),
    label: '보유역량',
  },
  {
    icon: (isActive: boolean) => (
      <div className={`p-2 border rounded-full ${
            isActive ? 'bg-mainBlue' : 'bg-gray-300'}`}>
        <img src="/ic_sidebar_skill_2.svg"></img>
      </div>
    ),
    label: '스킬',
  },
];

export default function ResumeSidebar({ currentSection, onSectionClick, onSave, isAgreed }: ResumeSidebarProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[240px] bg-white rounded-2xl border border-gray-200 py-7 px-6 shadow-sm">
        <div className="mb-4 text-lg font-semibold text-gray-700">이력서 항목</div>
        <div className="mb-4 border-b border-gray-200" />
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((item) => {
            const isActive = currentSection === item.label;
            return (
              <li
                key={item.label}
                className={`flex items-center gap-3 cursor-pointer ${isActive ? 'font-semibold text-mainBlue' : 'text-gray-400'}`}
                onClick={() => onSectionClick(item.label)}
              >
                <span>{item.icon(isActive)}</span>
                <span className={`text-base ${isActive ? 'text-mainBlue' : 'text-gray-400'}`}>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <button 
        className={`w-[240px] mt-6 h-12 rounded-xl font-semibold text-lg ${
          isAgreed 
            ? 'text-white cursor-pointer bg-mainBlue hover:bg-blue-600' 
            : 'text-gray-500 bg-gray-300 cursor-not-allowed'
        }`} 
        onClick={isAgreed ? onSave : undefined}
        disabled={!isAgreed}
      >
        등록하기
      </button>
    </div>
  );
} 