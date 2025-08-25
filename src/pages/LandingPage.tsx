import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType === 'personal') {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <h2 className="mb-8 text-center text-4xl font-bold">랜딩 페이지</h2>
        <p className="text-center text-gray-600">여기에 내용을 추가하세요</p>
      </div>
    </div>
  );
};

export default LandingPage;
