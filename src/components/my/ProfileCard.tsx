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
    <div className="flex flex-col justify-center items-center p-8 mt-10 rounded-xl border border-gray-200">
      <div className="flex justify-center items-center mb-2 w-32 h-32 bg-gray-200 rounded-full">
        <svg
          className="block w-20 h-20 text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
        </svg>
      </div>
      <div className="mt-4 text-gray-800 text-h2">{name}</div>
      <div className="mt-3 text-gray-700 text-bodyLg">
        {gender === 'M' ? '남성' : '여성'} | {birthDate} (만 {age}세)
      </div>

      <div className="flex items-center self-start mt-3">
        <img
          src="/ic_phone.svg"
          alt="전화번호"
          className="z-10 mr-2 w-[20px] object-contain"
        />
        <p className="text-gray-700 text-bodyLg">{phone}</p>
      </div>

      <div className="flex items-center self-start mt-3">
        <img src="/ic_mail.svg" alt="이메일" className="z-10 mr-2 w-[20px] object-contain" />
        <p className="text-gray-700 text-bodyLg">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard; 