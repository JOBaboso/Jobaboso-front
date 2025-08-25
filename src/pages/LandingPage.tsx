import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  
  const thumbnails = [
    '/thumbnail/v1.png',
    '/thumbnail/v2.png', 
    '/thumbnail/v3.png'
  ];

  useEffect(() => {
    const userType = localStorage.getItem('user_type');
    if (userType === 'personal') {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % thumbnails.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [thumbnails.length]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 배경 이미지 슬라이드 */}
      {thumbnails.map((thumbnail, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* 콘텐츠 */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <div className="text-center">
          <h2 className="mb-8 text-6xl font-bold text-white drop-shadow-lg">잡아보소</h2>
          <p className="text-xl text-white drop-shadow-md">당신의 취업을 도와드립니다</p>
          
          {/* 인디케이터 */}
          <div className="mt-12 flex justify-center space-x-3">
            {thumbnails.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-4 w-4 rounded-full transition-all ${
                  index === currentImage 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
