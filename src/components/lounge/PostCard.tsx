import React from 'react';

interface PostCardProps {
  post: {
    tags: string[];
    title: string;
    body: string;
    date: string;
    commentCount: number;
  };
  activeTab: string;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  activeTab, 
  className = "py-6 border-b border-gray-200" 
}) => (
  <div className={className}>
    {/* 태그 */}
    <div className="flex gap-2 mb-3">
      {post.tags.map((tag: string, tagIndex: number) => (
        <span
          key={tagIndex}
          className="px-3 py-1 text-gray-500 bg-gray-100 rounded-md text-[14px]"
        >
          {tag}
        </span>
      ))}
    </div>
    
    {/* 제목 */}
    <h3 className="mb-3 font-semibold text-gray-800 text-h3">
      {(activeTab === 'QnA' || activeTab === '스터디') ? (
        <>
          <span className="mr-2 text-blue-500">Q.</span>
          <span>{post.title}</span>
        </>
      ) : (
        post.title
      )}
    </h3>
    
    {/* 내용 */}
    <div className="mb-4 text-gray-700 text-bodyLg">
      {post.body.split('\n').slice(0, 2).map((line: string, index: number) => (
        <p key={index} className={index === 1 ? 'line-clamp-1' : ''}>
          {line}
        </p>
      ))}
    </div>
    
    {/* 메타데이터 */}
    <div className="flex items-center text-gray-400 text-bodyLg">
      <span>{post.date}</span>
      <div className="flex gap-1 items-center ml-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{post.commentCount}</span>
      </div>
    </div>
  </div>
);

export default PostCard; 