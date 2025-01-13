import React from "react";


interface ICardProps {
    title: string | React.ReactNode;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    onClickHandler?: () => void;
}

export default function Card({title, subtitle, icon, children, size = "md", onClickHandler, ...props }: ICardProps) {
   const titleTextClass = {
    "sm": "text-[10px]",
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
            {icon}
            <div className="flex flex-col">
                <span className={`${titleTextClass[size]} font-semibold text-text-secondary`}>{title}</span>
                <span className={`${subtitleTextClass[size]} font-regular text-text-tertiary`}>{subtitle}</span>
            </div>
        </div>
        {children}
    </div>
  );
}