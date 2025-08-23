import React, { useState } from 'react';
import LikeModal from './LikeModal';
import { maskNameMiddle } from '../../utils/nameMasking';

interface UserCardProps {
  id: string | number;
  name: string;
  age?: number;
  gender?: string;
  university?: string;
  major?: string;
  skills?: string[];
  isLiked?: boolean;
  onLike?: (id: string | number, data: {
    message: string;
    contact_email: string;
    contact_phone: string;
    suggested_position: string;
  }) => void;
  onUnlike?: (id: string | number) => void;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  age,
  gender,
  university,
  major,
  skills,
  isLiked = false,
  onLike,
  onUnlike,
  onClick
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeartClick = () => {
    if (isLiked && onUnlike) {
      // 이미 좋아요가 되어 있으면 삭제
      onUnlike(id);
    } else if (!isLiked && onLike) {
      // 좋아요가 되어 있지 않으면 모달 열기
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = (data: {
    message: string;
    contact_email: string;
    contact_phone: string;
    suggested_position: string;
  }) => {
    if (onLike) {
      onLike(id, data);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-6 relative border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        {/* 하트 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleHeartClick();
          }}
          className={`absolute top-4 right-4 transition-colors ${
            isLiked 
              ? 'text-red-500 hover:text-red-700' 
              : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* 프로필 정보 */}
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {maskNameMiddle(name)} ({gender === '여' ? '여' : '남'}, 만 {age}세)
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              {university}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              {major} 졸업
            </p>
            
            {/* 직무 및 스킬 */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  AI개발
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  백엔드개발자
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills?.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 좋아요 모달 */}
      <LikeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        userName={name}
      />
    </>
  );
};

export default UserCard;
