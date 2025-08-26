import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SortDropdownProps {
  sortOrder: 'high' | 'low' | 'recent';
  onSortSelect: (sortOrder: 'high' | 'low' | 'recent') => void;
  isOpen: boolean;
  onToggle: () => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOrder,
  onSortSelect,
  isOpen,
  onToggle,
}) => {
  const getSortLabel = () => {
    switch (sortOrder) {
      case 'high':
        return '합격률 높은 순';
      case 'low':
        return '합격률 낮은 순';
      case 'recent':
        return '최근 합격순';
      default:
        return '합격률 높은 순';
    }
  };

  return (
    <div className="relative sort-dropdown">
      <button
        onClick={onToggle}
        className="flex flex-row gap-1 items-center px-3 py-2 bg-white rounded-lg border border-gray-400 transition-colors hover:bg-gray-50"
      >
        <span className="text-base font-normal leading-6 text-gray-500">
          {getSortLabel()}
        </span>
        <ChevronDownIcon className="w-6 h-6 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 w-48 bg-white rounded-md border border-gray-200 shadow-lg">
          <div className="py-1">
            <button
              onClick={() => onSortSelect('high')}
              className={`block w-full px-4 py-2 text-left text-bodyLg hover:bg-gray-100 ${
                sortOrder === 'high' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              합격률 높은 순
            </button>
            <button
              onClick={() => onSortSelect('low')}
              className={`block w-full px-4 py-2 text-left text-bodyLg hover:bg-gray-100 ${
                sortOrder === 'low' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              합격률 낮은 순
            </button>
            <button
              onClick={() => onSortSelect('recent')}
              className={`block w-full px-4 py-2 text-left text-bodyLg hover:bg-gray-100 ${
                sortOrder === 'recent' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              최근 합격순
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
