import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface ReviewCardProps {
  company: string;
  status: string;
  content: string;
  date: string;
  logoUrl?: string;
}

const statusStyleMap: Record<string, string> = {
  최종합격: 'bg-[#E9F2FD] text-[#1779FA] border border-[#1779FA]',
  '1차합격': 'bg-[#FFF3C9] text-[#B7962C] border border-[#B7962C]',
  '2차합격': 'bg-[#D8FDD9] text-[#27B122] border border-[#27B122]',
  불합격: 'bg-[#FFD9D1] text-[#D84D4D] border border-[#D84D4D]',
};

const ReviewCard: React.FC<ReviewCardProps> = ({ company, status, content, date, logoUrl }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-8 transition-shadow duration-200 hover:shadow-md">
      {/* 상단: 프로필 + 기업명 + 점 세 개 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${company} 로고`}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-300" />
          )}
          <h3 className="text-h3 font-semibold text-gray-600">{company}</h3>
        </div>
        <HiOutlineDotsVertical className="h-5 w-5 cursor-pointer text-gray-300" />
      </div>

      {/* 아래 내용 전체를 기업명 기준 왼쪽 정렬 */}
      <div className="space-y-2 pl-11">
        <span
          className={`inline-flex h-[26px] items-center justify-center rounded-[4px] p-2 text-xs font-medium ${statusStyleMap[status] || 'border border-gray-300 bg-gray-200 text-gray-700'}`}
        >
          {status}
        </span>

        <p className="line-clamp-4 text-sm text-gray-600">{content}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
