// types/ApplicationStatus.ts
export type ApplicationStatus = '진행중' | '최종합격' | '서류합격' | '서류준비중' | '불합격';

export const ApplicationStatusStyleMap: Record<ApplicationStatus, string> = {
  진행중: 'bg-yellow-100 text-yellow-700 border-yellow-500',
  최종합격: 'bg-blue-100 text-blue-600 border-blue-500',
  서류합격: 'bg-green-100 text-green-600 border-green-500',
  서류준비중: 'bg-gray-100 text-gray-600 border-gray-400',
  불합격: 'bg-red-100 text-red-600 border-red-500',
};
