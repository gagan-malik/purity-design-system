import React from "react";


interface ICardProps {
    title: string | React.ReactNode;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    onClickHandler?: () => void;
}

export function Card({title, subtitle, icon, children, size = "md", onClickHandler, ...props }: ICardProps) {
   const titleTextClass = {
    "sm": "text-sm",
    "md": "text-md",
    "lg": "text-lg"
   } 
   const subtitleTextClass = {
    "sm": "text-xs",
    "md": "text-sm",
    "lg": "text-md"
   }
  return (
    <div className={`flex justify-between items-center gap-2 px-4 py-2 rounded-5xl bg-bg-secondary hover:bg-bg-secondary_hover ${onClickHandler ? "cursor-pointer" : ""}`} onClick={onClickHandler} {...props}>
        <div className="flex flex-row gap-2 items-center">
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className={`${titleTextClass[size]} font-semibold text-text-secondary line-clamp-1`} title={typeof title === 'string' ? title : ''}>{title}</span>
                <span className={`${subtitleTextClass[size]} font-regular text-text-tertiary line-clamp-1`} title={typeof subtitle === 'string' ? subtitle : ''}>{subtitle}</span>
            </div>
        </div>
        <div className="flex-shrink-0">
            {children}
        </div>
    </div>
  );
}

export default Card;