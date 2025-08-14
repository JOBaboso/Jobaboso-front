// types/ApplicationStatus.ts
export type Status =
  | '서류 준비중'
  | '서류 제출 완료'
  | '서류 심사중'
  | '서류 합격'
  | '서류 불합격'
  | '시험 준비중'
  | '시험 완료'
  | '시험 심사중'
  | '시험 합격'
  | '시험 불합격'
  | '과제 준비중'
  | '과제 제출 완료'
  | '과제 심사중'
  | '과제 합격'
  | '과제 불합격'
  | '면접 준비중'
  | '면접 완료'
  | '면접 심사중'
  | '면접 합격'
  | '면접 불합격'
  | '최종 합격'
  | '최종 불합격'
  | '합격 포기';

export const StatusStyleMap: Record<Status, string> = {
  '서류 준비중': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  '서류 제출 완료': 'bg-green-100 text-green-600 border-green-500',
  '서류 심사중': 'bg-gray-100 text-gray-600 border-gray-400',
  '서류 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '서류 불합격': 'bg-red-100 text-red-600 border-red-500',
  '시험 준비중': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  '시험 완료': 'bg-green-100 text-green-600 border-green-500',
  '시험 심사중': 'bg-gray-100 text-gray-600 border-gray-400',
  '시험 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '시험 불합격': 'bg-red-100 text-red-600 border-red-500',
  '과제 준비중': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  '과제 제출 완료': 'bg-green-100 text-green-600 border-green-500',
  '과제 심사중': 'bg-gray-100 text-gray-600 border-gray-400',
  '과제 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '과제 불합격': 'bg-red-100 text-red-600 border-red-500',
  '면접 준비중': 'bg-yellow-100 text-yellow-700 border-yellow-500',
  '면접 완료': 'bg-green-100 text-green-600 border-green-500',
  '면접 심사중': 'bg-gray-100 text-gray-600 border-gray-400',
  '면접 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '면접 불합격': 'bg-red-100 text-red-600 border-red-500',
  '최종 합격': 'bg-blue-100 text-blue-600 border-blue-500',
  '최종 불합격': 'bg-red-100 text-red-600 border-red-500',
  '합격 포기': 'bg-gray-100 text-gray-600 border-gray-400',
};
