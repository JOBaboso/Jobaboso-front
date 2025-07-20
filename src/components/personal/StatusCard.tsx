import React from 'react';
import type { SVGProps, ReactElement } from 'react';

interface StatusCardProps {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ icon, label, value }) => {
  const styledIcon = React.cloneElement(icon, {
    className: 'w-[1.67vw] h-[1.67vw] text-gray-500',
  });

  return (
    <div className="flex h-[8.13vw] w-[17.92vw] flex-col justify-between rounded-[0.83vw] border border-gray-100 px-[1.25vw] py-[0.83vw] shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-[0.42vw] text-h2 text-gray-700">
        {styledIcon}
        {label}
      </div>
      <div className="flex h-full items-end justify-end">
        <span className="text-[2.08vw] font-semibold text-gray-700">{value}</span>
      </div>
    </div>
  );
};
