import React, { useEffect } from 'react';
import { deductPointsForPost } from '@apis/points';

interface PointModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  points: number;
  description: string;
  onRefresh?: () => void;
  onConfirm?: () => void;
}

const PointModal: React.FC<PointModalProps> = ({
  isOpen,
  onClose,
  title,
  points,
  description,
  onRefresh,
  onConfirm
}) => {
  // 포인트 변경 API 호출
  useEffect(() => {
    if (isOpen && points !== 0) {
      const updatePoints = async () => {
        try {
          // 포인트가 양수면 +10, 음수면 -10으로 API 호출
          const pointsChange = points > 0 ? 10 : -10;
          await deductPointsForPost(pointsChange);
          
          // 포인트 새로고침
          if (onRefresh) {
            onRefresh();
          }
        } catch (error) {
          console.error('포인트 변경 실패:', error);
        }
      };
      
      updatePoints();
    }
  }, [isOpen, points, onRefresh]);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  if (!isOpen) return null;

  // 포인트에 따른 스타일 결정
  const isPositive = points > 0;
  const isNegative = points < 0;
  const pointColor = isPositive ? '#00B1FF' : isNegative ? '#EF4444' : '#6B7280';
  const icon = '🪙';

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="p-8 w-full max-w-md text-center bg-white rounded-2xl">
        <div className="mb-6">
          <div className="flex justify-center items-center mx-auto mb-8">
            <span className="text-6xl animate-bounce">{icon}</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-4xl font-bold" style={{ color: pointColor }}>
            {points > 0 ? '+' : ''}{points} points
          </p>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </div>
        <button
          onClick={handleConfirm}
          className="px-6 py-3 w-full text-lg font-medium text-white rounded-lg transition-colors bg-mainBlue hover:bg-blue-700"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PointModal;
