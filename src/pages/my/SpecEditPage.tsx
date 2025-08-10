import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeSidebar from '@components/employment/ResumeSidebar';
import WelcomeBanner from '@components/my/WelcomeBanner';
import PersonalInfoForm from '@components/my/PersonalInfoForm';
import EducationForm from '@components/my/EducationForm';
import HopeForm from '@components/my/HopeForm';
import SkillsSection from '@components/my/SkillsSection';
import { formatDateInput, formatYearMonthInput, parseDate } from '@utils/dateUtils';
import { formatPhoneNumber } from '@utils/phoneUtils';
import api from '@apis/api';

interface ProjectType {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
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

const SpecEditPage = () => {
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
  const [currentSection, setCurrentSection] = useState('인적사항');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs.current).forEach(([label, ref]) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(label);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) return;

        const response = await api.get('/spec/all');
        const data = response.data;

        if (data) {
          setForm(prev => ({
            ...prev,
            name: data.personal_info?.name || '',
            phone: data.personal_info?.phone || '',
            gender: data.personal_info?.gender === 'M' ? '남성' : '여성',
            birth: data.personal_info?.birth_date || '',
            email: data.personal_info?.email || '',
            university: data.education?.school_name || '',
            major: data.education?.major || '',
            gpa: data.education?.score?.toString() || '',
            startDate: data.education?.admission_year || '2021-03',
            endDate: data.education?.graduation_year || '2026-02',
            status: data.education?.status || '재학중',
            companies: data.hope?.company ? data.hope.company.split(', ') : [],
            jobs: data.hope?.job ? data.hope.job.split(', ') : [],
            regions: data.hope?.region ? data.hope.region.split(', ') : [],
            projects: data.projects?.map((p: any) => ({
              name: p.project_name || p.name || '',
              description: p.description || '',
              start_date: p.start_date || '',
              end_date: p.end_date || '',
            })) || [],
            activities: data.activities || [],
            certificates: data.certificates?.map((c: any) => ({
              name: c.cert_name || c.name || '',
              issuer: c.score || c.issuer || '',
              date: c.certificate_date || c.date || '',
            })) || [],
            skills: data.skills?.map((s: any) => 
              typeof s === 'string' ? s : s.skill_name || ''
            ).filter(Boolean) || [],
          }));
        }
      } catch (error) {
        console.error('이력서 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDateChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field.includes('Date') ? formatYearMonthInput(e.target.value) : formatDateInput(e.target.value);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
  };

  const handleSectionClick = (label: string) => {
    const ref = sectionRefs.current[label];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      await api.post('/spec/all', body);
      alert('스펙이 성공적으로 저장되었습니다.');
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
      <div className="mx-auto ml-52 w-[1096px]">
        <WelcomeBanner name={form.name} />

        <div ref={(el) => sectionRefs.current['인적사항'] = el} id="section-personal">
          <PersonalInfoForm
            form={form}
            onChange={handleChange}
            onPhoneChange={handlePhoneChange}
          />
        </div>

        <div ref={(el) => sectionRefs.current['학력'] = el} id="section-education">
          <EducationForm
            form={form}
            onChange={handleChange}
            onDateChange={handleDateChange}
          />
        </div>

        <div ref={(el) => sectionRefs.current['희망근무조건'] = el} id="section-hope">
          <HopeForm
            companies={form.companies}
            jobs={form.jobs}
            regions={form.regions}
            onCompaniesChange={(companies) => setForm(prev => ({ ...prev, companies }))}
            onJobsChange={(jobs) => setForm(prev => ({ ...prev, jobs }))}
            onRegionsChange={(regions) => setForm(prev => ({ ...prev, regions }))}
          />
        </div>

        <div ref={(el) => sectionRefs.current['스킬'] = el} id="section-skill">
          <SkillsSection
            skills={form.skills}
            userName={form.name}
            onSkillRemove={(skillToRemove) => 
              setForm(prev => ({ 
                ...prev, 
                skills: prev.skills.filter(skill => skill !== skillToRemove) 
              }))
            }
          />
        </div>
      </div>

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

export default SpecEditPage;
