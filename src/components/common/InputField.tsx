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
    <div className="w-[586px] mx-auto">
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
      {error && (
        <p className="
          mt-1
          ml-8             /* 입력 텍스트 시작 위치와 맞춤 */
          text-[12px]      /* 12px */
          leading-[20px]   /* 20px */
          text-[#FF3636]   /* #FF3636 */
        ">
          {error}
        </p>
      )}
    </div>
  );
};