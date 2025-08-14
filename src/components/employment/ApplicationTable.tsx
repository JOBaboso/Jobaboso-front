// components/ApplicationTable.tsx
import React from 'react';
import { Status, StatusStyleMap } from '@type/Status';

export interface ApplicationRow {
  id: number;
  company: string;
  position: string;
  date: string;
  status: Status;
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
                  <div className="h-6 w-6 rounded-full bg-gray-300" />
                  {row.company}
                </div>
              </td>
              <td className="p-4 text-gray-700">{row.position}</td>
              <td className="p-4 text-gray-700">{row.date}</td>
              <td className="p-4">
                <span className={`rounded-full border px-3 py-1 ${StatusStyleMap[row.status]}`}>
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
