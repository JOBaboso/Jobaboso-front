import React from 'react';
import { InputField } from '@components/common/InputField';
import { FiChevronDown, FiSearch, FiHelpCircle } from 'react-icons/fi';

export const UniversityInfoSection: React.FC = () => {
  return (
    <div className="space-y-3">
      <InputField
        id="UniversityName"
        label="대학교명"
        placeholder="대학교를 선택해 주세요."
        rightIcon={<FiChevronDown size={24} />}
        onRightIconClick={() => {}}
      />

      {/* 재직증명서 */}
      <InputField
        id="CertificationOfEmployment"
        label="재직증명서"
        placeholder="재직증명서를 첨부해주세요."
      />
    </div>
  );
};
