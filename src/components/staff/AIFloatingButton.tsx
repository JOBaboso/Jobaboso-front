import React from 'react';

interface AIFloatingButtonProps {
  onClick: () => void;
  scrollY: number;
  offsetX?: number;
}

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onClick, scrollY, offsetX = 0 }) => {
  return (
    <button
      onClick={onClick}
      className="fixed right-48 z-50 flex h-[90px] w-[90px] items-center justify-center rounded-[46px] border border-gray-300 bg-white p-6 shadow-[0px_0px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:shadow-[0px_0px_32px_rgba(0,0,0,0.16)]"
      style={{
        boxSizing: 'border-box',
        bottom: `calc(6rem + ${scrollY * 0.05}px)`,
        right: offsetX ? `calc(12rem + ${offsetX}px)` : undefined,
        transform: 'none',
      }}
    >
      <img src="/staff/ai.svg" alt="AI 호출" className="w-11 h-11" />
    </button>
  );
};

export default AIFloatingButton;
