import React from 'react';
import { CompanyInfoSection } from '@components/auth/CompanyInfoSection';
import { CommonSignupFormContainer } from '@components/auth/CommonSignupFormContainer';

const SignupCompanyPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-[586px]">
        <h1 className="mb-8 text-center text-[40px] font-bold leading-[60px] text-gray-800">
          기업 회원가입
        </h1>

        <h2 className="mb-4 text-h2 text-gray-900">기업 정보</h2>
        <CompanyInfoSection />

        <h2 className="mb-4 text-h2 text-gray-900">인사담당자 정보</h2>
        <CommonSignupFormContainer />
      </div>
    </div>
  );
};

export default SignupCompanyPage;
