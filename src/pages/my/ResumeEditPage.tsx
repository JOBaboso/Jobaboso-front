import { InputField } from '@components/common/InputField';
import TagInput from '@components/common/TagInput';
import { useState } from 'react';
import ResumeSidebar from '@components/my/ResumeSidebar';

const StatusPage = () => {
  const [form, setForm] = useState({
    name: '김보영',
    phone: '010-1111-1234',
    gender: '여성',
    birth: '2002.06.08',
    email: 'asdfasdf@gmail.com',
    university: '부산대학교',
    major: '국어국문학과',
    subMajor: '영어영문학과',
    gpa: '3.89',
    maxGpa: '4.5',
    startDate: '2021년 3월',
    endDate: '2026년 2월',
    status: '재학중',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <div className="flex justify-center w-full">
      {/* 왼쪽: 기존 이력서 편집 내용 */}
      <div className="mx-auto w-[1096px] ml-52">
        {/* 👋 인사 박스 */}
        <div className="flex items-center justify-between w-[925px] px-7 py-5 bg-white shadow-even rounded-3xl my-24 relative overflow-hidden" >
          {/* 파란 원 두 개 - 이미지 뒤에 겹치게 */}
          <div className="absolute z-0 w-[100px] h-[100px] bg-blue-300 rounded-full right-[70px] bottom-[18px] opacity-50" />
          <div className="absolute z-0 w-[140px] h-[140px] bg-blue-300 rounded-full right-[-20px] bottom-[-50px] opacity-50" />
          <div className="z-10">
            <p className="text-[32px] font-semibold text-gray-600">
              안녕하세요, <span className="text-mainBlue">{form.name}</span> 님!
            </p>
            <p className="text-gray-600 text-[32px]">기업에게 {form.name} 님에 대해 알려주세요.</p>
          </div>
          <img
            src="/ResumeEditBanner.png"
            alt="일러스트"
            className="z-10 object-contain w-[151px] pr-7"
          />
        </div>

        {/* 🧍 인적사항 */}
        <div className="mb-16">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">인적사항</h2>
          <div className="grid grid-cols-[700px_200px] gap-6">
            <div className="grid grid-cols-[212px_278px_149px] gap-6">
              {/* 1행 */}
              <InputField id="name" label="이름" placeholder="이름을 입력하세요" value={form.name} onChange={handleChange('name')} />
              <InputField id="phone" label="전화번호" placeholder="전화번호를 입력하세요" value={form.phone} onChange={handleChange('phone')} />
              <div>
                <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">성별</label>
                <select
                  className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="여성">여성</option>
                  <option value="남성">남성</option>
                </select>
              </div>
              {/* 2행 */}
              <div className="grid grid-cols-[212px_452px] gap-6">
                <InputField id="birth" label="생년월일" placeholder="YYYY.MM.DD" value={form.birth} onChange={handleChange('birth')} />
                <InputField id="email" label="이메일" placeholder="이메일을 입력하세요" value={form.email} onChange={handleChange('email')} />
              </div>
            </div>
          <div className="justify-center row-span-2">
            <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">사진 등록</label>
            <div className="w-full h-[220px] border border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 text-[22px] cursor-pointer">
              <span className="text-[32px] mb-2">＋</span>
              사진 추가
            </div>
          </div>
          </div>
        </div>

        {/* 🎓 학력 */}
        <div>
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">학력</h2>
          <div className="grid grid-cols-[217px_260px_260px] gap-6">
            <InputField id="university" label="학교명" placeholder="학교명을 입력하세요" value={form.university} onChange={handleChange('university')} />
            <InputField id="major" label="학과" placeholder="학과를 입력하세요" value={form.major} onChange={handleChange('major')} />
            <InputField id="subMajor" label="복수/부전공" placeholder="복수/부전공을 입력하세요" value={form.subMajor} onChange={handleChange('subMajor')} />
          </div>
          <div className="grid grid-cols-[124px_124px_180px_180px_180px] gap-6">
            <InputField id="gpa" label="학점" placeholder="학점을 입력하세요" value={form.gpa} onChange={handleChange('gpa')} />
            <InputField id="maxGpa" label="총점" placeholder="총점을 입력하세요" value={form.maxGpa} onChange={handleChange('maxGpa')} />
            <InputField id="startDate" label="입학년도" placeholder="예: 2021년 3월" value={form.startDate} onChange={handleChange('startDate')} />
            <InputField id="endDate" label="졸업년도" placeholder="예: 2026년 2월" value={form.endDate} onChange={handleChange('endDate')} />
            <div>
              <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">상태</label>
              <select
                className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="재학중">재학중</option>
                <option value="졸업예정">졸업예정</option>
                <option value="졸업">졸업</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center text-bodyLg">
              <input type="checkbox" className="mr-2" />
              <span>해당 정보를 학교 교직원에게 공개하는 것에 동의합니다.</span>
            </label>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">등록하기</button>
        </div>
      </div>
      {/* 오른쪽: 사이드바 */}
      <div className="mr-32">
        <ResumeSidebar />
      </div>
    </div>
  );
};

export default StatusPage;