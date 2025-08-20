import React, { useState, useEffect } from 'react';

interface DocumentViewerProps {
  token: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ token }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 토큰을 사용하여 백엔드 URL 구성
  // 실제로는 토큰과 application_id, document_id를 매핑해야 함
  // 현재는 예시로 고정값 사용
  const src = `http://43.201.126.183:8000/applications/30/documents/71/view`;

  const handleIframeLoad = () => {
    setLoaded(true);
  };

  const handleIframeError = () => {
    setError('문서를 불러오는데 실패했습니다.');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">에러가 발생했습니다</h2>
          <p className="text-gray-600">{error}</p>
          <a 
            href={src} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            새 창에서 열기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">문서 뷰어</h1>
          <p className="text-gray-600">
            토큰: <code className="bg-gray-100 px-2 py-1 rounded">{token}</code>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            백엔드 URL: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{src}</code>
          </p>
        </div>

        {/* iframe 컨테이너 */}
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 로딩 오버레이 */}
          {!loaded && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">문서를 불러오는 중...</p>
              </div>
            </div>
          )}

          {/* iframe */}
          <iframe
            src={src}
            title="JobMate 문서 뷰어"
            className="w-full h-[85vh] border-0"
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />

          {/* 새 창으로 열기 링크 */}
          <div className="p-4 bg-gray-50 border-t">
            <a 
              href={src} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              새 창에서 열기
            </a>
          </div>
        </div>

        {/* 정보 박스 */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">현재 상태</h3>
          <p className="text-blue-700 text-sm">
            이 페이지는 <code>http://43.201.126.183:8000/applications/30/documents/71/view</code>를 iframe으로 임베드하여 표시합니다.<br/>
            토큰 <code>{token}</code>을 사용하여 백엔드에서 문서를 가져옵니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
