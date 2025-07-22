import { useState } from 'react';
import { signin } from '@apis/auth';
import { SignInRequestDto } from '@type/auth/SignUpDTO';

import Button from '@components/common/Button';

const SigninPage = () => {
  const [tab, setTab] = useState<'personal' | 'company' | 'university'>('personal');
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);

  const handleLogin = async () => {
    try {
      const payload: SignInRequestDto = { user_id, password };
      const data = await signin(payload);

      console.log('✅ 로그인 성공:', data);

      if (keepLogin) {
        // 예: 토큰이나 사용자 정보를 localStorage에 저장
        localStorage.setItem('token', data.token); // ← 백엔드 응답에 따라 조정
      }

      // 이후 페이지 이동 또는 상태 갱신
      // 예: router.push('/dashboard') 등
    } catch (error: any) {
      console.error('❌ 로그인 실패:', error.response?.data?.message || error.message);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  const renderTabContent = () => (
    <form className="flex flex-1 flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
        className="h-[66px] rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-mainBlue"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-[66px] rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-1 focus:ring-mainBlue"
      />
    </form>
  );

  return (
    <div className="flex w-full flex-col items-center bg-white px-4 py-10">
      <div className="h-[153px] w-full max-w-[704px] text-center">
        {/* 타이틀 */}
        <h2 className="m-10 text-[40px] font-bold text-gray-800">로그인</h2>

        {/* 탭 */}
        <div className="mb-8 flex justify-center">
          {[
            { label: '개인 회원', value: 'personal' },
            { label: '기업 회원', value: 'company' },
            { label: '대학교 교직원 회원', value: 'university' },
          ].map((item) => {
            const isActive = tab === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setTab(item.value as any)}
                className={`borders h-[72px] w-[234px] rounded-tl-[15px] rounded-tr-[15px] border-gray-200 text-center text-base text-h3 font-medium ${
                  isActive
                    ? 'z-10 -mb-[1px] h-[71px] border-[1.5px] border-mainBlue border-b-white bg-white text-gray-900'
                    : 'border-b-[1.5px] border-b-mainBlue bg-gray-50 text-gray-600'
                } `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {/* 로그인 폼 + 버튼 */}
        <div className="flex justify-center gap-6">
          {renderTabContent()}
          <div className="flex flex-col items-center">
            <Button className="h-full w-[148px]" onClick={handleLogin}>
              로그인
            </Button>
          </div>
        </div>

        {/* 로그인 유지하기 & IP 보안 */}
        <div className="mt-3 flex w-full items-center justify-between px-1 text-sm text-gray-400">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 accent-mainBlue"
              checked={keepLogin}
              onChange={(e) => setKeepLogin(e.target.checked)}
            />
            로그인 유지하기
          </label>

          {/* IP 보안 - 오른쪽 */}
          <div className="text-sm text-gray-500">
            IP 보안{' '}
            <span className="rounded-full bg-gray-200 px-2 py-0.5 font-bold text-mainBlue">ON</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
