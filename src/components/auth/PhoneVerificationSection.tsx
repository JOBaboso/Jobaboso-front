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
  <div className="space-y-3">
    {/* 전화번호 입력 */}
    <InputWithButton
      id="phone"
      label="전화번호"
      placeholder="전화번호를 입력해 주세요."
      buttonText="인증번호 받기"
      onButtonClick={onRequestCode}
      error={phoneError}
    />

    {/* 인증번호 입력 + 확인 + 재전송 */}
    <div className="flex items-start space-x-2">
      <div className="flex-1">
        <InputWithButton
          id="verification"
          label="인증번호"
          placeholder="문자로 전송된 인증번호를 입력해 주세요."
          buttonText="확인"
          onButtonClick={onVerifyCode}
          error={verificationError}
        />
      </div>

      <div className="pt-[42px]">
        <button
          type="button"
          onClick={onResendCode}
          className="w-[120px] h-[66px] bg-gray-200 text-gray-400 text-h4 font-medium rounded-xl hover:opacity-50"
        >
          재전송
        </button>
      </div>
    </div>
  </div>
);
