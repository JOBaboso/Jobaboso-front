import React from 'react';
import { GiftIcon } from '@heroicons/react/24/outline';

interface PointModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  points: number;
  description: string;
}

const PointModal: React.FC<PointModalProps> = ({
  isOpen,
  onClose,
  title,
  points,
  description
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto mb-8 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🪙</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-4xl font-bold" style={{ color: '#00B1FF' }}>
            {points > 0 ? '+' : ''}{points} points
          </p>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-mainBlue px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PointModal;
