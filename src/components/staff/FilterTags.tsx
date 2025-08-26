import React from 'react';

interface Filter {
  columnName: string;
  value: string;
}

interface FilterTagsProps {
  activeFilters: Filter[];
  aiQuery: string | null;
  onRemoveFilter: (index: number) => void;
  onClearAIQuery: () => void;
}

const FilterTags: React.FC<FilterTagsProps> = ({
  activeFilters,
  aiQuery,
  onRemoveFilter,
  onClearAIQuery,
}) => {
  const getFilterDisplayName = (columnName: string) => {
    switch (columnName) {
      case 'gender':
        return '성별';
      case 'gpa':
        return '학점';
      case 'acceptanceRate':
        return '합격률';
      case 'status':
        return '상태';
      default:
        return columnName;
    }
  };

  if (activeFilters.length === 0 && !aiQuery) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center p-3 mb-4 rounded-md border border-gray-200">
      {/* AI 쿼리 태그 */}
      {aiQuery && (
        <span className="flex gap-1 items-center px-4 py-1 text-blue-700 rounded-full bg-subLightBlue text-bodyLg">
          AI 검색: {aiQuery}
          <button
            type="button"
            className="ml-2 text-blue-700 hover:text-blue-900"
            onClick={onClearAIQuery}
          >
            ×
          </button>
        </span>
      )}
      
      {/* 필터 태그들 */}
      {activeFilters.map((filter, index) => (
        <span
          key={index}
          className="flex gap-1 items-center px-4 py-1 text-gray-700 rounded-full bg-subLightBlue text-bodyLg"
        >
          {getFilterDisplayName(filter.columnName)}: {filter.value}
          <button
            type="button"
            className="ml-2 text-gray-600 hover:text-gray-800"
            onClick={() => onRemoveFilter(index)}
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default FilterTags;
