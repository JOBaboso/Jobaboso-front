import React from 'react';

export type Status =
  | 'preparing_documents'
  | 'documents_submitted'
  | 'documents_under_review'
  | 'documents_passed'
  | 'documents_failed'
  | 'preparing_test'
  | 'test_completed'
  | 'test_under_review'
  | 'test_passed'
  | 'test_failed'
  | 'preparing_assignment'
  | 'assignment_submitted'
  | 'assignment_under_review'
  | 'assignment_passed'
  | 'assignment_failed'
  | 'preparing_interview'
  | 'interview_completed'
  | 'interview_under_review'
  | 'interview_passed'
  | 'interview_failed'
  | 'final_accepted'
  | 'final_rejected'
  | 'offer_declined';

export const StatusLabelMap: Record<Status, string> = {
  preparing_documents: '서류 준비중',
  documents_submitted: '서류 제출 완료',
  documents_under_review: '서류 심사중',
  documents_passed: '서류 합격',
  documents_failed: '서류 불합격',
  preparing_test: '시험 준비중',
  test_completed: '시험 완료',
  test_under_review: '시험 심사중',
  test_passed: '시험 합격',
  test_failed: '시험 불합격',
  preparing_assignment: '과제 준비중',
  assignment_submitted: '과제 제출 완료',
  assignment_under_review: '과제 심사중',
  assignment_passed: '과제 합격',
  assignment_failed: '과제 불합격',
  preparing_interview: '면접 준비중',
  interview_completed: '면접 완료',
  interview_under_review: '면접 심사중',
  interview_passed: '면접 합격',
  interview_failed: '면접 불합격',
  final_accepted: '최종 합격',
  final_rejected: '최종 불합격',
  offer_declined: '합격 포기',
};

export const StatusStyleMap: Record<Status, string> = {
  preparing_documents: 'bg-yellow-100 text-yellow-700 border-yellow-500',
  documents_submitted: 'bg-green-100 text-green-600 border-green-500',
  documents_under_review: 'bg-gray-100 text-gray-600 border-gray-400',
  documents_passed: 'bg-blue-100 text-blue-600 border-blue-500',
  documents_failed: 'bg-red-100 text-red-600 border-red-500',
  preparing_test: 'bg-yellow-100 text-yellow-700 border-yellow-500',
  test_completed: 'bg-green-100 text-green-600 border-green-500',
  test_under_review: 'bg-gray-100 text-gray-600 border-gray-400',
  test_passed: 'bg-blue-100 text-blue-600 border-blue-500',
  test_failed: 'bg-red-100 text-red-600 border-red-500',
  preparing_assignment: 'bg-yellow-100 text-yellow-700 border-yellow-500',
  assignment_submitted: 'bg-green-100 text-green-600 border-green-500',
  assignment_under_review: 'bg-gray-100 text-gray-600 border-gray-400',
  assignment_passed: 'bg-blue-100 text-blue-600 border-blue-500',
  assignment_failed: 'bg-red-100 text-red-600 border-red-500',
  preparing_interview: 'bg-yellow-100 text-yellow-700 border-yellow-500',
  interview_completed: 'bg-green-100 text-green-600 border-green-500',
  interview_under_review: 'bg-gray-100 text-gray-600 border-gray-400',
  interview_passed: 'bg-blue-100 text-blue-600 border-blue-500',
  interview_failed: 'bg-red-100 text-red-600 border-red-500',
  final_accepted: 'bg-blue-100 text-blue-600 border-blue-500',
  final_rejected: 'bg-red-100 text-red-600 border-red-500',
  offer_declined: 'bg-gray-100 text-gray-600 border-gray-400',
};

export interface ApplicationRow {
  id: number;
  company: string;
  position: string;
  date: string;
  status: string;
  originalStatus: string;
  companyLogo?: string;
}

interface ApplicationTableProps {
  rows: ApplicationRow[];
  onRowClick?: (id: number) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ rows, onRowClick }) => {
  return (
    <div className="overflow-hidden">
      <table className="w-full border-b border-t border-gray-400 text-left text-h4 text-gray-800">
        <thead className="bg-gray-100">
          <tr>
            <th className="h-[50px] px-4 align-middle">
              {' '}
              <input type="checkbox" />{' '}
            </th>
            <th className="h-[50px] px-4 align-middle">기업명</th>
            <th className="h-[50px] px-4 align-middle">지원 포지션</th>
            <th className="h-[50px] px-4 align-middle">지원일시</th>
            <th className="h-[50px] px-4 align-middle">상태</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="h-[88px] cursor-pointer border-t border-gray-400 hover:bg-gray-50"
              onClick={() => onRowClick?.(row.id)}
            >
              <td className="p-4">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
              </td>
              <td className="p-4 font-medium text-gray-800">
                <div className="flex items-center gap-2">
                  {row.companyLogo ? (
                    <img
                      src={row.companyLogo}
                      alt={`${row.company} 로고`}
                      className="mr-3 h-12 w-12 rounded-full border border-gray-400 object-contain"
                      style={{
                        boxSizing: 'border-box',
                        position: 'relative',
                      }}
                    />
                  ) : (
                    <div className="mr-3 h-12 w-12 rounded-full border border-gray-400 bg-gray-300" />
                  )}
                  {row.company}
                </div>
              </td>
              <td className="p-4 text-gray-700">{row.position}</td>
              <td className="p-4 text-gray-700">{row.date}</td>
              <td className="p-4">
                <span
                  className={`rounded-full border px-3 py-1 ${
                    row.originalStatus in StatusStyleMap
                      ? StatusStyleMap[row.originalStatus as Status]
                      : 'border-gray-400 bg-gray-100 text-gray-600'
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
