import React from "react";
import classNames from "classnames";

export type ProgressBarSize = "xs" | "sm" | "md" | "lg";
export type ProgressBarTone = "brand" | "success" | "warning" | "danger" | "neutral";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * New API:
   * Current value.
   */
  value?: number;
  /**
   * New API:
   * Maximum value.
   * @default 100
   */
  max?: number;
  /**
   * New API:
   * Semantic tone of the fill.
   */
  tone?: ProgressBarTone;
  /**
   * Size (height) of the bar.
   */
  size?: ProgressBarSize;
  /**
   * Render the numeric label.
   */
  showLabel?: boolean;
  /**
   * Accessible label for screen readers (recommended).
   */
  ariaLabel?: string;

  /**
   * Back-compat (deprecated).
   * @deprecated Use `value`.
   */
  progress?: number;
}

export const ProgressBar = ({
  value,
  max = 100,
  tone = "brand",
  size = "sm",
  showLabel = false,
  ariaLabel,
  progress,
  className,
  ...rest
}: ProgressBarProps) => {
  const sizeClass = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }[size];

  const resolvedValue = typeof value === "number" ? value : typeof progress === "number" ? progress : 0;
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.max(0, Math.min(resolvedValue, safeMax));
  const percentage = (clamped / safeMax) * 100;

  const toneClass: Record<ProgressBarTone, string> = {
    brand: "bg-bg-brand-solid",
    success: "bg-success-solid",
    warning: "bg-warning-solid",
    danger: "bg-error-solid",
    neutral: "bg-bg-quaternary",
  };

  return (
    <div className={classNames("flex flex-row gap-2 items-center", className)} {...rest}>
      <div
        className={classNames("w-full bg-bg-quaternary rounded-full", sizeClass)}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
      >
        <div
          className={classNames("rounded-full", sizeClass, toneClass[tone])}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showLabel && <div className="text-text-secondary text-sm font-medium">{Math.round(percentage)}%</div>}
    </div>
  );
};