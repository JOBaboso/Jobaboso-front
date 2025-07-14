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
  <div className="mb-10 space-y-3">
    <InputField id="name" label="이름" placeholder="이름을 입력해 주세요." error={nameError} />

    <InputField id="birth" label="생년월일" placeholder="예시: 20020208" error={birthError} />

    <BinarySelector
      label="성별"
      options={['male', 'female']}
      labels={['남성', '여성']}
      value={gender}
      onChange={onGenderChange}
      error={genderError}
    />

    <InputField id="email" label="이메일" placeholder="이메일을 입력해주세요." />
  </div>
);
