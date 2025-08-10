import { useState, useEffect } from 'react';
import { getPersonalSpec, PersonalSpecResponse } from '@apis/auth';
import ProfileCard from '@components/my/ProfileCard';
import EducationSection from '@components/my/EducationSection';
import HopeSection from '@components/my/HopeSection';
import SkillsSection from '@components/my/SkillsSection';
import { formatDateToKorean, calculateAge, formatBirthDate } from '@utils/dateUtils';
import { formatPhoneNumber } from '@utils/phoneUtils';

const SpecPage = () => {
  const [specData, setSpecData] = useState<PersonalSpecResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecData = async () => {
      try {
        setLoading(true);
        const data = await getPersonalSpec();
        setSpecData(data);
      } catch (err) {
        console.error('스펙 데이터 조회 실패:', err);
        setError('스펙 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!specData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-gray-600">데이터가 없습니다.</div>
      </div>
    );
  }

  // 데이터 가공
  const companies = specData.hope.company ? specData.hope.company.split(', ') : [];
  const jobs = specData.hope.job ? specData.hope.job.split(', ') : [];
  const regions = specData.hope.region ? specData.hope.region.split(', ') : [];

  return (
    <div className="flex justify-center w-full">
      <div className="mx-auto ml-52 w-[1096px]">
        <p className="text-[40px] font-semibold leading-[60px] text-gray-800">나의 이력서</p>
        <p className="mt-6 font-normal text-h4">채용기업이 열람하는 나의 이력서입니다.</p>

        <div className="grid grid-cols-[300px_850px] gap-10">
          {/* 프로필 */}
          <ProfileCard
            name={specData.personal_info.name}
            gender={specData.personal_info.gender}
            birthDate={formatBirthDate(specData.personal_info.birth_date)}
            age={calculateAge(specData.personal_info.birth_date)}
            phone={formatPhoneNumber(specData.personal_info.phone)}
            email={specData.personal_info.email}
          />

          {/* 학력 */}
          <EducationSection
            schoolName={specData.education.school_name}
            major={specData.education.major}
            admissionYear={formatDateToKorean(specData.education.admission_year)}
            status={specData.education.status}
            score={specData.education.score.toString()}
            graduationYear={formatDateToKorean(specData.education.graduation_year)}
          />
        </div>

        {/* 희망근무조건 */}
        <HopeSection
          companies={companies}
          jobs={jobs}
          regions={regions}
        />

        {/* 보유역량 1/2 */}
        <SkillsSection
          certificates={specData.certificates}
          activities={specData.activities}
          projects={specData.projects || []}
          skills={[]}
          isFirstSection={true}
        />

        {/* 보유역량 2/2 */}
        <SkillsSection
          certificates={[]}
          activities={[]}
          projects={[]}
          skills={specData.skills}
          isFirstSection={false}
        />
      </div>
    </div>
  );
};

export default SpecPage;
