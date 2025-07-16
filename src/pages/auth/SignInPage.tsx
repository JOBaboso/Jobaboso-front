import { useState } from 'react';
import Button from '@components/common/Button';

const SigninPage = () => {
  const [tab, setTab] = useState<'personal' | 'company' | 'university'>('personal');

  const renderTabContent = () => (
    <form className="flex flex-col flex-1 gap-4">
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        className="px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainBlue"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainBlue"
      />
    </form>
  );

  return (
    <div
      className="flex items-center justify-center w-full px-4 bg-gray-50"
      style={{ minHeight: 'calc(100vh - 116px - 50px)' }} // header + footer 높이 고려
    >
      <div className="w-full max-w-2xl text-center text-[17px]">
        {/* 타이틀 */}
        <h2 className="mb-4 text-3xl font-bold text-gray-900">로그인</h2>

        {/* 탭 */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          {[
            { label: '개인 회원', value: 'personal' },
            { label: '기업 회원', value: 'company' },
            { label: '대학교 교직원 회원', value: 'university' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value as any)}
              className={`px-6 py-3 text-base font-medium ${
                tab === item.value
                  ? 'border-b-2 border-mainBlue text-gray-900'
                  : 'text-gray-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 로그인 폼 + 버튼 */}
        <div className="flex justify-center gap-6">
          {renderTabContent()}
          <div className="flex flex-col items-center">
            <Button className="h-[88px] w-[120px] text-base mb-2">로그인</Button>

            {/* IP 보안 */}
            <div className="text-sm text-gray-500">
              IP 보안{' '}
              <span className="px-2 py-0.5 font-bold bg-gray-200 rounded-full text-mainBlue">
                ON
              </span>
            </div>
          </div>
        </div>

        {/* 로그인 유지하기 (왼쪽 아래 정렬) */}
        <div className="flex justify-start px-1 mt-3 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-[12px]">⚪</span>
            로그인 유지하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
