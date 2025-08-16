import React, { useState } from 'react';
import { CompanyInfoSection } from './CompanyInfoSection';
import { InterviewInfoSection } from './InterviewInfoSection';
import { PassInfoSection } from './PassInfoSection';
import Button from '@components/common/Button';

export interface ReviewFormData {
  companyName: string;
  positions: string[];
  interviewExperience: 'newcomer' | 'experienced' | null;
  interviewYear: string;
  interviewMonth: string;
  overallRating: string | null;
  difficulty: string | null;
  interviewQuestion: string;
  interviewReview: string;
  passStatus: string | null;
}

interface ReviewWriteFormProps {
  onSubmit?: (data: ReviewFormData) => void;
}

export const ReviewWriteForm: React.FC<ReviewWriteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ReviewFormData>({
    companyName: '',
    positions: [],
    interviewExperience: null,
    interviewYear: '2025',
    interviewMonth: '8',
    overallRating: null,
    difficulty: null,
    interviewQuestion: '',
    interviewReview: '',
    passStatus: null,
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('폼 데이터:', formData);
    }
  };

  const updateFormData = (updates: Partial<ReviewFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="w-full">
      <CompanyInfoSection 
        formData={formData}
        onUpdate={updateFormData}
      />
      
      <InterviewInfoSection 
        formData={formData}
        onUpdate={updateFormData}
      />

      <PassInfoSection 
        formData={formData}
        onUpdate={updateFormData}
      />

      <div className="flex justify-end mt-40">
        <Button onClick={handleSubmit} className="w-auto px-[68px] h-[66px]">
          등록하기
        </Button>
      </div>
    </div>
  );
};
