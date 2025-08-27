import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentSpec } from '../../mocks/staffStudentsData';
import { fetchStudentDetail, StudentDetailResponse } from '../../apis/staff';
import EducationSection from './drawer/EducationSection';
import AbilitySection from './drawer/AbilitySection';
import PreferenceSection from './drawer/PreferenceSection';
import { ApplicationTable, ApplicationRow } from './drawer/ApplicationTable';
import LoadingSpinner from './LoadingSpinner';

interface StudentDetailDrawerProps {
  isOpen: boolean;
  student: StudentSpec | null;
  onClose: () => void;
}

const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({ isOpen, student, onClose }) => {
  const [studentDetail, setStudentDetail] = useState<StudentDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 학생 상세 정보 API 호출
  useEffect(() => {
    const loadStudentDetail = async () => {
      if (!student || !isOpen) {
        setStudentDetail(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchStudentDetail(student.id);
        setStudentDetail(response);
      } catch (err) {
        console.error('학생 상세 정보 로딩 실패:', err);
        setError(`아직 학생이 스펙 및 지원 정보를 등록하지 않았습니다.`);
        setStudentDetail(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentDetail();
  }, [student, isOpen]);

  if (!student) return null;

  return (
    <>
      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="student-drawer"
            initial={{ x: 600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 600, opacity: 0 }}
            transition={{
              type: 'tween',
              ease: [0.25, 0.46, 0.45, 0.94],
              duration: 0.3,
            }}
            className="fixed right-0 top-[104px] z-30 h-[calc(100vh-104px)] w-[700px] overflow-y-auto border-l border-gray-200 bg-gray-50 shadow-md"
          >
            {/* Header */}
            <div className="flex sticky top-0 justify-between items-center p-6 bg-gray-100 border-b border-gray-200">
              <h3 className="ml-2 font-semibold text-gray-900 text-h2">
                학생 스펙 및 지원 현황 정보
              </h3>
              <button
                onClick={onClose}
                className="z-40 p-2 rounded-full transition-colors hover:bg-gray-200"
                title="닫기"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner message="학생 상세 정보를 불러오는 중..." />
                </div>
              ) : error ? (
                <div className="py-8 text-center text-red-600">{error}</div>
              ) : studentDetail ? (
                <>
                  {/* 지원 현황을 먼저 표시 */}
                  {(() => {
                    const hasApplications =
                      studentDetail.student.applications &&
                      studentDetail.student.applications.length > 0;

                    return hasApplications ? (
                      <ApplicationTable
                        rows={studentDetail.student.applications.map((app, index) => ({
                          id: index + 1,
                          company: app.company_name || '',
                          position: app.position || '',
                          date: app.application_date
                            ? new Date(app.application_date).toLocaleDateString('ko-KR')
                            : '',
                          status: app.status || '',
                          originalStatus: app.status || '',
                          companyLogo: '/company_porfile/default.svg',
                        }))}
                        onRowClick={(id) => console.log('지원 현황 클릭:', id)}
                      />
                    ) : null;
                  })()}

                  {/* 학력 정보 */}
                  <EducationSection
                    gender={
                      studentDetail.student.gender === 'M'
                        ? '남성'
                        : studentDetail.student.gender === 'W'
                          ? '여성'
                          : ''
                    }
                    status={studentDetail.student.status || ''}
                    score={
                      studentDetail.student.score
                        ? `${studentDetail.student.score.toFixed(1)}/4.5`
                        : ''
                    }
                    graduationYear={studentDetail.student.graduation_year || ''}
                  />

                  {/* 희망 정보 */}
                  <PreferenceSection
                    targetCompany={studentDetail.student.target_company || ''}
                    targetJob={studentDetail.student.target_job || ''}
                    targetRegion={studentDetail.student.target_region || ''}
                  />

                  {/* 스펙 정보 확인 */}
                  {(() => {
                    const hasSpecs =
                      studentDetail.student.specs &&
                      ((studentDetail.student.specs.certificates &&
                        studentDetail.student.specs.certificates.length > 0) ||
                        (studentDetail.student.specs.activities &&
                          studentDetail.student.specs.activities.length > 0) ||
                        (studentDetail.student.specs.projects &&
                          studentDetail.student.specs.projects.length > 0) ||
                        (studentDetail.student.specs.skills &&
                          studentDetail.student.specs.skills.length > 0));

                    if (!hasSpecs) {
                      return (
                        <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
                          <div className="mb-4">
                            <img
                              src="/ic_empty.svg"
                              alt="정보 없음"
                              className="mx-auto w-16 h-16 opacity-50"
                            />
                          </div>
                          <h3 className="mb-2 text-lg font-medium text-gray-700">
                            아직 학생이 스펙 정보를 등록하지 않았습니다
                          </h3>
                          <p className="text-sm text-gray-500">
                            학생이 정보를 입력하면 여기에 표시됩니다
                          </p>
                        </div>
                      );
                    }

                    return (
                      <AbilitySection
                        certificates={
                          studentDetail.student.specs?.certificates
                            ? Array.isArray(studentDetail.student.specs.certificates)
                              ? studentDetail.student.specs.certificates.map((cert) =>
                                  typeof cert === 'string' ? { name: cert } : cert
                                )
                              : []
                            : []
                        }
                        activities={
                          studentDetail.student.specs?.activities
                            ? Array.isArray(studentDetail.student.specs.activities)
                              ? studentDetail.student.specs.activities.map((activity) =>
                                  typeof activity === 'string' ? { title: activity } : activity
                                )
                              : []
                            : []
                        }
                        projects={
                          studentDetail.student.specs?.projects
                            ? Array.isArray(studentDetail.student.specs.projects)
                              ? studentDetail.student.specs.projects.map((project) =>
                                  typeof project === 'string' ? { name: project } : project
                                )
                              : []
                            : []
                        }
                        skills={
                          studentDetail.student.specs?.skills
                            ? Array.isArray(studentDetail.student.specs.skills)
                              ? studentDetail.student.specs.skills.map((skill) =>
                                  typeof skill === 'string'
                                    ? skill
                                    : skill.skill_name || skill.name || String(skill)
                                )
                              : []
                            : []
                        }
                      />
                    );
                  })()}
                </>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentDetailDrawer;
