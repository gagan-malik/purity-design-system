import React from "react";
import classNames from "classnames";

export const ASPECT_RATIOS = {
  /** 1:1 */
  square: 1,
  /** 4:3 */
  classic: 4 / 3,
  /** 3:2 */
  photo: 3 / 2,
  /** 16:10 */
  widescreen: 16 / 10,
  /** 16:9 */
  video: 16 / 9,
  /** 21:9 */
  wide: 21 / 9,
  /** 32:9 */
  ultrawide: 32 / 9,
  /** 9:16 */
  portrait: 9 / 16,
  /**
   * No enforced aspect ratio.
   * (Renders children normally; useful when you want a shared API but dynamic sizing.)
   */
  auto: 1,
} as const;

export type AspectRatioVariant = keyof typeof ASPECT_RATIOS;

export interface AspectRatioProps {
  /** Aspect ratio (width/height) */
  ratio?: number;
  /** Common aspect ratios */
  variant?: AspectRatioVariant;
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

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
  // If "auto" and no explicit ratio: don't enforce a ratio.
  if (variant === "auto" && typeof ratio !== "number") {
    return (
      <div className={classNames("w-full", className)} data-testid={testId}>
        {children}
      </div>
    );
  }

  const aspectRatio = typeof ratio === "number" ? ratio : ASPECT_RATIOS[variant] ?? 1;
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

