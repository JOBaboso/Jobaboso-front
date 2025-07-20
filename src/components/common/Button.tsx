interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, className = '', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-[42px] w-[103px] items-center justify-center gap-2 rounded-[12px] bg-mainBlue text-h4 font-medium leading-none text-white transition hover:bg-subDarkBlue ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
