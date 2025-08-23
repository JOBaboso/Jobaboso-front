import React, { ReactNode } from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  rightIcon?: ReactNode; // 👈 아이콘 컴포넌트 (예: <FiHelpCircle />)
  onRightIconClick?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // 추가된 className prop
  disabled?: boolean; // 추가된 disabled prop
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  error,
  rightIcon,
  onRightIconClick,
  value,
  onChange,
  className = '', // 기본값은 빈 문자열
  disabled = false, // 기본값은 false
}) => {
  return (
    <div className={`mx-auto my-0 w-full ${className}`}>
      {/* 레이블 */}
      <label htmlFor={id} className="block p-1 mb-2 font-medium text-gray-700 text-lg">
        {label.includes('*') ? (
          <>
            {label.replace('*', '')} <span className="text-red-500">*</span>
          </>
        ) : (
          label
        )}
      </label>

      {/* 입력창 (with optional icon) */}
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] pr-[48px] text-lg text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-8 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-800"
          >
            <div className="flex justify-center items-center w-6 h-6">{rightIcon}</div>
          </button>
        )}
      </div>

      {/* 에러 메시지 */}
      <p className="mt-1 text-[12px] text-[#FF3636]">{error ?? '\u00A0'}</p>
    </div>
  );
};
