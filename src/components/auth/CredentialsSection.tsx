import React, { useState } from 'react';
import { InputWithButton } from '@components/common/InputWithButton';
import { InputField } from '@components/common/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <div className="space-y-3">
      {/* 아이디 */}
      <InputWithButton
        id="username"
        label="아이디"
        placeholder="아이디를 입력 후 중복 확인해 주세요."
        buttonText="중복확인"
        onButtonClick={onCheckUsername}
        error={usernameError}
      />

      {/* 비밀번호 */}
      <InputField
        id="password"
        label="비밀번호"
        type={showPassword ? 'text' : 'password'}
        placeholder="8~16자 사이의 영문, 숫자, 특수문자를 포함해서 입력해 주세요."
        error={passwordError}
        rightIcon={showPassword ? <FiEye size={24} /> : <FiEyeOff size={24} />}
        onRightIconClick={() => setShowPassword((prev) => !prev)}
      />

      {/* 비밀번호 확인 */}
      <InputField
        id="passwordConfirm"
        label="비밀번호 확인"
        type={showPasswordConfirm ? 'text' : 'password'}
        placeholder="위에서 입력하신 비밀번호를 다시 입력해 주세요."
        error={passwordConfirmError}
        rightIcon={showPasswordConfirm ? <FiEye size={24} /> : <FiEyeOff size={24} />}
        onRightIconClick={() => setShowPasswordConfirm((prev) => !prev)}
      />
    </div>
  );
};
