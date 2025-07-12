// src/components/auth/PersonalInfoSection.tsx
import React from 'react';
import { InputField } from '@components/common/InputField';

interface Props {
  nameError?: string;
  birthError?: string;
  gender: 'male' | 'female' | '';
  onGenderChange: (g: 'male' | 'female') => void;
}

export const PersonalInfoSection: React.FC<Props> = ({
  nameError,
  birthError,
  gender,
  onGenderChange,
}) => (
  <div className="space-y-6">
    <InputField
      id="name"
      label="이름"
      placeholder="이름을 입력해 주세요."
      error={nameError}
    />

    <InputField
      id="birth"
      label="생년월일"
      placeholder="예시: 20020208"
      error={birthError}
    />

    <div>
      <span className="block mb-2 text-h4 font-medium text-gray-700">
        성별
      </span>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => onGenderChange('male')}
          className={`flex-1 py-3 rounded-xl border ${
            gender === 'male'
              ? 'bg-mainBlue text-white border-mainBlue'
              : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          남성
        </button>
        <button
          type="button"
          onClick={() => onGenderChange('female')}
          className={`flex-1 py-3 rounded-xl border ${
            gender === 'female'
              ? 'bg-mainBlue text-white border-mainBlue'
              : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          여성
        </button>
      </div>
    </div>
  </div>
);
