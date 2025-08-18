import React, { useEffect, useMemo, useState } from 'react';
import { ReviewWriteForm, ReviewFormData } from '@components/employment/ReviewWriteForm';
import { createJobReview, getJobReview, JobReviewItem, updateJobReview } from '@apis/employment';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ReviewWritePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get('id');
  const isEditMode = !!reviewId;
  const [initialForm, setInitialForm] = useState<ReviewFormData | undefined>(undefined);

  const handleSubmit = async (data: ReviewFormData) => {
    const experienceLevel = data.interviewExperience === 'newcomer' ? 'entry' : 'experienced';
    const overallEvaluation =
      data.overallRating === '긍정적' ? 'positive' : data.overallRating === '부정적' ? 'negative' : 'neutral';
    const difficulty =
      data.difficulty === '쉬움' ? 'easy' : data.difficulty === '어려움' ? 'hard' : 'medium';
    const interviewDate = `${data.interviewYear}-${String(data.interviewMonth).padStart(2, '0')}-01`;
    const finalResult =
      data.passStatus === '최종합격'
        ? 'final_pass'
        : data.passStatus === '2차합격'
        ? 'second_pass'
        : data.passStatus === '1차합격'
        ? 'first_pass'
        : 'fail';

    const interviewQuestions = (data.interviewQuestion || '')
      .split('\n')
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .map((q) => ({ question: q }));

    const positions = (data.positions || []).slice(0, 5).map((p) => ({ position: p }));

    const payload = {
      application_id: data.applicationId ?? undefined,
      company_name: data.companyName,
      positions,
      experience_level: experienceLevel,
      interview_date: interviewDate,
      overall_evaluation: overallEvaluation,
      difficulty,
      interview_questions: interviewQuestions,
      interview_review: data.interviewReview,
      final_result: finalResult,
    } as const;

    try {
      if (isEditMode) {
        await updateJobReview(Number(reviewId), {
          application_id: data.applicationId ?? undefined,
          company_name: data.companyName,
          positions,
          experience_level: experienceLevel,
          interview_date: interviewDate,
          overall_evaluation: overallEvaluation,
          difficulty,
          interview_questions: interviewQuestions,
          interview_review: data.interviewReview,
          final_result: finalResult,
        });
      } else {
        await createJobReview(payload);
      }
      navigate('/employment/review');
    } catch (e) {
      console.error(e);
      alert('후기 등록에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchForEdit = async () => {
      if (!isEditMode) return;
      try {
        const r: JobReviewItem = await getJobReview(Number(reviewId));
        // 백엔드 → 폼 데이터 매핑
        const passStatus =
          r.final_result === 'final_pass'
            ? '최종합격'
            : r.final_result === 'second_pass'
            ? '2차합격'
            : r.final_result === 'first_pass'
            ? '1차합격'
            : '불합격';
        const [y, m] = r.interview_date.split('-');
        const interviewQuestion = (r.interview_questions || [])
          .map((q) => q.question)
          .filter(Boolean)
          .join('\n');

        const mapped: ReviewFormData = {
          applicationId: r.application_id ?? null,
          companyName: r.company_name,
          positions: (r.positions || []).map((p) => p.position),
          interviewExperience: r.experience_level === 'entry' ? 'newcomer' : 'experienced',
          interviewYear: y,
          interviewMonth: String(Number(m)).toString(),
          overallRating:
            r.overall_evaluation === 'positive'
              ? '긍정적'
              : r.overall_evaluation === 'negative'
              ? '부정적'
              : '보통',
          difficulty:
            r.difficulty === 'easy' ? '쉬움' : r.difficulty === 'hard' ? '어려움' : '보통',
          interviewQuestion,
          interviewReview: r.interview_review,
          passStatus,
        };
        setInitialForm(mapped);
      } catch (e) {
        console.error(e);
        alert('후기 정보를 불러오지 못했습니다.');
      }
    };
    fetchForEdit();
  }, [isEditMode, reviewId]);

  return (
    <div className="w-full">
      <ReviewWriteForm onSubmit={handleSubmit} initialData={initialForm} submitLabel={isEditMode ? '수정하기' : '등록하기'} />
    </div>
  );
};

export default ReviewWritePage;
