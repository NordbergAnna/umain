interface IButtonProps {
    primary?: boolean;
    text: string;
    onClick?: () => void;
    className?: string;
}

/** Functional button component - accepts primary?, text, onClick?, className? */
const Button = ({ primary, text, onClick, className }: IButtonProps) => {

    return (
        <button
            onClick={onClick}
            className={`
            ${primary ? "bg-green text-white" : "bg-transparent text-white border border-white"} 
            rounded-lg py-5 px-6 font-bold font-primary text-[16px] leading-[1] cursor-pointer
            ${className} 
            `}
        >
        {text}
      </button>
    );
}
export default Button;