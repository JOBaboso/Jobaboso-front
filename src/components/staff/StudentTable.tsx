import React from 'react';
import { StudentSpec } from '../../mocks/staffStudentsData';
import StudentTableHeader from './StudentTableHeader';
import StudentTableRow from './StudentTableRow';

interface StudentTableProps {
  students: StudentSpec[];
  aiQuery: string | null;
  openDropdown: string | null;
  openMenuId: string | null;
  onToggleDropdown: (columnName: string) => void;
  onFilterSelect: (columnName: string, value: string) => void;
  onToggleMenu: (id: string) => void;
  onCheckDetailedSpec: (student: StudentSpec) => void;
  onCheckApplicationStatus: (student: StudentSpec) => void;
  onOpenDetailDrawer: (student: StudentSpec) => void;
  selectedStudentId: string | null;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  aiQuery,
  openDropdown,
  openMenuId,
  onToggleDropdown,
  onFilterSelect,
  onToggleMenu,
  onCheckDetailedSpec,
  onCheckApplicationStatus,
  onOpenDetailDrawer,
  selectedStudentId,
}) => {
  // API 결과를 그대로 표시
  const displayStudents = students;

  return (
    <table className="w-full">
      <StudentTableHeader
        openDropdown={openDropdown}
        onToggleDropdown={onToggleDropdown}
        onFilterSelect={onFilterSelect}
      />
      <tbody>
        {displayStudents.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            openMenuId={openMenuId}
            onToggleMenu={onToggleMenu}
            onCheckDetailedSpec={onCheckDetailedSpec}
            onCheckApplicationStatus={onCheckApplicationStatus}
            onOpenDetailDrawer={onOpenDetailDrawer}
            selectedStudentId={selectedStudentId}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
