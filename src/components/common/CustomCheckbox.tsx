import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function CustomCheckbox({ checked, onChange, className = '' }: CustomCheckboxProps) {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <span className={
        `flex items-center justify-center w-5 h-5 rounded-sm border-2 border-mainBlue ` +
        (checked ? 'bg-mainBlue' : 'bg-white') +
        ' transition'
      }>
        {checked && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
    </label>
  );
} 