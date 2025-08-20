import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DocumentViewer from '../../components/employment/DocumentViewer';

const DocumentViewerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('t');

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">토큰이 없습니다</h1>
          <p className="text-gray-600">URL에 t 파라미터가 필요합니다.</p>
          <p className="text-gray-500 text-sm mt-2">
            예: /document-viewer?t=1755623971851
          </p>
        </div>
      </div>
    );
  }

  return <DocumentViewer token={token} />;
};

export default DocumentViewerPage;
