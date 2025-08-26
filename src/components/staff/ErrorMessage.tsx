import React from 'react';

interface ErrorMessageProps {
  error: string;
  fallbackMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, fallbackMessage }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-red-600">{error}</p>
        {fallbackMessage && <p className="text-gray-600">{fallbackMessage}</p>}
      </div>
    </div>
  );
};

export default ErrorMessage;
