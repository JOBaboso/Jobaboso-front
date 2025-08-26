import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentSpec } from '../../mocks/staffStudentsData';
import ProfileCard from './drawer/ProfileCard';
import EducationSection from './drawer/EducationSection';
import AbilitySection from './drawer/AbilitySection';
import { ApplicationTable, ApplicationRow } from './drawer/ApplicationTable';

interface StudentDetailDrawerProps {
  isOpen: boolean;
  student: StudentSpec | null;
  onClose: () => void;
}

const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({
  isOpen,
  student,
  onClose,
}) => {
  if (!student) return null;

  // 나이 계산 함수
  const calculateAge = (birthDate: string) => {
    const birthYear = parseInt(birthDate.split('년')[0]);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  return (
    <>
      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -450 }}
            animate={{ x: 0 }}
            exit={{ x: -450 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200,
              duration: 0.4
            }}
            className="fixed left-0 top-[104px] h-[calc(100vh-104px)] w-[450px] bg-white shadow-md z-30 border-r border-gray-200 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">학생 상세 정보</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors z-40"
                title="닫기"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* 지원 현황 요약 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {student.acceptanceRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-blue-700">
                    합격률
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{student.totalApplications}</div>
                    <div className="text-xs text-gray-600">전체 지원</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{student.acceptedApplications}</div>
                    <div className="text-xs text-gray-600">합격</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">
                      {student.totalApplications - student.acceptedApplications}
                    </div>
                    <div className="text-xs text-gray-600">불합격</div>
                  </div>
                </div>
              </div>

              {/* 프로필 정보 */}
              <ProfileCard
                name={student.name}
                gender={student.gender}
                birthDate={student.birthDate}
                age={calculateAge(student.birthDate)}
                phone={student.phone}
                email={student.email}
              />

              {/* 학력 정보 */}
              <EducationSection
                schoolName={student.education.schoolName}
                major={student.education.major}
                admissionYear={student.education.admissionYear}
                status={student.education.status}
                score={student.education.score}
                graduationYear={student.education.graduationYear}
              />

              {/* 보유역량 정보 */}
              <AbilitySection
                certificates={student.certificates}
                activities={student.activities}
                projects={student.projects}
                skills={student.skills}
              />

              {/* 지원 현황 테이블 */}
              <div className="rounded-xl border border-gray-200 p-6 bg-white">
                <div className="flex items-center mb-4">
                  <img src="/ic_skill_2.svg" alt="지원 현황" className="w-8 h-8 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">지원 현황</h3>
                </div>
                
                <ApplicationTable 
                  rows={[
                    {
                      id: 1,
                      company: "삼성전자",
                      position: "소프트웨어 개발자",
                      date: "2024-01-15",
                      status: "서류 합격",
                      originalStatus: "documents_passed",
                      companyLogo: "/company_porfile/samsung.svg"
                    },
                    {
                      id: 2,
                      company: "LG전자",
                      position: "백엔드 개발자",
                      date: "2024-01-10",
                      status: "면접 준비중",
                      originalStatus: "preparing_interview",
                      companyLogo: "/company_porfile/lg.svg"
                    },
                    {
                      id: 3,
                      company: "네이버",
                      position: "프론트엔드 개발자",
                      date: "2024-01-05",
                      status: "최종 합격",
                      originalStatus: "final_accepted",
                      companyLogo: "/company_porfile/navercloud.svg"
                    }
                  ]}
                  onRowClick={(id) => console.log('지원 현황 클릭:', id)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentDetailDrawer;
