import React from 'react';

interface InputWithButtonProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  buttonText: string;
  onButtonClick: () => void;
  error?: string;
}

export const InputWithButton: React.FC<InputWithButtonProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  buttonText,
  onButtonClick,
  error,
}) => {
  return (
    <div className="w-[586px] mx-auto">
      {/* 레이블 */}
      <label
        htmlFor={id}
        className="block mb-2 text-h4 font-medium text-gray-700"
      >
        {label}
      </label>

      {/* input + button wrapper */}
      <div className="flex">
        {/* 인풋 */}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="
            flex-1
            h-[66px]
            px-4
            bg-white
            border border-gray-200 border-r-0
            rounded-l-xl
            text-h4 text-gray-700 placeholder-gray-400
            focus:outline-none focus:border-mainBlue focus:ring-1 focus:ring-mainBlue
          "
        />

        {/* 버튼 */}
        <button
          type="button"
          onClick={onButtonClick}
          className="
            w-[154px] h-[66px]
            bg-mainBlue
            border border-gray-200 border-l-0
            rounded-r-xl
            text-h4 font-medium text-white
            hover:opacity-90
          "
        >
          {buttonText}
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="mt-1 ml-8 text-[12px] leading-[20px] text-[#FF3636]">
          {error}
        </p>
      )}
    </div>
  );
};
