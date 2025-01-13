import React from "react";

interface IProgressBarProps {
  size: "xs" | "sm" | "md" | "lg";
  progress: number;
  showLabel?: boolean;
}

export const ProgressBar = ({ progress, size = "sm", showLabel = false }: IProgressBarProps) => {
  const sizeClass = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];
  return (
    <div className="flex flex-row gap-2 items-center">
          <div className={`w-full bg-bg-quaternary rounded-full ${sizeClass}`}>
      <div
        className={`bg-bg-brand-solid rounded-full ${sizeClass}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>

{showLabel && <div className="text-text-secondary text-sm font-medium">{progress}%</div>}

    </div>

  );
};