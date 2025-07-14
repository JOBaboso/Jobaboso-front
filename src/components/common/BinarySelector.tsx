// src/components/common/BinarySelector.tsx
import React from 'react';

interface BinarySelectorProps<T extends string> {
  label: string;
  options: [T, T];
  value: T | '';
  onChange: (value: T) => void;
  labels?: [string, string];
  error? : string;
}

export const BinarySelector = <T extends string>({
  label,
  options,
  value,
  onChange,
  labels = options,
  error
}: BinarySelectorProps<T>) => {
  return (
    <div>
      <label
        className="p-1 block mb-2 text-h4 font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="flex space-x-4 mt-1">
        {options.map((option, idx) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex-1 h-[66px] py-3 rounded-xl border transition-all ${
              value === option
                ? 'bg-mainBlue text-white border-mainBlue'
                : 'bg-white text-gray-400 border-gray-200'
            }`}
          >
            {labels[idx]}
          </button>
        ))}
      </div>
      <p
        className="
          mt-1
          text-[12px]
          text-[#FF3636]
        "
      >
        {error ?? '\u00A0'}
      </p>
    </div>
  );
};
