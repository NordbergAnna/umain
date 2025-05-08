interface IButtonProps {
    primary?: boolean;
    text: string;
    onClick?: () => void;
    className?: string;
}

const Button = ({ primary, text, onClick, className }: IButtonProps) => {

    return (
        <button
        onClick={onClick}
        className={`
          ${primary ? "bg-green-500 text-white" : "bg-transparent text-white border border-white"} 
          rounded-[8px] py-5 px-6 font-bold font-primary text-[16px] leading-[1]
          ${className} 
        `}
      >
        {text}
      </button>
    );
}
export default Button;