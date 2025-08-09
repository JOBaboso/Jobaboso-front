import { InputField } from '@components/common/InputField';
import { useState, useEffect } from 'react';
import TagInput from '@components/common/TagInput';
import { getPersonalSpec, PersonalSpecResponse } from '@apis/auth';

const StatusPage = () => {
  const [sentence, setSentence] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [specData, setSpecData] = useState<PersonalSpecResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // YYYY-MM-DD 형식을 "YYYY년 MM월" 형식으로 변환하는 함수
  const formatDateToKorean = (dateString: string): string => {
    if (!dateString) return '';

    // YYYY-MM-DD 형식인 경우
    const match = dateString.match(/^(\d{4})-(\d{2})-\d{2}$/);
    if (match) {
      const year = match[1];
      const month = parseInt(match[2], 10).toString(); // 앞의 0 제거
      return `${year}년 ${month}월`;
    }

    // 이미 "YYYY년 MM월" 형식인 경우 그대로 반환
    if (dateString.includes('년') && dateString.includes('월')) {
      return dateString;
    }

    return dateString;
  };

  // 전화번호 자동 하이픈 추가 함수
  const formatPhoneNumber = (value: string): string => {
    if (!value) return '';

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

  // 생년월일로부터 나이 계산하는 함수
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // 생일이 지나지 않았으면 나이에서 1을 빼줌
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  // 생년월일을 한국어 형식으로 변환하는 함수
  const formatBirthDate = (birthDate: string): string => {
    if (!birthDate) return '';

    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

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
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!specData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-gray-600">데이터가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      {/* 왼쪽: 기존 이력서 편집 내용 */}
      <div className="mx-auto ml-52 w-[1096px]">
        <p className="text-[40px] font-semibold leading-[60px] text-gray-800">나의 이력서</p>
        <p className="mt-6 text-h4 font-normal">채용기업이 열람하는 나의 이력서입니다.</p>

        <div className="grid grid-cols-[300px_850px] gap-10">
          {/* 프로필 */}
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-gray-200 p-8">
            <div className="mb-2 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
              <svg
                className="block h-20 w-20 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            </div>
            <div className="mt-4 text-h2 text-gray-800">{specData.personal_info.name}</div>
            <div className="mt-3 text-bodyLg text-gray-700">
              {specData.personal_info.gender === 'M' ? '남성' : '여성'} |{' '}
              {formatBirthDate(specData.personal_info.birth_date)} (만{' '}
              {calculateAge(specData.personal_info.birth_date)}세)
            </div>

            <div className="mt-3 flex items-center self-start">
              <img
                src="/ic_phone.svg"
                alt="전화번호"
                className="z-10 mr-2 w-[20px] object-contain"
              />
              <p className="text-bodyLg text-gray-700">
                {formatPhoneNumber(specData.personal_info.phone)}
              </p>
            </div>

            <div className="mt-3 flex items-center self-start">
              <img src="/ic_mail.svg" alt="이메일" className="z-10 mr-2 w-[20px] object-contain" />
              <p className="text-bodyLg text-gray-700">{specData.personal_info.email}</p>
            </div>
          </div>

          {/* 학력 */}
          <div className="mt-10 rounded-xl border border-gray-200 p-8">
            <div className="mt-3 flex items-center self-start">
              <img
                src="/ic_education.svg"
                alt="학력"
                className="z-10 mr-2 w-[35px] object-contain"
              />
              <p className="text-h1 font-medium text-gray-800">학력</p>
            </div>
            <div className="mx-10 my-2 grid grid-cols-2 gap-6">
              {/* 열 1 */}
              <div>
                {/* 학교명 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    학교명
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">
                    {specData.education.school_name}
                  </div>
                </div>
                {/* 주전공 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    주전공
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">{specData.education.major}</div>
                </div>
                {/* 입학년도 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    입학년도
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">
                    {formatDateToKorean(specData.education.admission_year)}
                  </div>
                </div>
              </div>
              {/* 열 2 */}
              <div>
                {/* 상태 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    상태
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">{specData.education.status}</div>
                </div>
                {/* 학점 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    학점
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">{specData.education.score}</div>
                </div>
                {/* 졸업년도 */}
                <div className="mt-8 flex items-center self-start">
                  <div className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1">
                    졸업년도
                  </div>
                  <div className="ml-3 text-bodyLg text-gray-800">
                    {formatDateToKorean(specData.education.graduation_year)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 희망근무조건 */}
        <div className="mt-10 w-[1190px] rounded-xl border border-gray-200 p-8">
          <div className="mt-3 flex items-center self-start">
            <img
              src="/ic_hope.svg"
              alt="희망 근무 조건"
              className="z-10 mr-2 w-[35px] object-contain"
            />
            <p className="text-h1 font-medium text-gray-800">희망 근무 조건</p>
          </div>
          <div className="mx-10 my-2">
            {/* 희망기업 */}
            <div>
              <p className="mt-8 inline-block text-h3 text-gray-800">희망기업</p>
              <div className="mt-2">
                {specData.hope.company ? (
                  specData.hope.company.split(', ').map((company, index) => (
                    <div
                      key={index}
                      className="mr-4 inline-block rounded-md border border-gray-100 bg-gray-100 px-3 py-1"
                    >
                      {company.trim()}
                    </div>
                  ))
                ) : (
                  <div className="text-bodyLg text-gray-500">희망기업 정보가 없습니다</div>
                )}
              </div>
            </div>
            {/* 희망직군 */}
            <div>
              <p className="mt-8 inline-block text-h3 text-gray-800">희망직군</p>
              <div className="mt-2">
                {specData.hope.job ? (
                  specData.hope.job.split(', ').map((job, index) => (
                    <div
                      key={index}
                      className="mr-4 inline-block rounded-md border border-gray-100 bg-gray-100 px-3 py-1"
                    >
                      {job.trim()}
                    </div>
                  ))
                ) : (
                  <div className="text-bodyLg text-gray-500">희망직군 정보가 없습니다</div>
                )}
              </div>
            </div>
            {/* 근무지역 */}
            <div>
              <p className="mt-8 inline-block text-h3 text-gray-800">근무지역</p>
              <div className="mt-2">
                {specData.hope.region ? (
                  specData.hope.region.split(', ').map((region, index) => (
                    <div
                      key={index}
                      className="mr-4 inline-block rounded-md border border-gray-100 bg-gray-100 px-3 py-1"
                    >
                      {region.trim()}
                    </div>
                  ))
                ) : (
                  <div className="text-bodyLg text-gray-500">근무지역 정보가 없습니다</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 보유역량 1/2 */}
        <div className="mt-10 w-[1190px] rounded-xl border border-gray-200 p-8">
          {/* 보유역량 타이틀 */}
          <div className="mb-6 flex items-center">
            <img
              src="/ic_skill_1.svg"
              alt="보유역량 1"
              className="z-10 mr-2 w-[35px] object-contain"
            />
            <p className="text-h1 font-medium text-gray-800">보유역량</p>
          </div>

          <div className="mx-10 my-2">
            {/* 자격증 */}
            <div>
              <p className="mb-4 text-h3 font-medium text-gray-800">자격증</p>
              {specData.certificates.length > 0 ? (
                specData.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4"
                  >
                    <div className="text-bodyLg text-gray-700">
                      {cert.certificate_date || cert.date || ''}
                    </div>
                    <div className="text-bodyLg text-gray-700">
                      {cert.cert_name || cert.name || ''}
                    </div>
                    <div className="text-bodyLg text-gray-700">
                      {cert.score || cert.issuer || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-bodyLg text-gray-700">자격증 정보가 없습니다</div>
                  <div className="text-bodyLg text-gray-700"></div>
                  <div className="text-bodyLg text-gray-700"></div>
                </div>
              )}
            </div>

            {/* 인턴 및 대외활동 */}
            <div>
              <p className="mb-4 mt-10 text-h3 font-medium text-gray-800">인턴 및 대외활동</p>
              {specData.activities.length > 0 ? (
                specData.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4"
                  >
                    <div className="text-bodyLg text-gray-700">
                      {activity.activity_date || ''}
                    </div>
                    <div className="text-bodyLg text-gray-700">{activity.title || ''}</div>
                    <div className="text-bodyLg text-gray-700">
                      {activity.type === 'intern' ? '인턴' : 
                       activity.type === 'club' ? '동아리' : 
                       activity.type === 'contest' ? '대회' : 
                       activity.type || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-bodyLg text-gray-700">인턴/대외활동 정보가 없습니다</div>
                  <div className="text-bodyLg text-gray-700"></div>
                  <div className="text-bodyLg text-gray-700"></div>
                </div>
              )}
            </div>

            {/* 프로젝트 */}
            <div>
              <p className="mb-4 mt-10 text-h3 font-medium text-gray-800">프로젝트</p>
              {specData.projects && specData.projects.length > 0 ? (
                specData.projects.map((project, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4"
                  >
                    <div className="text-bodyLg text-gray-700">
                      {project.start_date && project.end_date
                        ? `${project.start_date} ~ ${project.end_date}`
                        : project.period || ''}
                    </div>
                    <div className="text-bodyLg text-gray-700">
                      {project.project_name || project.name || ''}
                    </div>
                    <div className="text-bodyLg text-gray-700">
                      {project.description || ''}
                    </div>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                  <div className="text-bodyLg text-gray-700">프로젝트 정보가 없습니다</div>
                  <div className="text-bodyLg text-gray-700"></div>
                  <div className="text-bodyLg text-gray-700"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 보유역량 2/2 */}
        <div className="mt-10 w-[1190px] rounded-xl border border-gray-200 p-8">
          <div className="mt-3 flex items-center self-start">
            <img
              src="/ic_skill_2.svg"
              alt="보유역량 2"
              className="z-10 mr-2 w-[35px] object-contain"
            />
            <p className="text-h1 font-medium text-gray-800">보유역량</p>
          </div>
          <div className="mx-10 my-10">
            {specData.skills.length > 0 ? (
              specData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="mr-4 inline-block items-center gap-1 rounded-xl border border-mainBlue bg-subLightBlue px-4 py-2 text-h4 font-medium text-mainBlue shadow-none"
                >
                  {typeof skill === 'string' ? skill : skill.skill_name || '알 수 없는 스킬'}
                </span>
              ))
            ) : (
              <span className="text-bodyLg text-gray-500">보유 스킬이 없습니다</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
