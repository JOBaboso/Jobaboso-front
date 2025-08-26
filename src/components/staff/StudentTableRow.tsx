import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { StudentSpec } from '../../mocks/staffStudentsData';

interface StudentTableRowProps {
  student: StudentSpec;
  onOpenDetailDrawer: (student: StudentSpec) => void;
  selectedStudentId: string | null;
}

const StudentTableRow: React.FC<StudentTableRowProps> = ({
  student,
  onOpenDetailDrawer,
  selectedStudentId,
}) => {
  const isSelected = selectedStudentId === student.id;

  return (
         <tr className={`border-b border-gray-100 hover:bg-gray-50 ${
       isSelected ? 'bg-gray-100' : ''
     }`}>
      <td className="px-4 py-4 text-gray-600 text-bodyLg">{student.gender}</td>
      <td className="px-4 py-4 text-gray-600 text-bodyLg">{student.gpa}</td>
      <td className="px-4 py-4 text-gray-600 text-bodyLg">
        <span className="font-bold">{student.acceptanceRate.toFixed(2)}%</span> ({student.totalApplications}개 중{' '}
        {student.acceptedApplications}개) 
      </td>
      <td className="px-4 py-4 text-gray-600 text-bodyLg">
        {student.status === '졸업' 
          ? `${student.graduationYear?.split('-')[0]?.slice(-2)}년 ${student.graduationYear?.split('-')[1]}월 졸업`
          : student.status
        }
      </td>
      <td className="px-4 py-4 text-center">
        <div className="flex relative justify-center gap-2">
          {/* 상세 정보 보기 버튼 */}
          <button
            onClick={() => onOpenDetailDrawer(student)}
            className={`p-2 rounded-full transition-colors ${
              isSelected 
                ? 'text-blue-600' 
                : 'hover:text-blue-600'
            }`}
            title="상세 정보 보기"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentTableRow;
