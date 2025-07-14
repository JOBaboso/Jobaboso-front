import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CredentialsSection } from '@components/auth/CredentialsSection';
import { PersonalInfoSection } from '@components/auth/PersonalInfoSection';
import { PhoneVerificationSection } from '@components/auth/PhoneVerificationSection';
import { AgreementSection } from '@components/auth/AgreementSection';

const SignupPersonalPage: React.FC = () => {
  const [gender, setGender] = useState<'male'|'female'|''>('');
  const [allAgreed, setAllAgreed] = useState(false);

  const handleAllChecked = (checked: boolean) => {
    setAllAgreed(checked);
  };

  const handleCheckUsername = () => console.log('아이디 중복 확인');
  const handleRequestCode   = () => console.log('인증번호 요청');
  const handleVerifyCode    = () => console.log('인증번호 검증');
  const handleResendCode    = () => console.log('인증번호 재전송');
  const onSubmit            = (e: FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }
    console.log('폼 제출');
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-[586px] mx-auto">
        <h1 className="text-[40px] font-bold leading-[60px] text-gray-800 text-center mb-8">
          개인 회원가입
        </h1>

        <form className="space-y-3" onSubmit={onSubmit}>
          <CredentialsSection onCheckUsername={handleCheckUsername} />

          <PersonalInfoSection
            gender={gender}
            onGenderChange={setGender}
          />

          <PhoneVerificationSection
            onRequestCode={handleRequestCode}
            onVerifyCode={handleVerifyCode}
            onResendCode={handleResendCode}
          />

          <AgreementSection onAllChecked={handleAllChecked} />

          <button
            type="submit"
            className="w-full my-9 py-4 bg-mainBlue text-white text-h2 rounded-xl hover:opacity-50"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPersonalPage;