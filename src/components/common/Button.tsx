interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className = "", onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 w-[103px] h-[42px] bg-mainBlue text-white rounded-[12px] text-h4 font-medium leading-none hover:bg-subDarkBlue transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
