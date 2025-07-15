import React from 'react';
import { UniversityInfoSection } from '@components/auth/UniversityInfoSection';
import { CommonSignupFormContainer } from '@components/auth/CommonSignupFormContainer';

const SignupUniversityPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-[586px]">
        <h1 className="mb-8 text-center text-[40px] font-bold leading-[60px] text-gray-800">
          대학교 교직원 회원가입
        </h1>

        <h2 className="mb-4 text-h2 text-gray-900">대학교 정보</h2>
        <UniversityInfoSection />

        <h2 className="mb-4 text-h2 text-gray-900">교직원 정보</h2>
        <CommonSignupFormContainer />
      </div>
    </div>
  );
};

export default SignupUniversityPage;
