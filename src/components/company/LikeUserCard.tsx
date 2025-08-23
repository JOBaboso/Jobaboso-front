import React from 'react';
import { LikeItem } from '../../type/emp';
import { maskNameMiddle } from '../../utils/nameMasking';

interface LikeUserCardProps {
  like: LikeItem;
  onUnlike: (likeId: string | number) => void;
  onClick?: () => void;
}

const LikeUserCard: React.FC<LikeUserCardProps> = ({ like, onUnlike, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {maskNameMiddle(like.target_user_name)}
          </h3>
          <p className="text-sm text-gray-500">
            찜한 날짜: {formatDate(like.created_at)}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnlike(like.id);
          }}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          title="찜하기 취소"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* 메시지 섹션 */}
      {like.message && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">메시지</h4>
          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
            {like.message}
          </p>
        </div>
      )}

      {/* 제안 포지션 */}
      {like.suggested_position && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">제안 포지션</h4>
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {like.suggested_position}
          </span>
        </div>
      )}

      {/* 연락처 정보 */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">연락처 정보</h4>
        <div className="space-y-2">
          {like.contact_email && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {like.contact_email}
            </div>
          )}
          {like.contact_phone && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {like.contact_phone}
            </div>
          )}
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>회사: {like.company_name}</span>
          <span>담당자: {like.hr_manager_name}</span>
        </div>
      </div>
    </div>
  );
};

export default LikeUserCard;
