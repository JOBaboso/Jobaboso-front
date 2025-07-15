// src/components/auth/CommonSignupFormSection.tsx
import React, { FormEvent, useState } from 'react';
import { AccountInfoSection } from './AccountInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ContactInfoSection } from './ContactInfoSection';
import { AgreementSection } from './AgreementSection';

interface CommonSignupFormSectionProps {
  showPersonalInfo?: boolean; // ← 기본값은 false
}

export const CommonSignupFormContainer: React.FC<CommonSignupFormSectionProps> = ({
  showPersonalInfo = false,
}) => {
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [allAgreed, setAllAgreed] = useState(false);

  const handleCheckUsername = () => console.log('아이디 중복 확인');
  const handleRequestCode = () => console.log('인증번호 요청');
  const handleVerifyCode = () => console.log('인증번호 검증');
  const handleResendCode = () => console.log('인증번호 재전송');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }
    console.log('폼 제출');
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <AccountInfoSection onCheckUsername={handleCheckUsername} />

      {showPersonalInfo && <PersonalInfoSection gender={gender} onGenderChange={setGender} />}

      <ContactInfoSection
        onRequestCode={handleRequestCode}
        onVerifyCode={handleVerifyCode}
        onResendCode={handleResendCode}
      />
      <AgreementSection onAllChecked={setAllAgreed} />

      <button
        type="submit"
        className="my-9 w-full rounded-xl bg-mainBlue py-4 text-h2 text-white hover:opacity-50"
      >
        가입하기
      </button>
    </form>
  );
};
