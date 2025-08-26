import React from 'react';

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <img src="/staff/ic_loading.svg" alt="로딩" className="w-12 h-12 animate-spin" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
