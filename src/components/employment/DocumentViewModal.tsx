import React, { useState, useEffect } from 'react';
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
  const [documentContent, setDocumentContent] = useState<string>('');
  const [mainTsxSrc, setMainTsxSrc] = useState<string>('');
  const [documentToken, setDocumentToken] = useState<string>('');
  const [showIframe, setShowIframe] = useState(false);
  const [iframeHtml, setIframeHtml] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && documentUrl) {
      fetchDocumentContent();
    }
  }, [isOpen, documentUrl]);

  const fetchDocumentContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // API에서 받은 URL이 실제로는 HTML 문자열인 경우
      if (documentUrl.startsWith('<!doctype html') || documentUrl.startsWith('<html')) {
        // HTML 문자열을 그대로 사용
        setDocumentContent(documentUrl);
        
        // main.tsx 스크립트의 src 값 추출
        try {
          const doc = new DOMParser().parseFromString(documentUrl, 'text/html');
          const selector = 'script[type="module"][src*="main.tsx"],script[type="module"][src^="/src/main.tsx"]';
          const mainModule = doc.querySelector(selector) as HTMLScriptElement | null;
          const src = mainModule?.getAttribute('src') ?? '';
          setMainTsxSrc(src);
          
          // t 토큰 추출
          if (src) {
            const url = new URL(src, window.location.origin);
            const token = url.searchParams.get('t');
            if (token) {
              setDocumentToken(token);
            }
          }
        } catch (parseError) {
          console.error('HTML 파싱 오류:', parseError);
          setMainTsxSrc('');
        }
        
        setLoading(false);
        return;
      }

      // 실제 URL인 경우 fetch 시도
      const response = await fetch(documentUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      setDocumentContent(content);
    } catch (err) {
      console.error('Error fetching document content:', err);
      // fetch 실패 시 documentUrl을 직접 내용으로 사용
      setDocumentContent(documentUrl);
    } finally {
      setLoading(false);
    }
  };

  const showDocumentInIframe = async () => {
    try {
      setIframeLoading(true);
      setError(null);
      
      // 백엔드 API 직접 호출
      const accessToken = localStorage.getItem('access_token');
      const apiUrl = 'http://43.201.126.183:8000/applications/30/documents/71/view';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': accessToken ? `Bearer ${accessToken}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
      }

      const htmlContent = await response.text();
      setIframeHtml(htmlContent);
      setShowIframe(true);
      
    } catch (err) {
      console.error('Error fetching document from API:', err);
      setError(err instanceof Error ? err.message : '문서를 불러오는데 실패했습니다.');
    } finally {
      setIframeLoading(false);
    }
  };

  const hideIframe = () => {
    setShowIframe(false);
    setIframeHtml('');
  };

  if (!isOpen) return null;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">문서를 불러오는 중...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 p-4">
          <h3 className="font-semibold mb-2">에러가 발생했습니다:</h3>
          <p>{error}</p>
        </div>
      );
    }

    // iframe으로 문서 표시하는 경우
    if (showIframe && iframeHtml) {
      return (
        <div className="h-96 overflow-auto border rounded-lg p-4 bg-white">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">문서 뷰어 (백엔드 HTML 응답)</h4>
            <button
              onClick={hideIframe}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              ← 뒤로 가기
            </button>
          </div>
          
          <div className="relative bg-white rounded-lg border overflow-hidden">
            <iframe
              srcDoc={iframeHtml}
              title="JobMate 문서 뷰어"
              className="w-full h-80 border-0"
              referrerPolicy="no-referrer"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
            
            <div className="p-3 bg-gray-50 border-t">
              <p className="text-sm text-gray-600">
                백엔드에서 받은 HTML을 iframe으로 표시합니다.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // HTML 내용인 경우 - t 토큰과 실제 문서 내용 표시
    if (documentContent.startsWith('<!doctype html') || documentContent.startsWith('<html')) {
      return (
        <div className="h-96 overflow-auto border rounded-lg p-4 bg-white">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>참고:</strong> 이 문서는 HTML 형식으로 반환되었습니다.
            </p>
          </div>
          
          {/* t 토큰 표시 - 클릭하여 백엔드 API 호출 */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700">문서 토큰 (클릭하여 백엔드 API 호출):</h4>
            {documentToken ? (
              <button
                onClick={showDocumentInIframe}
                disabled={iframeLoading}
                className="font-mono text-sm bg-green-100 border border-green-300 p-3 rounded-lg hover:bg-green-200 transition-colors cursor-pointer w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ wordBreak: 'break-all' }}
              >
                t = {documentToken}
                <div className="text-xs text-green-600 mt-1">
                  {iframeLoading ? '백엔드 API 호출 중...' : '클릭하여 백엔드 API에서 문서 가져오기'}
                </div>
              </button>
            ) : (
              <div className="text-gray-500 text-sm">토큰을 찾지 못했습니다.</div>
            )}
          </div>

          {/* main.tsx src 값 표시 */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-gray-700">main.tsx 스크립트 경로:</h4>
            {mainTsxSrc ? (
              <div
                className="font-mono text-sm bg-gray-100 border border-gray-300 p-3 rounded-lg overflow-auto"
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
              >
                {`src="${mainTsxSrc}"`}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">main.tsx 스크립트를 찾지 못했습니다.</div>
            )}
          </div>

          {/* 전체 HTML 내용 (접을 수 있게) */}
          <details className="border rounded-lg">
            <summary className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-700">
              전체 HTML 내용 보기
            </summary>
            <div className="p-4 bg-gray-50 max-h-32 overflow-auto">
              <pre className="whitespace-pre-wrap text-xs text-gray-600 font-mono">
                {documentContent}
              </pre>
            </div>
          </details>
        </div>
      );
    }

    // 일반 텍스트 내용인 경우
    return (
      <div className="h-96 overflow-auto border rounded-lg p-4 bg-gray-50">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
          {documentContent}
        </pre>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {documentName} - 문서 보기
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewModal;
