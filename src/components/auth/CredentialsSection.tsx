// src/components/auth/CredentialsSection.tsx
import React from 'react';
import { InputWithButton } from '@components/common/InputWithButton';
import { InputField } from '@components/common/InputField';

interface Props {
  onCheckUsername: () => void;
  usernameError?: string;
  passwordError?: string;
  passwordConfirmError?: string;
}

export const CredentialsSection: React.FC<Props> = ({
  onCheckUsername,
  usernameError,
  passwordError,
  passwordConfirmError,
}) => (
  <div className="space-y-3">
    <InputWithButton
      id="username"
      label="아이디"
      placeholder="아이디를 입력 후 중복 확인해 주세요."
      buttonText="중복확인"
      onButtonClick={onCheckUsername}
      // error={usernameError}
      error = "이미 사용 중인 아이디입니다. 다른 아이디를 입력해 주세요!"
    />

    <InputField
      id="password"
      label="비밀번호"
      type="password"
      placeholder="8~16자 사이의 영문, 숫자, 특수문자를 포함해서 입력해 주세요."
      error={passwordError}
    />

    <InputField
      id="passwordConfirm"
      label="비밀번호 확인"
      type="password"
      placeholder="위에서 입력하신 비밀번호를 다시 입력해 주세요."
      error={passwordConfirmError}
    />
  </div>
);
