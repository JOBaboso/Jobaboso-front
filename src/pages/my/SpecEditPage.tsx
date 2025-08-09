import { InputField } from '@components/common/InputField';
import TagInput from '@components/common/TagInput';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeSidebar from '@components/employment/ResumeSidebar';
import CustomCheckbox from '@components/common/CustomCheckbox';
import { FiSearch, FiPlus, FiX } from 'react-icons/fi';
import api from '@apis/api';

interface HopeType {
  company: string;
  job: string;
  region: string;
}

interface ProjectType {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  period?: string; // UI 표시용 (선택적)
}

interface ActivityType {
  type: string;
  title: string;
  detail: string;
  activity_date: string;
}

interface CertificateType {
  name: string;
  issuer: string;
  date: string;
}

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
  agree: boolean;
  companies: string[];
  jobs: string[];
  regions: string[];
  projects: ProjectType[];
  activities: ActivityType[];
  certificates: CertificateType[];
  contests: string[];
  bootcamps: string[];
  research: string[];
  skills: string[];
}

const StatusPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormType>({
    name: '',
    phone: '',
    gender: '여성',
    birth: '',
    email: '',
    university: '',
    major: '',
    subMajor: '',
    gpa: '',
    startDate: '2021-03',
    endDate: '2026-02',
    status: '재학중',
    agree: true,
    companies: [],
    jobs: [],
    regions: [],
    projects: [],
    activities: [],
    certificates: [],
    contests: [],
    bootcamps: [],
    research: [],
    skills: [],
  });

  const [loading, setLoading] = useState(false);

  // 날짜 형식을 YYYY-MM-DD로 변환하는 함수
  const parseDate = (dateString: string): string => {
    if (!dateString) return '';

    // "2021년 3월" 형식을 "2021-03-01"로 변환
    const yearMatch = dateString.match(/(\d{4})년/);
    const monthMatch = dateString.match(/(\d{1,2})월/);

    if (yearMatch && monthMatch) {
      const year = yearMatch[1];
      const month = monthMatch[1].padStart(2, '0');
      return `${year}-${month}-01`;
    }

    // YYYY-MM 형식을 YYYY-MM-01로 변환
    const yearMonthMatch = dateString.match(/^(\d{4})-(\d{2})$/);
    if (yearMonthMatch) {
      const year = yearMonthMatch[1];
      const month = yearMonthMatch[2];
      return `${year}-${month}-01`;
    }

    // 이미 YYYY-MM-DD 형식인 경우 그대로 반환
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    return '';
  };

  // 날짜 입력 시 자동으로 하이픈 추가하는 함수
  const formatDateInput = (value: string): string => {
    // 숫자와 하이픈만 허용
    const cleaned = value.replace(/[^\d-]/g, '');

    // 하이픈 제거 후 숫자만 추출
    const numbers = cleaned.replace(/-/g, '');

    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
    }
  };

  // 입학년도/졸업년도용 날짜 입력 함수 (월까지만 입력 가능)
  const formatYearMonthInput = (value: string): string => {
    // 숫자와 하이픈만 허용
    const cleaned = value.replace(/[^\d-]/g, '');

    // 하이픈 제거 후 숫자만 추출
    const numbers = cleaned.replace(/-/g, '');

    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      // 6자리 초과는 무시 (월까지만 입력 가능)
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}`;
    }
  };

  // 전화번호 자동 하이픈 추가 함수
  const formatPhoneNumber = (value: string): string => {
    // 숫자와 하이픈만 허용
    const cleaned = value.replace(/[^\d-]/g, '');

    // 하이픈 제거 후 숫자만 추출
    const numbers = cleaned.replace(/-/g, '');

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // 페이지 진입 시 기존 데이터 불러오기
  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/spec/all');
      if (response.data) {
        const data = response.data;
        setForm((prev) => ({
          ...prev,
          // 인적사항
          name: data.personal_info?.name || '',
          phone: data.personal_info?.phone ? formatPhoneNumber(data.personal_info.phone) : '',
          gender: data.personal_info?.gender === 'M' ? '남성' : '여성',
          birth: data.personal_info?.birth_date || '',
          email: data.personal_info?.email || '',
          // 학력
          university: data.education?.school_name || '',
          major: data.education?.major || '',
          subMajor: '',
          gpa: data.education?.score?.toString() || '',
          startDate: data.education?.admission_year
            ? data.education.admission_year.substring(0, 7)
            : '2021-03',
          endDate: data.education?.graduation_year
            ? data.education.graduation_year.substring(0, 7)
            : '2026-02',
          status: data.education?.status || '재학중',
          // 희망 조건
          companies: data.hope?.company ? [data.hope.company] : [],
          jobs: data.hope?.job ? [data.hope.job] : [],
          regions: data.hope?.region ? [data.hope.region] : [],
          // 기타
          projects: data.projects?.map((project: any) => ({
            name: project.project_name || '',
            description: project.description || '',
            start_date: project.start_date || '',
            end_date: project.end_date || '',
            period: project.start_date && project.end_date ? `${project.start_date} ~ ${project.end_date}` : ''
          })) || [],
          activities: data.activities?.map((activity: any) => ({
            type: activity.type === '인턴' ? 'intern' : 
                  activity.type === '동아리' ? 'club' : 
                  activity.type === '대회' ? 'contest' : 
                  activity.type || '',
            title: activity.title || '',
            detail: activity.detail || '',
            activity_date: activity.activity_date || ''
          })) || [],
          certificates:
            data.certificates?.map((cert: any) => ({
              name: cert.cert_name || '',
              issuer: cert.score || '',
              date: cert.certificate_date || '',
            })) || [],
          skills: data.skills?.map((s: any) => s.skill_name) || [],
          contests: data.contests || [],
          bootcamps: data.bootcamps || [],
          research: data.research || [],
        }));
      }
    } catch (error) {
      console.log('기존 데이터가 없거나 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // 프로젝트 추가
  const addProject = () => {
    const nameInput = document.getElementById('project-name') as HTMLInputElement;
    const startInput = document.getElementById('project-start') as HTMLInputElement;
    const endInput = document.getElementById('project-end') as HTMLInputElement;
    const descInput = document.getElementById('project-desc') as HTMLTextAreaElement;

    if (nameInput && startInput && endInput && descInput) {
      const name = nameInput.value;
      const startDate = parseDate(startInput.value);
      const endDate = parseDate(endInput.value);
      const description = descInput.value;

      if (name && startDate && endDate && description) {
        setForm({
          ...form,
          projects: [...form.projects, { 
            name, 
            description, 
            start_date: startDate,
            end_date: endDate,
            period: `${startDate} ~ ${endDate}` // UI 표시용
          }],
        });

        // 입력창 초기화
        nameInput.value = '';
        startInput.value = '';
        endInput.value = '';
        descInput.value = '';
      } else {
        alert('모든 필드를 입력해주세요.');
      }
    }
  };

  // 프로젝트 삭제
  const removeProject = (index: number) => {
    setForm({
      ...form,
      projects: form.projects.filter((_, i) => i !== index),
    });
  };

  // 프로젝트 변경
  const handleProjectChange =
    (index: number, field: keyof ProjectType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newProjects = [...form.projects];
      newProjects[index] = { ...newProjects[index], [field]: e.target.value };
      setForm({ ...form, projects: newProjects });
    };

  // 동아리 추가
  const addClub = () => {
    const clubNameInput = document.getElementById('club-name') as HTMLInputElement;
    const clubStartInput = document.getElementById('club-start') as HTMLInputElement;
    const clubDescInput = document.getElementById('club-desc') as HTMLTextAreaElement;

    if (clubNameInput && clubStartInput && clubDescInput) {
      const name = clubNameInput.value;
      const startDate = parseDate(clubStartInput.value);
      const description = clubDescInput.value;

      if (name && startDate && description) {
        // activities에 club 타입으로 추가
        setForm({
          ...form,
          activities: [...form.activities, { 
            type: 'club', 
            title: name, 
            activity_date: startDate, 
            detail: description
          }],
        });

        // 입력창 초기화
        clubNameInput.value = '';
        clubStartInput.value = '';
        clubDescInput.value = '';
      } else {
        alert('모든 필드를 입력해주세요.');
      }
    }
  };

  // 활동 추가
  const addActivity = () => {
    const typeInput = document.getElementById('activity-type') as HTMLSelectElement;
    const titleInput = document.getElementById('activity-title') as HTMLInputElement;
    const dateInput = document.getElementById('activity-date') as HTMLInputElement;
    const detailInput = document.getElementById('activity-detail') as HTMLTextAreaElement;

    if (typeInput && titleInput && dateInput && detailInput) {
      const type = typeInput.value;
      const title = titleInput.value;
      const activity_date = parseDate(dateInput.value);
      const detail = detailInput.value;

      if (type && title && activity_date && detail) {
        setForm({
          ...form,
          activities: [...form.activities, { type, title, activity_date, detail }],
        });

        // 입력창 초기화
        typeInput.value = '';
        titleInput.value = '';
        dateInput.value = '';
        detailInput.value = '';
      } else {
        alert('모든 필드를 입력해주세요.');
      }
    }
  };

  // 활동 삭제
  const removeActivity = (index: number) => {
    setForm({
      ...form,
      activities: form.activities.filter((_, i) => i !== index),
    });
  };

  // 활동 변경
  const handleActivityChange =
    (index: number, field: keyof ActivityType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newActivities = [...form.activities];
      newActivities[index] = { ...newActivities[index], [field]: e.target.value };
      setForm({ ...form, activities: newActivities });
    };

  // 자격증 추가
  const addCertificate = () => {
    const nameInput = document.getElementById('cert-name') as HTMLInputElement;
    const issuerInput = document.getElementById('cert-issuer') as HTMLInputElement;
    const dateInput = document.getElementById('cert-date') as HTMLInputElement;

    if (nameInput && issuerInput && dateInput) {
      const name = nameInput.value;
      const issuer = issuerInput.value;
      const date = parseDate(dateInput.value);

      if (name && issuer && date) {
        setForm({
          ...form,
          certificates: [...form.certificates, { name, issuer, date }],
        });

        // 입력창 초기화
        nameInput.value = '';
        issuerInput.value = '';
        dateInput.value = '';
      } else {
        alert('모든 필드를 입력해주세요.');
      }
    }
  };

  // 자격증 삭제
  const removeCertificate = (index: number) => {
    setForm({
      ...form,
      certificates: form.certificates.filter((_, i) => i !== index),
    });
  };

  // 자격증 변경
  const handleCertificateChange =
    (index: number, field: keyof CertificateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCertificates = [...form.certificates];
      newCertificates[index] = { ...newCertificates[index], [field]: e.target.value };
      setForm({ ...form, certificates: newCertificates });
    };

  // 추천 스킬 예시 데이터
  const recommendedSkills = [
    'Figma',
    'Photoshop',
    'Sketch',
    'Zeplin',
    '계획성',
    'HTML',
    'Adobe XD',
    'GUI',
    'ProPie',
    '고객지향성',
    'Dreamweaver',
    '플래시',
    'InDesign',
    'UI',
    '공감능력',
    'BX',
    'Blender',
    '프리미어',
    '와이어프레임',
    '고객응대',
  ];

  // 추천 스킬 선택/해제 핸들러
  const handleSkillToggle = (skill: string) => {
    if (form.skills.includes(skill)) {
      setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
    } else if (form.skills.length < 20) {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  // 나의 스킬 삭제 핸들러
  const handleRemoveSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
  };

  // 각 섹션 ref 생성
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    인적사항: useRef<HTMLDivElement>(null),
    학력: useRef<HTMLDivElement>(null),
    '희망 근무 조건': useRef<HTMLDivElement>(null),
    보유역량: useRef<HTMLDivElement>(null),
    스킬: useRef<HTMLDivElement>(null),
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
      skills: form.skills.map((skill) => ({ skill_name: skill })),
      projects: form.projects.map((project) => ({
        project_name: project.name,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date
      })),
      activities: form.activities,
      certificates: form.certificates.map((cert) => ({
        cert_name: cert.name,
        score: cert.issuer,
        certificate_date: cert.date,
      })),
      contests: form.contests,
      bootcamps: form.bootcamps,
      research: form.research,
      education: {
        school_name: form.university,
        major: form.major,
        admission_year: parseDate(form.startDate),
        graduation_year: parseDate(form.endDate),
        status: form.status,
        score: parseFloat(form.gpa),
      },
      hope: {
        company: form.companies.join(', '),
        job: form.jobs.join(', '),
        region: form.regions.join(', '),
      },
    };

    try {
      const res = await api.post('/spec/all', body);
      alert('스펙이 성공적으로 저장되었습니다.');
      // 저장 성공 시 SpecPage로 이동
      navigate('/my/spec');
    } catch (e) {
      alert('에러 발생: ' + e);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  return (
    <div className="flex justify-center w-full">
      {/* 왼쪽: 기존 이력서 편집 내용 */}
      <div className="mx-auto ml-52 w-[1096px]">
        {/* 인사 박스 */}
        <div className="relative mb-14 mt-10 flex w-[925px] items-center justify-between overflow-hidden rounded-3xl bg-white px-7 py-5 shadow-even">
          {/* 파란 원 두 개 - 이미지 뒤에 겹치게 */}
          <div className="absolute bottom-[18px] right-[70px] z-0 h-[100px] w-[100px] rounded-full bg-blue-300 opacity-50" />
          <div className="absolute bottom-[-50px] right-[-20px] z-0 h-[140px] w-[140px] rounded-full bg-blue-300 opacity-50" />
          <div className="z-10">
            <p className="text-[32px] font-semibold text-gray-600">
              안녕하세요, <span className="text-mainBlue">{form.name}</span> 님!
            </p>
            <p className="text-[32px] text-gray-600">학교에게 {form.name} 님에 대해 알려주세요.</p>
          </div>
          <img
            src="/ResumeEditBanner.png"
            alt="일러스트"
            className="z-10 w-[151px] object-contain pr-7"
          />
        </div>

        {/* 인적사항 */}
        <div ref={sectionRefs['인적사항']} id="section-personal" className="mb-16">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">인적사항</h2>
          <div className="grid grid-cols-[700px] gap-6">
            <div className="grid grid-cols-[212px_278px_149px] gap-6">
              {/* 1행 */}
              <InputField
                id="name"
                label="이름"
                placeholder="이름을 입력하세요"
                value={form.name}
                onChange={handleChange('name')}
              />
              <InputField
                id="phone"
                label="전화번호"
                placeholder="010-1234-5678"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
              />
              <div>
                <label
                  htmlFor="gender"
                  className="block p-1 mb-2 font-medium text-gray-700 text-h4"
                >
                  성별
                </label>
                <select
                  id="gender"
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
                <InputField
                  id="birth"
                  label="생년월일"
                  placeholder="YYYY-MM-DD"
                  value={form.birth}
                  onChange={(e) => setForm({ ...form, birth: formatDateInput(e.target.value) })}
                />
                <InputField
                  id="email"
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 학력 */}
        <div ref={sectionRefs['학력']} id="section-education" className="mb-16">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">학력</h2>
          <div className="grid grid-cols-[237px_280px] gap-6">
            <InputField
              id="university"
              label="학교명"
              placeholder="학교명을 입력하세요"
              value={form.university}
              onChange={handleChange('university')}
            />
            <InputField
              id="major"
              label="학과"
              placeholder="학과를 입력하세요"
              value={form.major}
              onChange={handleChange('major')}
            />
          </div>
          <div className="grid grid-cols-[124px_180px_180px_180px] gap-6">
            <InputField
              id="gpa"
              label="학점"
              placeholder="학점을 입력하세요"
              value={form.gpa}
              onChange={handleChange('gpa')}
            />
            <InputField
              id="startDate"
              label="입학년도"
              placeholder="YYYY-MM"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: formatYearMonthInput(e.target.value) })
              }
            />
            <InputField
              id="endDate"
              label="졸업년도"
              placeholder="YYYY-MM"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: formatYearMonthInput(e.target.value) })}
            />
            <div>
              <label htmlFor="status" className="block p-1 mb-2 font-medium text-gray-700 text-h4">
                상태
              </label>
              <select
                id="status"
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
            <div 
              className="inline-flex gap-2 items-center cursor-pointer"
              onClick={() => setForm({ ...form, agree: !form.agree })}
            >
              <CustomCheckbox
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              />
              <span className="text-bodyLg">
                해당 정보를 학교 교직원에게 공개하는 것에 동의합니다.
              </span>
            </div>
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
              onChange={(val) => setForm({ ...form, companies: val })}
            />
          </div>

          {/* 직군 */}
          <div className="mb-8">
            <TagInput
              id="jobs"
              label="직군"
              placeholder="직군을 입력하세요"
              value={form.jobs}
              onChange={(val) => setForm({ ...form, jobs: val })}
            />
          </div>

          {/* 근무지역 */}
          <div>
            <TagInput
              id="regions"
              label="근무지역"
              placeholder="근무지역을 입력하세요"
              value={form.regions}
              onChange={(val) => setForm({ ...form, regions: val })}
            />
          </div>
        </div>

        {/* 보유역량 */}
        <div ref={sectionRefs['보유역량']} id="section-ability" className="mb-16 w-[862px]">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">보유역량</h2>

          {/* 자격증 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label htmlFor="cert-name" className="font-medium text-gray-700 text-h4">
                자격증
              </label>
              <button
                onClick={addCertificate}
                className="px-2 py-1 ml-auto text-sm font-medium rounded-full transition-colors bg-subLightBlue text-mainBlue hover:bg-blue-100"
              >
                추가하기
              </button>
            </div>
            {form.certificates.map((cert, index) => (
              <div key={index} className="flex gap-4 items-center mb-2">
                <input
                  className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="자격증명을 검색해주세요."
                  value={cert.name}
                  onChange={handleCertificateChange(index, 'name')}
                />
                <input
                  className="h-[66px] w-1/4 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="합격여부"
                  value={cert.issuer}
                  onChange={handleCertificateChange(index, 'issuer')}
                />
                <input
                  className="h-[66px] w-1/4 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="YYYY-MM-DD"
                  value={cert.date}
                  onChange={(e) => {
                    const newCertificates = [...form.certificates];
                    newCertificates[index] = {
                      ...newCertificates[index],
                      date: formatDateInput(e.target.value),
                    };
                    setForm({ ...form, certificates: newCertificates });
                  }}
                />
                <button
                  onClick={() => removeCertificate(index)}
                  className="p-2 text-red-500 transition-colors hover:text-red-700"
                >
                  <FiX size={20} />
                </button>
              </div>
            ))}
            <div className="flex gap-4 mb-2">
              <input
                id="cert-name"
                className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="자격증명을 검색해주세요."
              />
              <input
                id="cert-issuer"
                className="h-[66px] w-1/4 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="합격여부"
              />
              <input
                id="cert-date"
                className="h-[66px] w-1/4 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  const formattedValue = formatDateInput(e.target.value);
                  e.target.value = formattedValue;
                }}
              />
            </div>
          </div>

          {/* 인턴 및 대외활동 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label htmlFor="activity-type" className="font-medium text-gray-700 text-h4">
                인턴 및 대외활동
              </label>
              <button
                onClick={addActivity}
                className="px-2 py-1 ml-auto text-sm font-medium rounded-full transition-colors bg-subLightBlue text-mainBlue hover:bg-blue-100"
              >
                추가하기
              </button>
            </div>
            {form.activities.filter(activity => activity.type !== 'club').map((activity, index) => (
              <div key={index} className="p-4 mb-4 rounded-lg border border-gray-200">
                <div className="flex gap-4 mb-2">
                  <div className="w-1/2">
                    <select
                      className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                      value={activity.type}
                      onChange={handleActivityChange(index, 'type')}
                    >
                      <option value="">활동구분을 선택하세요</option>
                      <option value="intern">인턴</option>
                      <option value="contest">대회</option>
                    </select>
                  </div>
                  <input
                    className="h-[66px] w-1/2 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="활동명/제목"
                    value={activity.title}
                    onChange={handleActivityChange(index, 'title')}
                  />
                </div>
                <div className="flex gap-4 mb-2">
                  <input
                    className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="YYYY-MM-DD"
                    value={activity.activity_date}
                    onChange={(e) => {
                      const newActivities = [...form.activities];
                      newActivities[index] = {
                        ...newActivities[index],
                        activity_date: formatDateInput(e.target.value),
                      };
                      setForm({ ...form, activities: newActivities });
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <textarea
                    className="min-h-[80px] flex-1 resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="활동 상세 내용을 입력하세요"
                    value={activity.detail}
                    onChange={handleActivityChange(index, 'detail')}
                  />
                  <button
                    onClick={() => removeActivity(index)}
                    className="self-start p-2 text-red-500 transition-colors hover:text-red-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mb-2">
              <div className="w-1/2">
                <select
                  id="activity-type"
                  className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                >
                  <option value="">활동구분을 선택하세요</option>
                  <option value="intern">인턴</option>
                  <option value="club">동아리</option>
                  <option value="contest">대회</option>
                </select>
              </div>
              <input
                id="activity-title"
                className="h-[66px] w-1/2 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="활동명/제목"
              />
            </div>
            <div className="flex gap-4 mb-2">
              <input
                id="activity-date"
                className="h-[66px] w-full rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="YYYY-MM-DD"
                onChange={(e) => {
                  const formattedValue = formatDateInput(e.target.value);
                  e.target.value = formattedValue;
                }}
              />
            </div>
            <textarea
              id="activity-detail"
              className="mb-2 min-h-[80px] w-full resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="활동 상세 내용을 입력하세요"
            />
          </div>

          {/* 대회 */}
          <div className="mb-8">
            <TagInput
              id="contests"
              label="대회 참여 및 수상"
              placeholder="대회명, 수상내역 등 입력"
              value={form.contests}
              onChange={(val) => setForm({ ...form, contests: val })}
            />
          </div>

          {/* 프로젝트 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label htmlFor="project-name" className="font-medium text-gray-700 text-h4">
                프로젝트
              </label>
              <button
                onClick={addProject}
                className="px-2 py-1 ml-auto text-sm font-medium rounded-full transition-colors bg-subLightBlue text-mainBlue hover:bg-blue-100"
              >
                추가하기
              </button>
            </div>
            {form.projects.map((project, index) => (
              <div key={index} className="p-4 mb-4 rounded-lg border border-gray-200">
                <div className="flex gap-4 mb-2">
                  <input
                    className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="프로젝트명"
                    value={project.name}
                    onChange={handleProjectChange(index, 'name')}
                  />
                  <input
                    className="h-[66px] w-1/3 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="시작일 (YYYY-MM-DD)"
                    value={project.start_date}
                    onChange={(e) => {
                      const newProjects = [...form.projects];
                      newProjects[index] = {
                        ...newProjects[index],
                        start_date: formatDateInput(e.target.value),
                      };
                      setForm({ ...form, projects: newProjects });
                    }}
                  />
                  <input
                    className="h-[66px] w-1/3 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="종료일 (YYYY-MM-DD)"
                    value={project.end_date}
                    onChange={(e) => {
                      const newProjects = [...form.projects];
                      newProjects[index] = {
                        ...newProjects[index],
                        end_date: formatDateInput(e.target.value),
                      };
                      setForm({ ...form, projects: newProjects });
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <textarea
                    className="min-h-[80px] flex-1 resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                    placeholder="프로젝트 설명을 입력하세요"
                    value={project.description}
                    onChange={handleProjectChange(index, 'description')}
                  />
                  <button
                    onClick={() => removeProject(index)}
                    className="self-start p-2 text-red-500 transition-colors hover:text-red-700"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mb-2">
              <input
                id="project-name"
                className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="프로젝트명"
              />
              <input
                id="project-start"
                className="h-[66px] w-1/3 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="시작일 (YYYY-MM-DD)"
                onChange={(e) => {
                  const formattedValue = formatDateInput(e.target.value);
                  e.target.value = formattedValue;
                }}
              />
              <input
                id="project-end"
                className="h-[66px] w-1/3 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="종료일 (YYYY-MM-DD)"
                onChange={(e) => {
                  const formattedValue = formatDateInput(e.target.value);
                  e.target.value = formattedValue;
                }}
              />
            </div>
            <textarea
              id="project-desc"
              className="mb-2 min-h-[80px] w-full resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="프로젝트 설명을 입력하세요"
            />
          </div>

          {/* 동아리 */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <label htmlFor="club-name" className="font-medium text-gray-700 text-h4">
                동아리
              </label>
              <button
                onClick={addClub}
                className="px-2 py-1 ml-auto text-sm font-medium rounded-full transition-colors bg-subLightBlue text-mainBlue hover:bg-blue-100"
              >
                추가하기
              </button>
            </div>
            {/* 기존 동아리 목록 */}
            {form.activities.filter(activity => activity.type === 'club').map((club, index) => {
              const clubIndex = form.activities.findIndex(a => a === club);
              return (
                <div key={clubIndex} className="p-4 mb-4 rounded-lg border border-gray-200">
                  <div className="flex gap-4 mb-2">
                    <input
                      className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                      placeholder="동아리명"
                      value={club.title}
                      onChange={(e) => {
                        const newActivities = [...form.activities];
                        newActivities[clubIndex] = {
                          ...newActivities[clubIndex],
                          title: e.target.value,
                        };
                        setForm({ ...form, activities: newActivities });
                      }}
                    />
                                         <input
                       className="h-[66px] w-1/2 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                       placeholder="시작일 (YYYY-MM-DD)"
                       value={club.activity_date}
                       onChange={(e) => {
                         const newActivities = [...form.activities];
                         newActivities[clubIndex] = {
                           ...newActivities[clubIndex],
                           activity_date: formatDateInput(e.target.value),
                         };
                         setForm({ ...form, activities: newActivities });
                       }}
                     />

                  </div>
                  <div className="flex gap-2">
                    <textarea
                      className="min-h-[80px] flex-1 resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                      placeholder="동아리 활동 내용을 입력하세요"
                      value={club.detail}
                      onChange={(e) => {
                        const newActivities = [...form.activities];
                        newActivities[clubIndex] = {
                          ...newActivities[clubIndex],
                          detail: e.target.value,
                        };
                        setForm({ ...form, activities: newActivities });
                      }}
                    />
                    <button
                      onClick={() => {
                        setForm({
                          ...form,
                          activities: form.activities.filter((_, i) => i !== clubIndex),
                        });
                      }}
                      className="self-start p-2 text-red-500 transition-colors hover:text-red-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="flex gap-4 mb-2">
              <input
                id="club-name"
                className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="동아리명"
              />
              <input
                id="club-start"
                className="h-[66px] w-1/2 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="시작일 (YYYY-MM-DD)"
                onChange={(e) => {
                  const formattedValue = formatDateInput(e.target.value);
                  e.target.value = formattedValue;
                }}
              />

            </div>
            <textarea
              id="club-desc"
              className="mb-2 min-h-[80px] w-full resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="동아리 활동 내용을 입력하세요"
            />
          </div>
        </div>

        {/* 스킬 */}
        <div ref={sectionRefs['스킬']} id="section-skill" className="mb-16 w-[862px]">
          <h2 className="mb-10 font-semibold text-gray-800 text-h2">스킬</h2>
          <label htmlFor="skill-search" className="sr-only">
            스킬 검색
          </label>
          <div className="relative mb-6">
            <input
              id="skill-search"
              className="h-[56px] w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
              placeholder="찾으시는 스킬을 검색해보세요."
              disabled
            />
            <FiSearch className="absolute left-4 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="px-4 py-2 font-semibold text-gray-700 rounded-full border border-mainBlue text-h4">
              UI·UX 디자이너
            </span>
            <span className="text-xs text-gray-400 cursor-pointer">전체보기</span>
          </div>
          <div className="mb-2 text-gray-500 text-bodyLg">
            선택하신 직무에 맞는 스킬을 추천해드려요!
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {recommendedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                className={
                  form.skills.includes(skill)
                    ? 'flex items-center gap-1 rounded-xl border border-mainBlue bg-subLightBlue px-4 py-2 text-h4 font-medium text-mainBlue shadow-none'
                    : 'flex items-center gap-1 rounded-xl border border-gray-100 px-4 py-2 text-h4 font-medium text-gray-600 shadow-none'
                }
                style={{ minWidth: 'fit-content' }}
                onClick={() => handleSkillToggle(skill)}
              >
                {form.skills.includes(skill) ? (
                  <span className="mr-1 text-lg">✓</span>
                ) : (
                  <span className="mr-1 text-lg">+</span>
                )}
                {skill}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-xl border border-gray-200">
            <div className="flex gap-2 items-center mb-2 font-semibold text-gray-700 text-h4">
              나의 스킬 <span className="text-sm">({form.skills.length}/20)</span>
            </div>
            <div className="mb-2 text-gray-500 text-bodyLg">
              {form.name} 님이 선택하신 스킬을 기반으로 추천해드려요!
            </div>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex gap-1 items-center px-4 py-2 font-medium rounded-xl border shadow-none border-mainBlue bg-subLightBlue text-h4 text-mainBlue"
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
        <div className="fixed right-32 top-60 z-30 w-[240px]">
          <ResumeSidebar
            currentSection={currentSection}
            onSectionClick={handleSectionClick}
            onSave={handleSave}
            isAgreed={form.agree}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
