import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  error,
}) => {
  return (
    <div className="w-full] mx-auto my-0">
      {/* 레이블 */}
      <label
        htmlFor={id}
        className="p-1 block mb-2 text-h4 font-medium text-gray-700"
      >
        {label}
      </label>

      {/* 입력창 */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="
          w-full
          h-[66px]
          px-4
          py-[20px]
          bg-white
          border border-gray-200
          rounded-xl
          text-h4 text-gray-700
          placeholder-gray-400
          focus:outline-none focus:border-mainBlue focus:ring-1 focus:ring-mainBlue
        "
      />
      {/* 에러 메시지 */}
      <p
        className="
          text-[12px]
          text-[#FF3636]
        "
      >
        {error ?? '\u00A0'}
      </p>
    </div>
  );
};