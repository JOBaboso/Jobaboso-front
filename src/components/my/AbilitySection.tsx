import React from 'react';
import { FiX } from 'react-icons/fi';
import TagInput from '@components/common/TagInput';

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

interface AbilitySectionProps {
  certificates: CertificateType[];
  activities: ActivityType[];
  contests: string[];
  projects: ProjectType[];
  onCertificatesChange: (certificates: CertificateType[]) => void;
  onActivitiesChange: (activities: ActivityType[]) => void;
  onContestsChange: (contests: string[]) => void;
  onProjectsChange: (projects: ProjectType[]) => void;
  formatDateInput: (value: string) => string;
}

const AbilitySection: React.FC<AbilitySectionProps> = ({
  certificates,
  activities,
  contests,
  projects,
  onCertificatesChange,
  onActivitiesChange,
  onContestsChange,
  onProjectsChange,
  formatDateInput,
}) => {
  const addCertificate = () => {
    onCertificatesChange([...certificates, { name: '', issuer: '', date: '' }]);
  };

  const removeCertificate = (index: number) => {
    onCertificatesChange(certificates.filter((_, i) => i !== index));
  };

  const handleCertificateChange = (index: number, field: keyof CertificateType) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCertificates = [...certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: e.target.value,
    };
    onCertificatesChange(newCertificates);
  };

  const addActivity = () => {
    onActivitiesChange([...activities, { type: '', title: '', detail: '', activity_date: '' }]);
  };

  const removeActivity = (index: number) => {
    onActivitiesChange(activities.filter((_, i) => i !== index));
  };

  const handleActivityChange = (index: number, field: keyof ActivityType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const newActivities = [...activities];
    newActivities[index] = {
      ...newActivities[index],
      [field]: e.target.value,
    };
    onActivitiesChange(newActivities);
  };

  const addProject = () => {
    onProjectsChange([...projects, { name: '', description: '', start_date: '', end_date: '' }]);
  };

  const removeProject = (index: number) => {
    onProjectsChange(projects.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index: number, field: keyof ProjectType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newProjects = [...projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: e.target.value,
    };
    onProjectsChange(newProjects);
  };

  const addClub = () => {
    onActivitiesChange([...activities, { type: 'club', title: '', detail: '', activity_date: '' }]);
  };

  return (
    <div className="mb-16 w-[862px]">
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
        {certificates.map((cert, index) => (
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
                const newCertificates = [...certificates];
                newCertificates[index] = {
                  ...newCertificates[index],
                  date: formatDateInput(e.target.value),
                };
                onCertificatesChange(newCertificates);
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
        {activities.filter(activity => activity.type !== 'club').map((activity, index) => (
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
                  const newActivities = [...activities];
                  newActivities[index] = {
                    ...newActivities[index],
                    activity_date: formatDateInput(e.target.value),
                  };
                  onActivitiesChange(newActivities);
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
          value={contests}
          onChange={(val) => onContestsChange(val)}
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
        {projects.map((project, index) => (
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
                  const newProjects = [...projects];
                  newProjects[index] = {
                    ...newProjects[index],
                    start_date: formatDateInput(e.target.value),
                  };
                  onProjectsChange(newProjects);
                }}
              />
              <input
                className="h-[66px] w-1/3 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                placeholder="종료일 (YYYY-MM-DD)"
                value={project.end_date}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index] = {
                    ...newProjects[index],
                    end_date: formatDateInput(e.target.value),
                  };
                  onProjectsChange(newProjects);
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
        {activities.filter(activity => activity.type === 'club').map((club, index) => {
          const clubIndex = activities.findIndex(a => a === club);
          return (
            <div key={clubIndex} className="p-4 mb-4 rounded-lg border border-gray-200">
              <div className="flex gap-4 mb-2">
                <input
                  className="h-[66px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="동아리명"
                  value={club.title}
                  onChange={(e) => {
                    const newActivities = [...activities];
                    newActivities[clubIndex] = {
                      ...newActivities[clubIndex],
                      title: e.target.value,
                    };
                    onActivitiesChange(newActivities);
                  }}
                />
                <input
                  className="h-[66px] w-1/2 rounded-lg border border-gray-200 bg-white px-4 py-[20px] text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="시작일 (YYYY-MM-DD)"
                  value={club.activity_date}
                  onChange={(e) => {
                    const newActivities = [...activities];
                    newActivities[clubIndex] = {
                      ...newActivities[clubIndex],
                      activity_date: formatDateInput(e.target.value),
                    };
                    onActivitiesChange(newActivities);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <textarea
                  className="min-h-[80px] flex-1 resize-none rounded-xl border border-gray-200 bg-white px-6 py-4 text-h4 text-gray-600 placeholder-gray-400 focus:border-mainBlue focus:outline-none focus:ring-1 focus:ring-mainBlue"
                  placeholder="동아리 활동 내용을 입력하세요"
                  value={club.detail}
                  onChange={(e) => {
                    const newActivities = [...activities];
                    newActivities[clubIndex] = {
                      ...newActivities[clubIndex],
                      detail: e.target.value,
                    };
                    onActivitiesChange(newActivities);
                  }}
                />
                <button
                  onClick={() => {
                    onActivitiesChange(activities.filter((_, i) => i !== clubIndex));
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
  );
};

export default AbilitySection; 