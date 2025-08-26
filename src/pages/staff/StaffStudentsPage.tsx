import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchStudents, StudentAPIParams, StudentAPIResponse } from '../../apis/staff';
import { StudentSpec } from '../../mocks/staffStudentsData';
import { useStudentFilters, Filter } from '../../components/staff/useStudentFilters';

// 컴포넌트들
import AIModal from '../../components/staff/AIModal';
import AIFloatingButton from '../../components/staff/AIFloatingButton';
import SortDropdown from '../../components/staff/SortDropdown';
import FilterTags from '../../components/staff/FilterTags';
import StudentTable from '../../components/staff/StudentTable';
import LoadingSpinner from '../../components/staff/LoadingSpinner';
import ErrorMessage from '../../components/staff/ErrorMessage';
import StudentDetailDrawer from '../../components/staff/StudentDetailDrawer';

// API 데이터를 기존 StudentSpec 타입으로 변환하는 함수
const transformAPIResponseToStudentSpec = (
  apiStudents: StudentAPIResponse['students']
): StudentSpec[] => {
  return apiStudents.map((student, index) => ({
    id: student.student_id || `student-${index}`,
    gender: student.gender === 'M' ? '남성' : student.gender === 'W' ? '여성' : '남성',
    gpa: Number(student.score.toFixed(1)),
    acceptanceRate: student.success_rate,
    acceptedApplications: Math.round((student.success_rate / 100) * student.total_applications),
    totalApplications: student.total_applications,
    status: student.status === '졸업' ? '졸업' : '재학',
    graduationYear: student.graduation_year,

    // 기본값으로 채워넣기
    name: `학생${index + 1}`,
    birthDate: '2000년 1월 1일',
    phone: '010-0000-0000',
    email: `student${index + 1}@example.com`,
    education: {
      schoolName: '대학교',
      major: '학과',
      admissionYear: '2020년 3월',
      status: student.status === '졸업' ? '졸업' : '재학',
      score: `${student.score.toFixed(1)}/4.5`,
      graduationYear: student.graduation_year || '2025년 2월',
    },
    certificates: [],
    activities: [],
    projects: [],
    skills: [],
  }));
};

const StaffStudentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const aiQuery = searchParams.get('ai_query');
  const sortQuery = searchParams.get('sort_query') || 'high';

  // 상태 관리
  const [students, setStudents] = useState<StudentSpec[]>([]);
  const [sortOrder, setSortOrder] = useState<'high' | 'low' | 'recent'>(
    sortQuery as 'high' | 'low' | 'recent'
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSortDropdown, setOpenSortDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer 상태
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentSpec | null>(null);

  // 커스텀 훅 사용
  const { activeFilters, filteredStudents, addFilter, removeFilter } = useStudentFilters(students);

  // 초기 데이터 로딩
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsInitialLoading(true);
        setError(null);

        const apiParams: StudentAPIParams = {
          sort_by: 'success_rate',
          sort_order: 'desc',
        };

        const response = await fetchStudents(apiParams);
        const transformedStudents = transformAPIResponseToStudentSpec(response.students);

        setStudents(transformedStudents);
      } catch (err) {
        console.error('학생 데이터 로딩 실패:', err);
        setError('학생 데이터를 불러오는데 실패했습니다.');
        setStudents([]);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadStudents();
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('th') && !target.closest('.sort-dropdown')) {
        setOpenDropdown(null);
        setOpenSortDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // URL 쿼리에서 정렬 상태 초기화
  useEffect(() => {
    const currentSortQuery = sortQuery as 'high' | 'low' | 'recent';
    if (currentSortQuery !== sortOrder) {
      setSortOrder(currentSortQuery);
    }
  }, [sortQuery, sortOrder]);

  // 정렬 처리
  const handleSortSelect = async (newSortOrder: 'high' | 'low' | 'recent') => {
    try {
      setIsLoading(true);

      let apiParams: StudentAPIParams = {
        grade: null,
      };

      if (newSortOrder === 'high') {
        apiParams = { ...apiParams, sort_by: 'success_rate', sort_order: 'desc' };
      } else if (newSortOrder === 'low') {
        apiParams = { ...apiParams, sort_by: 'success_rate', sort_order: 'asc' };
      } else if (newSortOrder === 'recent') {
        apiParams = { ...apiParams, sort_by: 'recent_success', sort_order: 'desc' };
      }

      const response = await fetchStudents(apiParams);
      const transformedStudents = transformAPIResponseToStudentSpec(response.students);

      setStudents(transformedStudents);
      setSortOrder(newSortOrder);
      setOpenSortDropdown(false);

      // URL에 정렬 쿼리 추가
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('sort_query', newSortOrder);
      setSearchParams(newSearchParams);
    } catch (err) {
      console.error('정렬 데이터 로딩 실패:', err);
      setSortOrder(newSortOrder);
      setOpenSortDropdown(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 이벤트 핸들러들
  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleCheckDetailedSpec = (student: StudentSpec) => {
    console.log('세부 스펙 확인하기:', student);
    setOpenMenuId(null);
  };

  const handleCheckApplicationStatus = (student: StudentSpec) => {
    console.log('전체 지원 현황 확인하기:', student);
    setOpenMenuId(null);
  };

  const handleOpenDetailDrawer = (student: StudentSpec) => {
    setSelectedStudent(student);
    setIsDetailDrawerOpen(true);
  };

  const handleAICall = () => {
    console.log('AI 버튼 클릭됨');
    setIsAIModalOpen(true);
  };

  const getButtonPosition = () => {
    // 기본값으로 화면 오른쪽 하단 위치 반환
    return {
      x: window.innerWidth - 200,
      y: window.innerHeight - 100,
    };
  };

  const toggleDropdown = (columnName: string) => {
    setOpenDropdown(openDropdown === columnName ? null : columnName);
  };

  const handleFilterSelect = (columnName: string, value: string) => {
    console.log(`${columnName} 필터 선택:`, value);
    setOpenDropdown(null);
    addFilter(columnName, value);
  };

  const handleClearAIQuery = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('ai_query');
    setSearchParams(newSearchParams);
  };

  // AI 쿼리 변경 시 로딩 처리
  useEffect(() => {
    if (aiQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [aiQuery]);

  // AI 쿼리가 있을 때 졸업 필터 적용
  const finalFilteredStudents = aiQuery
    ? filteredStudents.filter((student) => student.status === '졸업')
    : filteredStudents;

  // 로딩 상태에 따른 렌더링
  if (isInitialLoading) {
    return <LoadingSpinner message="학생 데이터를 불러오는 중..." />;
  }

  if (error) {
    return <ErrorMessage error={error} fallbackMessage="데이터를 불러올 수 없습니다." />;
  }

  return (
    <div className="relative">
      {/* AI 호출 버튼 */}
      <AIFloatingButton onClick={handleAICall} scrollY={scrollY} />

      {/* AI 모달 */}
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        buttonPosition={getButtonPosition()}
      />

      {/* 학생 상세 정보 Drawer */}
      <StudentDetailDrawer
        isOpen={isDetailDrawerOpen}
        student={selectedStudent}
        onClose={() => {
          setIsDetailDrawerOpen(false);
          setSelectedStudent(null);
        }}
      />
      <div className={`transition-all duration-300 ${isDetailDrawerOpen ? 'ml-60' : 'ml-0'}`}>
        {/* 정렬 드롭다운 */}
        <h2 className="mb-8 mt-8 text-[40px] font-bold text-gray-800">학생 스펙 확인하기</h2>
        <h2 className="text-bodyLg text-gray-700">
          우리 학과 학생 개개인의 스펙을 확인할 수 있어요.
        </h2>

        <div className="mb-4 flex items-center justify-end">
          <SortDropdown
            sortOrder={sortOrder}
            onSortSelect={handleSortSelect}
            isOpen={openSortDropdown}
            onToggle={() => setOpenSortDropdown(!openSortDropdown)}
          />
        </div>

        {/* 필터 태그들 */}
        <FilterTags
          activeFilters={activeFilters}
          aiQuery={aiQuery}
          onRemoveFilter={removeFilter}
          onClearAIQuery={handleClearAIQuery}
        />

        {/* 학생 테이블 */}
        <div>
          {isLoading ? (
            <LoadingSpinner message="데이터를 정렬하는 중..." />
          ) : (
            <StudentTable
              students={finalFilteredStudents}
              aiQuery={aiQuery}
              openDropdown={openDropdown}
              openMenuId={openMenuId}
              onToggleDropdown={toggleDropdown}
              onFilterSelect={handleFilterSelect}
              onToggleMenu={toggleMenu}
              onCheckDetailedSpec={handleCheckDetailedSpec}
              onCheckApplicationStatus={handleCheckApplicationStatus}
              onOpenDetailDrawer={handleOpenDetailDrawer}
              selectedStudentId={selectedStudent?.id || null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffStudentsPage;
