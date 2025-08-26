import React from 'react';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { Status, StatusLabelMap, StatusStyleMap } from '../../../type/Status';

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
    <div className="rounded-xl border border-gray-300 bg-white p-6">
      <div className="mb-4 flex items-center">
        <BriefcaseIcon className="mr-3 h-8 w-8 text-mainBlue" />
        <h3 className="text-h2 font-semibold text-gray-800">지원 현황</h3>
      </div>
      <div className="overflow-hidden">
        <table className="w-full border-b border-t border-gray-400 text-left text-h4 text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="h-[50px] px-4 align-middle text-bodyLg">기업명</th>
              <th className="h-[50px] px-4 align-middle text-bodyLg">지원 포지션</th>
              <th className="h-[50px] px-4 align-middle text-bodyLg">지원일시</th>
              <th className="h-[50px] px-4 align-middle text-bodyLg">상태</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-400">
                <td className="p-4 text-bodyLg font-medium text-gray-800">{row.company}</td>
                <td className="p-4 text-bodyLg text-gray-700">{row.position}</td>
                <td className="p-4 text-bodyLg text-gray-700">{row.date}</td>
                <td className="p-4 text-bodyLg">
                  <span
                    className={`rounded-full border px-3 py-1 ${
                      (row.originalStatus || row.status) in StatusStyleMap
                        ? StatusStyleMap[(row.originalStatus || row.status) as Status]
                        : 'border-gray-400 bg-gray-100 text-gray-600'
                    }`}
                  >
                    {(row.originalStatus || row.status) in StatusLabelMap
                      ? StatusLabelMap[(row.originalStatus || row.status) as Status]
                      : row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
