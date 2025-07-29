import { InputField } from '@components/common/InputField';
import TagInput from '@components/common/TagInput';
import { useState, useRef, useEffect } from 'react';
import ResumeSidebar from '@components/my/ResumeSidebar';
import CustomCheckbox from '@components/common/CustomCheckbox';
import { FiSearch } from 'react-icons/fi';
import api from '@apis/api';

interface FormType {
  name: string;
  phone: string;
  gender: string;
  birth: string;
  email: string;
  university: string;
  major: string;
  subMajor: string;
  gpa: string;
  startDate: string;
  endDate: string;
  status: string;
  companies: string[];
  jobs: string[];
  regions: string[];
  agree: boolean;
  certificates: any[];
  activities: any[];
  contests: string[];
  projects: string[];
  bootcamps: string[];
  research: string[];
  skills: string[];
}

const StatusPage = () => {
  const [form, setForm] = useState<FormType>({
    name: '김보영',
    phone: '010-1111-1234',
    gender: '여성',
    birth: '2002.06.08',
    email: 'asdfasdf@gmail.com',
    university: '부산대학교',
    major: '국어국문학과',
    subMajor: '영어영문학과',
    gpa: '3.89',
    startDate: '2021년 3월',
    endDate: '2026년 2월',
    status: '재학중',
    companies: [],
    jobs: [],
    regions: [],
    agree: false,
    certificates: [], // 자격증
    activities: [],   // 인턴 및 대외활동
    contests: [],     // 대회 참여 및 수상
    projects: [],     // 프로젝트 및 동아리
    bootcamps: [],    // 부트캠프
    research: [],     // 학부연구생
    skills: [],       // 스킬
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // 추천 스킬 예시 데이터
  const recommendedSkills = [
    'Figma', 'Photoshop', 'Sketch', 'Zeplin', '계획성', 'HTML',
    'Adobe XD', 'GUI', 'ProPie', '고객지향성', 'Dreamweaver', '플래시',
    'InDesign', 'UI', '공감능력', 'BX', 'Blender', '프리미어',
    '와이어프레임', '고객응대'
  ];

  // 추천 스킬 선택/해제 핸들러
  const handleSkillToggle = (skill: string) => {
    if (form.skills.includes(skill)) {
      setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
    } else if (form.skills.length < 20) {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  // 나의 스킬 삭제 핸들러
  const handleRemoveSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  // 각 섹션 ref 생성
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    '인적사항': useRef<HTMLDivElement>(null),
    '학력': useRef<HTMLDivElement>(null),
    '희망 근무 조건': useRef<HTMLDivElement>(null),
    '보유역량': useRef<HTMLDivElement>(null),
    '스킬': useRef<HTMLDivElement>(null),
  };

  const [currentSection, setCurrentSection] = useState<string>('인적사항');

  // 스크롤 위치에 따라 현재 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = Object.entries(sectionRefs).map(([label, ref]) => {
        if (!ref.current) return { label, offset: Infinity };
        const rect = ref.current.getBoundingClientRect();
        return { label, offset: Math.abs(rect.top - 100) }; // 100px 오프셋(헤더 등 고려)
      });
      offsets.sort((a, b) => a.offset - b.offset);
      setCurrentSection(offsets[0].label);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 목차 클릭 시 해당 섹션으로 스크롤
  const handleSectionClick = (label: string) => {
    const ref = sectionRefs[label];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 저장(등록) 버튼 클릭 시 API 요청
  const handleSave = async () => {
    const accessToken = localStorage.getItem('access_token');
    
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const body = {
      skills: form.skills.map(skill => ({ skill_name: skill })),
      projects: [], // form.projects에서 변환 필요(현재 string[]이므로 실제 프로젝트 객체로 확장 필요)
      activities: [], // form.activities에서 변환 필요(현재 any[])
      certificates: [], // form.certificates에서 변환 필요(현재 any[])
      education: {
        school_name: '더미대학교',
        major: '더미전공',
        admission_year: '2020-03-01',
        graduation_year: '2024-02-01',
        status: '재학중',
        score: 4.2
      },
      hope: {
        company: '',
        job: '',
        region: ''
      }
    };

    try {
      const res = await api.post('/spec/all', body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert('스펙이 성공적으로 저장되었습니다.');
    } catch (e) {
      alert('에러 발생: ' + e);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {/* 왼쪽: 기존 이력서 편집 내용 */}
      <div className="mx-auto w-[1096px] ml-52">
        {/* 인사 박스 */}
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

        {/* 인적사항 */}
        <div ref={sectionRefs['인적사항']} id="section-personal" className="mb-16">
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
          <div className="row-span-2 justify-center">
            <label className="block p-1 mb-2 font-medium text-gray-700 text-h4">사진 등록</label>
            <div className="w-full h-[220px] border border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 text-[22px] cursor-pointer">
              <span className="text-[32px] mb-2">＋</span>
              사진 추가
            </div>
          </div>
          </div>
        </div>

        {/* 학력 */}
        <div ref={sectionRefs['학력']} id="section-education" className="mb-16">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">학력</h2>
          <div className="grid grid-cols-[217px_260px_260px] gap-6">
            <InputField id="university" label="학교명" placeholder="학교명을 입력하세요" value={form.university} onChange={handleChange('university')} />
            <InputField id="major" label="학과" placeholder="학과를 입력하세요" value={form.major} onChange={handleChange('major')} />
            <InputField id="subMajor" label="복수/부전공" placeholder="복수/부전공을 입력하세요" value={form.subMajor} onChange={handleChange('subMajor')} />
          </div>
          <div className="grid grid-cols-[124px_124px_180px_180px_180px] gap-6">
            <InputField id="gpa" label="학점" placeholder="학점을 입력하세요" value={form.gpa} onChange={handleChange('gpa')} />
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
            <label className="inline-flex gap-2 items-center cursor-pointer">
              <CustomCheckbox checked={form.agree} onChange={e => setForm({ ...form, agree: e.target.checked })} />
              <span className="text-bodyLg">
                해당 정보를 학교 교직원에게 공개하는 것에 동의합니다.
              </span>
            </label>
          </div>
        </div>

        {/* 희망 근무 조건 */}
        <div ref={sectionRefs['희망 근무 조건']} id="section-hope" className="mb-16 w-[862px]">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">희망 근무 조건</h2>

          {/* 기업 */}
          <div className="mb-8">
            <TagInput
              id="companies"
              label="기업"
              placeholder="기업을 입력하세요"
              value={form.companies}
              onChange={val => setForm({ ...form, companies: val })}
            />
          </div>

          {/* 직군 */}
          <div className="mb-8">
            <TagInput
              id="jobs"
              label="직군"
              placeholder="직군을 입력하세요"
              value={form.jobs}
              onChange={val => setForm({ ...form, jobs: val })}
            />
          </div>

          {/* 세부직군 필드 제거됨 */}

          {/* 근무지역 */}
          <div>
            <TagInput
              id="regions"
              label="근무지역"
              placeholder="근무지역을 입력하세요"
              value={form.regions}
              onChange={val => setForm({ ...form, regions: val })}
            />
          </div>
        </div>

        {/* 등록 버튼 위에 보유역량 섹션 추가 */}
        {/* 보유역량 */}
        <div ref={sectionRefs['보유역량']} id="section-ability" className="mb-16 w-[862px]">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">보유역량</h2>
          {/* 자격증 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label className="font-medium text-gray-700 text-h4">자격증</label>
              <button className="px-2 py-1 ml-auto text-sm font-medium rounded-full text-mainBlue bg-subLightBlue">추가하기</button>
            </div>
            <div className="flex gap-4 mb-2">
              <input className="flex-1 h-[66px] rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="자격증명을 검색해주세요." />
              <input className="w-1/4 h-[66px] rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="발행처" />
              <input className="w-1/4 h-[66px] rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="취득월" />
            </div>
          </div>
          {/* 인턴 및 대외활동 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label className="font-medium text-gray-700 text-h4">인턴 및 대외활동</label>
              <button className="px-2 py-1 ml-auto text-sm font-medium rounded-full text-mainBlue bg-subLightBlue">추가하기</button>
            </div>
            <div className="flex gap-4 mb-2">
              <input className="w-1/2 h-[66px] rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="활동구분" />
              <input className="w-1/2 h-[66px] rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="회사/기관/단체명" />
              <div className="flex">
                <input
                  className="w-1/2 h-[66px] border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 
                            focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue
                            rounded-l-lg rounded-r-none"
                  placeholder="시작년월"
                />
                <input
                  className="w-1/2 h-[66px] border-t border-b border-r border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 
                            focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue
                            rounded-l-none rounded-r-lg"
                  placeholder="종료년월"
                />
              </div>
            </div>
            <textarea className="w-full min-h-[80px] rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 resize-none mb-2 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue" placeholder="직무와 관련된 경험에 대해 작성하시는 게 좋아요!" />
          </div>
          {/* 대회 */}
          <div className="mb-8">
            <TagInput
              id="contests"
              label="대회 참여 및 수상"
              placeholder="대회명, 수상내역 등 입력"
              value={form.contests}
              onChange={val => setForm({ ...form, contests: val })}
            />
          </div>
          {/* 프로젝트 및 동아리 */}
          <div className="mb-8">
            <TagInput
              id="projects"
              label="프로젝트 및 동아리"
              placeholder="프로젝트명, 동아리명 등 입력"
              value={form.projects}
              onChange={val => setForm({ ...form, projects: val })}
            />
          </div>
          {/* 부트캠프 */}
          <div className="mb-8">
            <TagInput
              id="bootcamps"
              label="부트캠프"
              placeholder="부트캠프명 등 입력"
              value={form.bootcamps}
              onChange={val => setForm({ ...form, bootcamps: val })}
            />
          </div>
          {/* 학부연구생 */}
          <div className="mb-8">
            <TagInput
              id="research"
              label="학부연구생"
              placeholder="연구실명, 지도교수 등 입력"
              value={form.research}
              onChange={val => setForm({ ...form, research: val })}
            />
          </div>
        </div>

        {/* 등록 버튼 위에 스킬 섹션 추가 */}
       {/* 스킬 */}
       <div ref={sectionRefs['스킬']} id="section-skill" className="mb-16 w-[862px]">
         <h2 className="mb-10 font-semibold text-gray-800 text-h2">스킬</h2>
         <div className="relative mb-6">
           <input
             className="w-full h-[56px] rounded-lg border border-gray-200 bg-white pl-12 pr-4 py-3 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
             placeholder="찾으시는 스킬을 검색해보세요."
             disabled
           />
           <FiSearch className="absolute left-4 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
         </div>
         <div className="flex justify-between items-center mb-4">
           <span className="px-4 py-2 font-semibold text-gray-700 rounded-full border border-mainBlue text-h4">UI·UX 디자이너</span>
           <span className="text-xs text-gray-400 cursor-pointer">전체보기</span>
         </div>
         <div className="mb-2 text-gray-500 text-bodyLg">선택하신 직무에 맞는 스킬을 추천해드려요!</div>
         <div className="flex flex-wrap gap-2 mb-8">
           {recommendedSkills.map(skill => (
             <button
               key={skill}
               type="button"
               className={
                 form.skills.includes(skill)
                   ? 'bg-subLightBlue text-mainBlue px-4 py-2 rounded-xl text-h4 font-medium flex items-center gap-1 border border-mainBlue shadow-none'
                   : ' text-gray-600 px-4 py-2 rounded-xl text-h4 font-medium flex items-center gap-1 border border-gray-100 shadow-none'
               }
               style={{ minWidth: 'fit-content' }}
               onClick={() => handleSkillToggle(skill)}
             >
               {form.skills.includes(skill)
                 ? <span className="mr-1 text-lg">✓</span>
                 : <span className="mr-1 text-lg">+</span>
               }
               {skill}
             </button>
           ))}
         </div>
         <div className="p-6 rounded-xl border border-gray-200">
           <div className="flex gap-2 items-center mb-2 font-semibold text-gray-700 text-h4">
             나의 스킬 <span className="text-sm">({form.skills.length}/20)</span>
           </div>
           <div className="mb-2 text-gray-500 text-bodyLg">{form.name} 님이 선택하신 스킬을 기반으로 추천해드려요!</div>
           <div className="flex flex-wrap gap-2">
             {form.skills.map(skill => (
               <span
                 key={skill}
                 className="flex gap-1 items-center px-4 py-2 font-medium rounded-xl border shadow-none bg-subLightBlue border-mainBlue text-mainBlue text-h4"
               >
                 {skill}
                 <button
                   type="button"
                   className="ml-1 text-lg text-mainBlue hover:text-blue-800"
                   onClick={() => handleRemoveSkill(skill)}
                 >
                   ×
                 </button>
               </span>
             ))}
           </div>
         </div>
       </div>
      </div>
      
      {/* 오른쪽: 사이드바 */}
      <div className="mr-32">
        <div className="fixed top-60 right-32 w-[240px] z-30">
          <ResumeSidebar currentSection={currentSection} onSectionClick={handleSectionClick} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default StatusPage;