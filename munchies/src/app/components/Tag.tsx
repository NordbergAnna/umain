interface ITagProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

/** Functional component for displaying a tag that can optionally act as a button */
const Tag = ({ title, onClick, className }: ITagProps) => {
    const TagElement = onClick ? "button" : "div"; // Determine the HTML element to use: <button> if clickable, otherwise <div>

    return (
        <TagElement
        onClick={onClick}
        className={`text-body border-[0.6px] border-stroke w-fit flex items-center z-30 ${className}`}>
            {(title === "Open" || title === "Closed") && (
                <span className={`h-2 w-2 flex rounded-full mr-1 ${title === "Open" ? "bg-green" : "bg-black"}`}></span>
            )}
            {title}
        </TagElement>
    );
}
export default Tag;