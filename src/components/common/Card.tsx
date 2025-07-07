import { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

const Card = ({ icon, title, description, children }: CardProps) => {
  return (
    <div className="flex flex-col w-[370px] h-[345px] px-6 py-8 bg-white border border-gray-50 rounded-[32px] shadow gap-6">
      {icon && <div className="text-mainBlue text-4xl">{icon}</div>}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
