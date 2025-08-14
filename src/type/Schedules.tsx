// types/Schedule.ts
export type Schedule =
  | '서류 마감일'
  | '서류 합격 발표일'
  | '시험일'
  | '시험 결과 발표일'
  | '과제 제출 마감일'
  | '면접일'
  | '면접 결과 발표일'
  | '최종 합격 발표일';

export const ScheduleStyleMap: Record<Schedule, string> = {
  '서류 마감일': 'bg-red-100 text-red-600 border-red-500',
  '서류 합격 발표일': 'bg-blue-100 text-blue-600 border-blue-500',
  '시험일': 'bg-purple-100 text-purple-600 border-purple-500',
  '시험 결과 발표일': 'bg-blue-100 text-blue-600 border-blue-500',
  '과제 제출 마감일': 'bg-orange-100 text-orange-600 border-orange-500',
  '면접일': 'bg-indigo-100 text-indigo-600 border-indigo-500',
  '면접 결과 발표일': 'bg-blue-100 text-blue-600 border-blue-500',
  '최종 합격 발표일': 'bg-green-100 text-green-600 border-green-500',
};
