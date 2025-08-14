// types/Result.ts
export type Result =
  | '서류 합격'
  | '서류 불합격'
  | '시험 합격'
  | '시험 불합격'
  | '과제 합격'
  | '과제 불합격'
  | '면접 합격'
  | '면접 불합격'
  | '최종 합격'
  | '최종 불합격'
  | '합격 포기';

export const ResultStyleMap: Record<Result, string> = {
  '서류 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '서류 불합격': 'bg-red-100 text-red-600 border-red-500',
  '시험 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '시험 불합격': 'bg-red-100 text-red-600 border-red-500',
  '과제 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '과제 불합격': 'bg-red-100 text-red-600 border-red-500',
  '면접 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '면접 불합격': 'bg-red-100 text-red-600 border-red-500',
  '최종 합격': 'bg-green-100 text-green-600 border-green-500',
  '최종 불합격': 'bg-red-100 text-red-600 border-red-500',
  '합격 포기': 'bg-gray-100 text-gray-600 border-gray-400',
};
