import React from 'react';

const sidebarItems = [
  { icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#1976ED"/><path d="M18 19.5c2.485 0 7.5 1.243 7.5 3.75V25.5a.75.75 0 0 1-.75.75H11.25a.75.75 0 0 1-.75-.75v-2.25c0-2.507 5.015-3.75 7.5-3.75Zm0-1.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="#fff"/></svg>
    ), label: '인적사항', active: true },
  { icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#E5EAF2"/><path d="M18 11l6 3v2c0 3.314-2.686 6-6 6s-6-2.686-6-6v-2l6-3Z" fill="#B0B8C1"/></svg>
    ), label: '학력' },
  { icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#E5EAF2"/><path d="M12 24v-6h12v6H12Zm0-8V12h12v4H12Z" fill="#B0B8C1"/></svg>
    ), label: '희망 근무 조건' },
  { icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#E5EAF2"/><path d="M18 11a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 8c2.485 0 7.5 1.243 7.5 3.75V25.5a.75.75 0 0 1-.75.75H11.25a.75.75 0 0 1-.75-.75v-2.75C10.5 20.243 15.515 19 18 19Z" fill="#B0B8C1"/></svg>
    ), label: '보유역량' },
  { icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="#E5EAF2"/><path d="M12 24v-1.5c0-2.485 5.015-3.75 7.5-3.75s7.5 1.265 7.5 3.75V24H12Zm0-8V12h12v4H12Z" fill="#B0B8C1"/></svg>
    ), label: '스킬' },
];

export default function ResumeSidebar() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[240px] bg-white rounded-2xl border border-gray-200 py-7 px-6 shadow-sm">
        <div className="mb-4 text-lg font-semibold text-gray-700">이력서 항목</div>
        <div className="mb-4 border-b border-gray-200" />
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <li key={item.label} className={`flex items-center gap-3 ${item.active ? 'text-mainBlue font-semibold' : 'text-gray-400'}`}>
              <span>{item.icon}</span>
              <span className={`text-base ${item.active ? 'text-mainBlue' : 'text-gray-400'}`}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-[240px] mt-6 h-12 bg-mainBlue text-white rounded-xl font-semibold text-lg">등록하기</button>
    </div>
  );
} 