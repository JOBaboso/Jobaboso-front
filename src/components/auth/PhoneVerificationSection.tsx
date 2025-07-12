// src/components/auth/PhoneVerificationSection.tsx
import React from 'react';
import { InputWithButton } from '@components/common/InputWithButton';

interface Props {
  onRequestCode: () => void;
  onVerifyCode: () => void;
  onResendCode: () => void;
  phoneError?: string;
  verificationError?: string;
}

export const PhoneVerificationSection: React.FC<Props> = ({
  onRequestCode,
  onVerifyCode,
  onResendCode,
  phoneError,
  verificationError,
}) => (
  <div className="space-y-6">
    <InputWithButton
      id="phone"
      label="전화번호"
      placeholder="전화번호를 입력해 주세요."
      buttonText="인증번호 받기"
      onButtonClick={onRequestCode}
      error={phoneError}
    />

    <div className="relative">
      <InputWithButton
        id="verification"
        label="인증번호"
        placeholder="문자로 전송된 인증번호를 입력해 주세요."
        buttonText="확인"
        onButtonClick={onVerifyCode}
        error={verificationError}
      />
      <button
        type="button"
        onClick={onResendCode}
        className="absolute top-[42px] right-[154px] text-gray-600 text-sm hover:underline"
      >
        재전송
      </button>
    </div>
  </div>
);
