import React from 'react';

interface ProfileCardProps {
  name: string;
  gender: string;
  birthDate: string;
  age: number;
  phone: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  gender,
  birthDate,
  age,
  phone,
  email,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 p-6 bg-white">
      <div className="flex items-center mb-4">
        <img src="/ic_profile.svg" alt="프로필" className="w-8 h-8 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">프로필</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">이름</span>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">성별</span>
          <span className="font-medium text-gray-900">{gender}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">생년월일</span>
          <span className="font-medium text-gray-900">{birthDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">나이</span>
          <span className="font-medium text-gray-900">{age}세</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">연락처</span>
          <span className="font-medium text-gray-900">{phone}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">이메일</span>
          <span className="font-medium text-gray-900">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
