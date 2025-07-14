import React from 'react';
import { CommonSignupFormSection } from '@components/auth/CommonSignupFormSection';

const SignupPersonalPage: React.FC = () => {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-[586px]">
        <h1 className="mb-8 text-center text-[40px] font-bold leading-[60px] text-gray-800">
          개인 회원가입
        </h1>
        <CommonSignupFormSection />
      </div>
    </div>
  );
};

export default SignupPersonalPage;
