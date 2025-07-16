// src/components/auth/CommonSignupFormSection.tsx
import React, { FormEvent, useState } from 'react';
import { AccountInfoSection } from './AccountInfoSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ContactInfoSection } from './ContactInfoSection';
import { AgreementSection } from './AgreementSection';
import { postSignUpPersonal } from '@apis/auth';
import { SignUpPersonalRequestDto } from '@type/authDTO/SignUpDTO';

interface CommonSignupFormSectionProps {
  showPersonalInfo?: boolean; // ← 기본값은 false
}

export const CommonSignupFormContainer: React.FC<CommonSignupFormSectionProps> = ({
  showPersonalInfo = false,
}) => {
  // useState를 함수 내부에서 선언
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [profileAddr, setProfileAddr] = useState('');
  const [gender, setGender] = useState<'M' | 'W' | ''>('');
  const [allAgreed, setAllAgreed] = useState(false);

  const handleCheckUsername = () => console.log('아이디 중복 확인');
  const handleRequestCode = () => console.log('인증번호 요청');
  const handleVerifyCode = () => console.log('인증번호 검증');
  const handleResendCode = () => console.log('인증번호 재전송');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      alert('모든 약관에 동의해 주세요.');
      return;
    }
    const request: SignUpPersonalRequestDto = {
      user_id: userId,
      password,
      user_type: 'personal',
      name,
      phone,
      email,
      birth_date: birthDate,
      gender: gender,
      profile_addr: profileAddr,
    };
    try {
      await postSignUpPersonal(request);
      alert('회원가입이 완료되었습니다.');
      // 예: navigate('/login');
    } catch (err) {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <AccountInfoSection
        userId={userId}
        onChangeUserId={setUserId}
        password={password}
        onChangePassword={setPassword}
        passwordConfirm={passwordConfirm}
        onChangePasswordConfirm={setPasswordConfirm}
        name={name}
        onChangeName={setName}
        onCheckUsername={handleCheckUsername}
      />

      {showPersonalInfo && (
        <PersonalInfoSection
          birthDate={birthDate}
          onChangeBirthDate={setBirthDate}
          gender={gender}
          onGenderChange={setGender}
          profileAddr={profileAddr}
          onChangeProfileAddr={setProfileAddr}
        />
      )}

      <ContactInfoSection
        phone={phone}
        onChangePhone={setPhone}
        email={email}
        onChangeEmail={setEmail}
        onRequestCode={handleRequestCode}
        onVerifyCode={handleVerifyCode}
        onResendCode={handleResendCode}
      />

      <AgreementSection onAllChecked={setAllAgreed} />

      <button
        type="submit"
        className="my-9 w-full rounded-xl bg-mainBlue py-4 text-h2 text-white hover:opacity-50"
      >
        가입하기
      </button>
    </form>
  );
};
