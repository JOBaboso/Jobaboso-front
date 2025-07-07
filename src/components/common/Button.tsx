interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className = "", onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-[103px] h-[42px] px-[20px] py-[7px] bg-mainBlue text-white rounded-[12px] text-sm font-medium hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
