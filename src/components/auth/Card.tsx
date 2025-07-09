import { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

const Card = ({ icon, title, description, children }: CardProps) => {
  return (
    <div className="flex flex-col w-[370px] h-[345px] p-[36px] bg-white border border-gray-50 rounded-[32px] shadow gap-6">
      {icon && (
        <div className="w-10 h-10 flex items-center justify-center text-mainBlue text-4xl">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-h2 text-gray-700">{title}</h3>
        <p className="text-bodyLg text-gray-700">{description}</p>
      </div>

      {children && (
        <div className="mt-[42px] ml-[187px]">
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
