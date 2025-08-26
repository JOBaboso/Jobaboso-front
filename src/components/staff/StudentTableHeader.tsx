import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface StudentTableHeaderProps {
  openDropdown: string | null;
  onToggleDropdown: (columnName: string) => void;
  onFilterSelect: (columnName: string, value: string) => void;
}

const StudentTableHeader: React.FC<StudentTableHeaderProps> = ({
  openDropdown,
  onToggleDropdown,
  onFilterSelect,
}) => {
  const dropdownOptions = {
    gender: ['남성', '여성'],
    gpa: ['4.0 ~ 4.5', '3.5 ~ 4.0', '3.0 ~ 3.5', '3.0 미만'],
    acceptanceRate: ['80% ~ 100%', '50% ~ 80%', '30% ~ 50%', '30% 미만'],
    status: ['졸업', '재학'],
  };

  const renderDropdown = (columnName: string, options: string[]) => (
    <div className="absolute left-0 top-full z-20 mt-1 w-32 bg-white rounded-md border border-gray-200 shadow-lg">
      <div className="py-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterSelect(columnName, option)}
            className="block px-4 py-2 w-full text-left text-gray-600 text-bodyLg hover:bg-gray-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <thead>
      <tr className="h-12 bg-gray-100 border-gray-300 border-y">
        <th className="relative px-4 py-3 text-left">
          <button
            onClick={() => onToggleDropdown('gender')}
            className="flex gap-1 items-center h-6 hover:text-gray-700"
          >
            <span className="text-base font-normal leading-6 text-gray-500">성별</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </button>
          {openDropdown === 'gender' && renderDropdown('gender', dropdownOptions.gender)}
        </th>
        
        <th className="relative px-4 py-3 text-left">
          <button
            onClick={() => onToggleDropdown('gpa')}
            className="flex gap-1 items-center h-6 hover:text-gray-700"
          >
            <span className="text-base font-normal leading-6 text-gray-500">학점</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </button>
          {openDropdown === 'gpa' && renderDropdown('gpa', dropdownOptions.gpa)}
        </th>
        
        <th className="relative px-4 py-3 text-left">
          <button
            onClick={() => onToggleDropdown('acceptanceRate')}
            className="flex gap-1 items-center h-6 hover:text-gray-700"
          >
            <span className="text-base font-normal leading-6 text-gray-500">
              최종합격률
            </span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </button>
          {openDropdown === 'acceptanceRate' && renderDropdown('acceptanceRate', dropdownOptions.acceptanceRate)}
        </th>
        
        <th className="relative px-4 py-3 text-left">
          <button
            onClick={() => onToggleDropdown('status')}
            className="flex gap-1 items-center h-6 hover:text-gray-700"
          >
            <span className="text-base font-normal leading-6 text-gray-500">상태</span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </button>
          {openDropdown === 'status' && renderDropdown('status', dropdownOptions.status)}
        </th>
        
        <th className="px-4 py-3 text-center">
          <div className="flex gap-1 justify-center items-center mx-auto h-6 w-15">
            <span className="text-base font-normal leading-6 text-gray-500">스펙/지원</span>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default StudentTableHeader;
