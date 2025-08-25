import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center"
      style={{
        background:
          'linear-gradient(0deg, #FFFFFF -17.62%, #8BBCFD 40.52%, #519BFB 69.59%, #1779FA 98.67%)',
      }}
    >
      <img
        src="/thumbnail/thumbnail.png"
        alt="Thumbnail"
        className="h-full max-h-screen w-auto object-cover object-top"
      />

      {/* 버튼들 */}
      <div className="absolute left-80 top-[620px] flex gap-4">
        <Button
          onClick={() => navigate('/auth/signin')}
          variant="secondary"
          className="w-24 bg-white bg-opacity-90 text-blue-600 hover:bg-opacity-100"
        >
          로그인
        </Button>
        <Button
          onClick={() => navigate('/auth/signup/type')}
          variant="primary"
          className="w-24 bg-blue-600 text-white hover:bg-blue-700"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
