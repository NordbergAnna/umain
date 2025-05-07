interface ITagProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

const Tag = ({ title, onClick, className }: ITagProps) => {
    const TagElement = onClick ? "button" : "div";

    return (
        <TagElement
        onClick={onClick}
        className={`py-2 px-3 text-body rounded-[88px] border border-stroke w-fit flex items-center z-30 ${className}`}>
            {(title === "Open" || title === "Closed") && (
                <span className={`h-2 w-2 flex rounded-full mr-1 ${title === "Open" ? "bg-green" : "bg-black"}`}></span>
            )}
            {title}
        </TagElement>
    );
}
export default Tag;