import { useState, useEffect } from 'react';
import { StudentSpec } from '../../mocks/staffStudentsData';

export interface Filter {
  columnName: string;
  value: string;
}

export const useStudentFilters = (students: StudentSpec[]) => {
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentSpec[]>(students);

  // 필터 적용 함수
  const applyFilters = (studentsToFilter: StudentSpec[]) => {
    return studentsToFilter.filter((student) => {
      return activeFilters.every((filter) => {
        switch (filter.columnName) {
          case 'gender':
            return student.gender === filter.value;
          
          case 'gpa':
            switch (filter.value) {
              case '4.0 ~ 4.5':
                return student.gpa >= 4.0;
              case '3.5 ~ 4.0':
                return student.gpa >= 3.5 && student.gpa < 4.0;
              case '3.0 ~ 3.5':
                return student.gpa >= 3.0 && student.gpa < 3.5;
              case '3.0 미만':
                return student.gpa < 3.0;
              default:
                return true;
            }
          
          case 'acceptanceRate':
            switch (filter.value) {
              case '80% ~ 100%':
                return student.acceptanceRate >= 80;
              case '50% ~ 80%':
                return student.acceptanceRate >= 50 && student.acceptanceRate < 80;
              case '30% ~ 50%':
                return student.acceptanceRate >= 30 && student.acceptanceRate < 50;
              case '30% 미만':
                return student.acceptanceRate < 30;
              default:
                return true;
            }
          
          case 'status':
            return student.status === filter.value;
          
          default:
            return true;
        }
      });
    });
  };

  // 필터 추가
  const addFilter = (columnName: string, value: string) => {
    const existingFilter = activeFilters.find(
      (filter) => filter.columnName === columnName && filter.value === value
    );

    if (!existingFilter) {
      setActiveFilters([...activeFilters, { columnName, value }]);
    }
  };

  // 필터 제거
  const removeFilter = (index: number) => {
    const updatedFilters = [...activeFilters];
    updatedFilters.splice(index, 1);
    setActiveFilters(updatedFilters);
  };

  // 필터 적용 useEffect
  useEffect(() => {
    const filtered = applyFilters(students);
    setFilteredStudents(filtered);
  }, [activeFilters, students]);

  return {
    activeFilters,
    filteredStudents,
    addFilter,
    removeFilter,
  };
};
