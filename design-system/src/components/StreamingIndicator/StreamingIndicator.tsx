import React from "react";
import classNames from "classnames";

export interface StreamingIndicatorProps {
  /** Label displayed next to dots */
  label?: string;
  /** Compact mode */
  size?: "sm" | "md";
  /** Container className */
  className?: string;
  /** Test id */
  testId?: string;
  /** Accessible label override */
  ariaLabel?: string;
}

export const StreamingIndicator: React.FC<StreamingIndicatorProps> = ({
  label = "Generating",
  size = "md",
  className,
  testId = "streaming-indicator",
  ariaLabel,
}) => {
  const dot = size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";
  const text = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={classNames("inline-flex items-center gap-2 text-text-tertiary", text, className)}
      data-testid={testId}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || label}
    >
      <span>{label}</span>
      <span className="inline-flex items-center gap-1" aria-hidden="true">
        <span className={classNames("rounded-full bg-text-tertiary animate-pulse", dot)} />
        <span className={classNames("rounded-full bg-text-tertiary animate-pulse", dot)} style={{ animationDelay: "150ms" }} />
        <span className={classNames("rounded-full bg-text-tertiary animate-pulse", dot)} style={{ animationDelay: "300ms" }} />
      </span>
    </div>
  );
};

export default StreamingIndicator;

