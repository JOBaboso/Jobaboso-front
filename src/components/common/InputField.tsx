import React, { ReactNode } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;

  rightIcon?: ReactNode; // 👈 아이콘 컴포넌트 (예: <FiHelpCircle />)
  onRightIconClick?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  error,
  rightIcon,
  onRightIconClick,
}) => {
  return (
    <div className="mx-auto my-0 w-full">
      {/* 레이블 */}
      <label htmlFor={id} className="mb-2 block p-1 text-h4 font-medium text-gray-700">
        {label}
      </label>

      {/* 입력창 (with optional icon) */}
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="// 아이콘 공간 확보 h-[66px] w-full rounded-xl border border-gray-200 bg-white px-4 py-[20px] pr-[48px] text-h4 text-gray-700 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            <div className="flex h-6 w-6 items-center justify-center">{rightIcon}</div>
          </button>
        )}
      </div>

      {/* 에러 메시지 */}
      <p className="mt-1 text-[12px] text-[#FF3636]">{error ?? '\u00A0'}</p>
    </div>
  );
};
