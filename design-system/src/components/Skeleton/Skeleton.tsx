import React from "react";
import classNames from "classnames";

export interface SkeletonProps {
  /** Width of the skeleton */
  width?: string | number;
  /** Height of the skeleton */
  height?: string | number;
  /** Shape variant */
  variant?: "text" | "circular" | "rectangular";
  /** Number of lines (for text variant) */
  lines?: number;
  /** Animation speed */
  animation?: "pulse" | "wave" | "none";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Skeleton - Loading placeholder component
 * Shows content placeholders during data loading
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = "rectangular",
  lines = 1,
  animation = "pulse",
  className = "",
  testId = "skeleton",
}) => {
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-[shimmer_2s_infinite]",
    none: "",
  };

  const baseClasses = classNames(
    "bg-bg-secondary rounded",
    animationClasses[animation],
    className
  );

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2" data-testid={testId}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={classNames(
              baseClasses,
              index === lines - 1 ? "w-3/4" : "w-full"
            )}
            style={{
              height: height || "1rem",
            }}
          />
        ))}
      </div>
    );
  }

  const shapeClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  return (
    <div
      className={classNames(baseClasses, shapeClasses[variant])}
      style={{
        width: width || (variant === "circular" ? height || "40px" : "100%"),
        height: height || (variant === "circular" ? width || "40px" : "1rem"),
      }}
      data-testid={testId}
    />
  );
};

export default Skeleton;

