import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DocumentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentName: string;
}

const DocumentViewModal: React.FC<DocumentViewModalProps> = ({
  isOpen,
  onClose,
  documentUrl,
  documentName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 모달 컨텐츠 */}
      <div className="relative z-10 w-11/12 max-w-4xl h-5/6 bg-white rounded-lg shadow-xl">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {documentName}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* 모달 바디 */}
        <div className="flex-1 p-4 h-full">
          <iframe
            src={documentUrl}
            className="w-full h-full border-0 rounded"
            title={documentName}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewModal;
