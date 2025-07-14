// src/components/auth/PersonalInfoSection.tsx
import React from 'react';
import { InputField } from '@components/common/InputField';
import { BinarySelector } from '@components/common/BinarySelector';

interface Props {
  nameError?: string;
  birthError?: string;
  genderError?: string;
  gender: 'male' | 'female' | '';
  onGenderChange: (g: 'male' | 'female') => void;
}

export const PersonalInfoSection: React.FC<Props> = ({
  nameError,
  birthError,
  genderError,
  gender,
  onGenderChange,
}) => (
  <div className="space-y-3 mb-10">
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

    <BinarySelector
      label="성별"
      options={['male', 'female']}
      labels={['남성', '여성']}
      value={gender}
      onChange={onGenderChange}
      error={genderError}
    />
  </div>
);
