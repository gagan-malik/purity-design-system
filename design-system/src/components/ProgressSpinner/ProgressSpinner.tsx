import React from "react";
import classNames from "classnames";
import { Loader } from "../Loader";

export interface ProgressSpinnerProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
  className?: string;
  testId?: string;
}

export const ProgressSpinner: React.FC<ProgressSpinnerProps> = ({
  label,
  size = "md",
  ariaLabel,
  className,
  testId = "progress-spinner",
}) => {
  return (
    <div
      className={classNames("inline-flex items-center gap-3", className)}
      data-testid={testId}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || label || "Loading"}
    >
      <Loader size={size} ariaLabel={ariaLabel || label || "Loading"} />
      {label && <span className="text-sm text-text-tertiary">{label}</span>}
    </div>
  );
};

export default ProgressSpinner;

