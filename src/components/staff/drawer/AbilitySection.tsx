import React from 'react';

interface AbilitySectionProps {
  certificates: Array<{
    certificate_date?: string;
    date?: string;
    cert_name?: string;
    name?: string;
    score?: string;
    issuer?: string;
  }>;
  activities: Array<{
    activity_date?: string;
    title?: string;
    type?: string;
  }>;
  projects: Array<{
    start_date?: string;
    end_date?: string;
    period?: string;
    project_name?: string;
    name?: string;
    description?: string;
  }>;
  skills: string[];
}

const AbilitySection: React.FC<AbilitySectionProps> = ({
  certificates,
  activities,
  projects,
  skills,
}) => {
  return (
    <div className="space-y-6">
      {/* 보유역량 1/2 */}
      <div className="rounded-xl border border-gray-300 p-6 bg-white">
        <div className="flex items-center mb-4">
          <img
            src="/ic_skill_1.svg"
            alt="보유역량 1"
            className="w-8 h-8 mr-3"
          />
          <h3 className="text-h2 font-semibold text-gray-800">보유역량</h3>
        </div>

        <div >
          {/* 자격증 */}
          <div>
            <p className="mb-4 text-bodyLg font-medium text-gray-800">자격증</p>
            {certificates.length > 0 ? (
              certificates.map((cert, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                    index === 0
                      ? 'border-x-0 border-y-[1.5px] border-gray-300'
                      : 'border-x-0 border-b-[1.5px] border-t-0 border-gray-300'
                  }`}
                >
                                     <div className="text-bodyLg text-gray-700">
                     {(cert.certificate_date || cert.date || '').replace(/\d{4}/g, (match) => match.slice(-2))}
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
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
              </div>
            )}
          </div>

          {/* 인턴 및 대외활동 */}
          <div>
            <p className="mb-4 mt-4 text-bodyLg font-medium text-gray-800">인턴 및 대외활동</p>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                    index === 0
                      ? 'border-x-0 border-y-[1.5px] border-gray-300'
                      : 'border-x-0 border-b-[1.5px] border-t-0 border-gray-300'
                  }`}
                >
                                     <div className="text-bodyLg text-gray-700">
                     {activity.activity_date ? activity.activity_date.replace(/\d{4}/g, (match) => match.slice(-2)) : ''}
                   </div>
                  <div className="text-bodyLg text-gray-700">{activity.title || ''}</div>
                  <div className="text-bodyLg text-gray-700">
                    {activity.type === 'intern'
                      ? '인턴'
                      : activity.type === 'club'
                        ? '동아리'
                        : activity.type === 'contest'
                          ? '대회'
                          : activity.type || ''}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
              </div>
            )}
          </div>

          {/* 프로젝트 */}
          <div>
            <p className="mb-4 mt-4 text-bodyLg font-medium text-gray-800">프로젝트</p>
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-4 bg-gray-50 px-6 py-4 ${
                    index === 0
                      ? 'border-x-0 border-y-[1.5px] border-gray-300'
                      : 'border-x-0 border-b-[1.5px] border-t-0 border-gray-300'
                  }`}
                >
                                     <div className="text-bodyLg text-gray-700">
                     {project.start_date && project.end_date
                       ? `${project.start_date.replace(/\d{4}/, (match) => match.slice(-2))} ~ ${project.end_date.replace(/\d{4}/, (match) => match.slice(-2))}`
                       : project.period ? project.period.replace(/\d{4}/g, (match) => match.slice(-2)) : ''}
                   </div>
                  <div className="text-bodyLg text-gray-700">
                    {project.project_name || project.name || ''}
                  </div>
                  <div className="text-bodyLg text-gray-700">{project.description || ''}</div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-3 gap-4 border-x-0 border-y-[1.5px] border-gray-300 bg-gray-50 px-6 py-4">
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
                <div className="text-bodyLg text-gray-700">-</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 보유역량 2/2 */}
      <div className="rounded-xl border border-gray-300 p-6 bg-white">
        <div className="flex items-center mb-4">
          <img
            src="/ic_skill_2.svg"
            alt="보유역량 2"
            className="w-8 h-8 mr-3"
          />
          <h3 className="text-h2 font-semibold text-gray-800">보유역량</h3>
        </div>
        <div className="my-4">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="mr-4 inline-block items-center gap-1 rounded-xl border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 shadow-none"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-bodyLg text-gray-500">보유 스킬이 없습니다</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbilitySection;
