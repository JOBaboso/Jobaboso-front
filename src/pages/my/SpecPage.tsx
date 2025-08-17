import { useState, useEffect } from 'react';
import { getPersonalSpec, PersonalSpecResponse } from '@apis/auth';
import ProfileCard from '@components/my/ProfileCard';
import EducationSection from '@components/my/EducationSection';
import HopeSection from '@components/my/HopeSection';
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
      <div className="w-[1096px]">
        <p className="mt-6 font-normal text-h4">채용기업이 열람하는 나의 이력서입니다.</p>

        <div className="grid grid-cols-[295px_720px] gap-8">
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
        <div className="mt-10 w-[1048px] rounded-xl border border-gray-200 p-8">
          {/* 보유역량 타이틀 */}
          <div className="flex items-center mb-6">
            <img
              src="/ic_skill_1.svg"
              alt="보유역량 1"
              className="z-10 mr-2 w-[35px] object-contain"
            />
            <p className="font-medium text-gray-800 text-h1">보유역량</p>
          </div>

          <div className="my-2 ml-10">
            {/* 자격증 */}
            <div>
              <p className="mb-4 font-medium text-gray-800 text-h3">자격증</p>
              {specData.certificates.length > 0 ? (
                specData.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                      index === 0 
                        ? 'border-x-0 border-y-[1.5px] border-gray-300' 
                        : 'border-x-0 border-t-0 border-b-[1.5px] border-gray-300'
                    }`}
                  >
                    <div className="text-gray-700 text-bodyLg">
                      {cert.certificate_date || cert.date || ''}
                    </div>
                    <div className="text-gray-700 text-bodyLg">
                      {cert.cert_name || cert.name || ''}
                    </div>
                    <div className="text-gray-700 text-bodyLg">
                      {cert.score || cert.issuer || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-gray-700 text-bodyLg">자격증 정보가 없습니다</div>
                  <div className="text-gray-700 text-bodyLg"></div>
                  <div className="text-gray-700 text-bodyLg"></div>
                </div>
              )}
            </div>

            {/* 인턴 및 대외활동 */}
            <div>
              <p className="mt-10 mb-4 font-medium text-gray-800 text-h3">인턴 및 대외활동</p>
              {specData.activities.length > 0 ? (
                specData.activities.map((activity, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                      index === 0 
                        ? 'border-x-0 border-y-[1.5px] border-gray-300' 
                        : 'border-x-0 border-t-0 border-b-[1.5px] border-gray-300'
                    }`}
                  >
                    <div className="text-gray-700 text-bodyLg">
                      {activity.activity_date || ''}
                    </div>
                    <div className="text-gray-700 text-bodyLg">{activity.title || ''}</div>
                    <div className="text-gray-700 text-bodyLg">
                      {activity.type === 'intern' ? '인턴' : 
                       activity.type === 'club' ? '동아리' : 
                       activity.type === 'contest' ? '대회' : 
                       activity.type || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-gray-700 text-bodyLg">인턴/대외활동 정보가 없습니다</div>
                  <div className="text-gray-700 text-bodyLg"></div>
                  <div className="text-gray-700 text-bodyLg"></div>
                </div>
              )}
            </div>

            {/* 프로젝트 */}
            <div>
              <p className="mt-10 mb-4 font-medium text-gray-800 text-h3">프로젝트</p>
              {specData.projects && specData.projects.length > 0 ? (
                specData.projects.map((project, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                      index === 0 
                        ? 'border-x-0 border-y-[1.5px] border-gray-300' 
                        : 'border-x-0 border-t-0 border-b-[1.5px] border-gray-300'
                    }`}
                  >
                    <div className="text-gray-700 text-bodyLg">
                      {project.start_date && project.end_date
                        ? `${project.start_date} ~ ${project.end_date}`
                        : project.period || ''}
                    </div>
                    <div className="text-gray-700 text-bodyLg">
                      {project.project_name || project.name || ''}
                    </div>
                    <div className="text-gray-700 text-bodyLg">
                      {project.description || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-gray-700 text-bodyLg">프로젝트 정보가 없습니다</div>
                  <div className="text-gray-700 text-bodyLg"></div>
                  <div className="text-gray-700 text-bodyLg"></div>
                  <div className="text-gray-700 text-bodyLg"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 보유역량 2/2 */}
        <div className="mt-10 w-[1048px] rounded-xl border border-gray-200 p-8">
          <div className="flex items-center self-start mt-3">
            <img
              src="/ic_skill_2.svg"
              alt="보유역량 2"
              className="z-10 mr-2 w-[35px] object-contain"
            />
            <p className="font-medium text-gray-800 text-h1">보유역량</p>
          </div>
          <div className="my-10">
            {specData.skills.length > 0 ? (
              specData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block gap-1 items-center px-4 py-2 mr-4 font-medium rounded-xl border shadow-none border-mainBlue bg-subLightBlue text-h4 text-mainBlue"
                >
                  {typeof skill === 'string' ? skill : skill.skill_name || '알 수 없는 스킬'}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-bodyLg">보유 스킬이 없습니다</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecPage;
