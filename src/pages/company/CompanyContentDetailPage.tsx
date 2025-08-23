import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getCompanyContentById,
  getNextContentId,
  getPreviousContentId,
} from '@mocks/companyContentData';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const CompanyContentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <div>콘텐츠를 찾을 수 없습니다.</div>;
  }

  const content = getCompanyContentById(id);
  const nextId = getNextContentId(id);
  const prevId = getPreviousContentId(id);

  if (!content) {
    return <div>콘텐츠를 찾을 수 없습니다.</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    // 수정 페이지로 이동 (구현 필요)
    console.log('Edit content:', id);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 콘텐츠를 삭제하시겠습니까?')) {
      // 삭제 로직 구현 (구현 필요)
      console.log('Delete content:', id);
      navigate('/company/contents');
    }
  };

  return (
    <div>
      {/* 헤더 영역 */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex-1">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">{content.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="font-medium">{content.companyName}</span>
            <span>{formatDate(content.createdAt)}</span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 px-4 py-2 text-blue-600 transition-colors hover:text-blue-800"
          >
            <PencilIcon className="h-5 w-5" />
            <span>수정하기</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 transition-colors hover:text-red-800"
          >
            <TrashIcon className="h-5 w-5" />
            <span>삭제하기</span>
          </button>
        </div>
      </div>

      {/* 콘텐츠 본문 */}
      <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
        {/* 이미지 */}
        {content.imageUrl && (
          <div className="mb-8">
            <img
              src={content.imageUrl}
              alt={content.title}
              className="max-h-96 w-full rounded-lg object-cover"
            />
          </div>
        )}

        {/* 유튜브 링크 */}
        {content.youtubeUrl && (
          <div className="mb-8">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
              <a
                href={content.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                🔗 유튜브 영상 보기
              </a>
            </div>
          </div>
        )}

        {/* 콘텐츠 텍스트 */}
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-700">{content.content}</div>
        </div>

        {/* 해시태그 */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap gap-2">
            {content.hashtags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="flex items-center justify-between border-t border-gray-200 py-6">
        {prevId ? (
          <Link
            to={`/company/contents/${prevId}`}
            className="flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-800"
          >
            <span>←</span>
            <span>이전 콘텐츠</span>
          </Link>
        ) : (
          <div></div>
        )}

        {nextId ? (
          <Link
            to={`/company/contents/${nextId}`}
            className="flex items-center space-x-2 text-blue-600 transition-colors hover:text-blue-800"
          >
            <span>다음 콘텐츠</span>
            <span>→</span>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CompanyContentDetailPage;
