import React from 'react';
import { ReviewWriteForm, ReviewFormData } from '@components/employment/ReviewWriteForm';

const ReviewWritePage: React.FC = () => {
  const handleSubmit = (data: ReviewFormData) => {
    // TODO: API 호출 로직 구현
    console.log('면접 후기 등록:', data);
  };

  return (
    <div className="w-full">
      <ReviewWriteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ReviewWritePage;
