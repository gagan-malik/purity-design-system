import React from "react";
import classNames from "classnames";

export interface AspectRatioProps {
  /** Aspect ratio (width/height) */
  ratio?: number;
  /** Common aspect ratios */
  variant?: "square" | "video" | "wide" | "portrait" | "auto";
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const RATIOS = {
  square: 1,
  video: 16 / 9,
  wide: 21 / 9,
  portrait: 9 / 16,
};

/**
 * AspectRatio - Maintain aspect ratio container
 * Perfect for images, videos, and media containers
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  variant = "square",
  children,
  className = "",
  testId = "aspect-ratio",
}) => {
  const aspectRatio = ratio || RATIOS[variant] || 1;
  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={classNames("relative w-full", className)}
      data-testid={testId}
    >
      <div style={{ paddingBottom }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export default AspectRatio;

