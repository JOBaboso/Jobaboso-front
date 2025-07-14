import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CredentialsSection } from '@components/auth/CredentialsSection';
import { PersonalInfoSection } from '@components/auth/PersonalInfoSection';
import { PhoneVerificationSection } from '@components/auth/PhoneVerificationSection';
import { AgreementSection } from '@components/auth/AgreementSection';
import { CompanyInfoSection } from '@components/auth/CompanyInfoSection';

const SignupCompanyPage: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [allAgreed, setAllAgreed] = useState(false);

  const handleAllChecked = (checked: boolean) => {
    setAllAgreed(checked);
  };

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
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-[586px]">
        <h1 className="mb-8 text-center text-[40px] font-bold leading-[60px] text-gray-800">
          기업 회원가입
        </h1>

        <form className="space-y-3" onSubmit={onSubmit}>
          <h2 className="mb-4 text-h2 text-gray-900">기업 정보</h2>
          <CompanyInfoSection />

          <h2 className="mb-4 text-h2 text-gray-900">인사담당자 정보</h2>
          <CredentialsSection onCheckUsername={handleCheckUsername} />

          <PersonalInfoSection gender={gender} onGenderChange={setGender} />

          <PhoneVerificationSection
            onRequestCode={handleRequestCode}
            onVerifyCode={handleVerifyCode}
            onResendCode={handleResendCode}
          />

          <AgreementSection onAllChecked={handleAllChecked} />

          <button
            type="submit"
            className="my-9 w-full rounded-xl bg-mainBlue py-4 text-h2 text-white hover:opacity-50"
          >
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupCompanyPage;
