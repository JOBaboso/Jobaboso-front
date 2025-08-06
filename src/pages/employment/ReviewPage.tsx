import React from 'react';
import ReviewCard from '@components/employment/ReviewCard';
import { useNavigate } from 'react-router-dom';

const dummyReviews = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  company: '부산교통공사',
  status: ['최종합격', '1차합격', '2차합격', '불합격'][i % 4],
  content:
    '지원 동기, 회사에 바라던 문화에 대해 충분히 조사한 것이 주효했다. 면접에서 자신감있게 답변이 이루어졌으며, 과거 경험을 바탕으로 직무적합성에 집중한 태도를 긍정적 시각으로 봐주셨다. 이러한 상황에서 면접을 성공한 경험을 이야기하는...',
  date: '2025.8.2',
}));

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate('/employment/review/write'); // 작성 페이지로 이동
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleWrite}
          className="rounded-[8px] bg-mainBlue px-8 py-2 text-h4 text-white hover:bg-blue-600"
        >
          작성하기
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
