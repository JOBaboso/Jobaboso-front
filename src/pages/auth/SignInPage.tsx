import { useState } from 'react';
import Button from '@components/common/Button';

const SigninPage = () => {
  const [tab, setTab] = useState<'personal' | 'company' | 'university'>('personal');

  const renderTabContent = () => (
    <form className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="아이디를 입력해주세요."
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mainBlue"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mainBlue"
      />
    </form>
  );

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">로그인</h2>

        {/* Tabs */}
        <div className="mb-6 mt-6 flex justify-center border-b border-gray-200">
          {[
            { label: '개인 회원', value: 'personal' },
            { label: '기업 회원', value: 'company' },
            { label: '대학교 교직원 회원', value: 'university' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value as any)}
              className={`px-4 py-2 text-sm font-medium ${
                tab === item.value ? 'border-b-2 border-mainBlue text-gray-900' : 'text-gray-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Form + Button Row */}
        <div className="flex justify-center gap-4">
          <div className="flex-1">{renderTabContent()}</div>
          <Button className="h-[88px] w-[90px]">로그인</Button>
        </div>

        {/* Option Row */}
        <div className="mt-3 flex justify-between px-1 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <span className="text-[11px]">⚪</span>
            로그인 유지하기
          </div>
          <div>
            IP 보안{' '}
            <span className="rounded-full bg-gray-200 px-2 py-0.5 font-bold text-mainBlue">ON</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
