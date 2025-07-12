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
    <div className="w-full mx-auto my-0">
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
            w-3/4
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
            w-1/4 
            h-[66px]
            bg-mainBlue
            border border-gray-200 border-l-0
            rounded-r-xl
            text-h4 font-medium text-white
            hover:opacity-50
          "
        >
          {buttonText}
        </button>
      </div>

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
