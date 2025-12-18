import React from "react";
import classNames from "classnames";

export const ASPECT_RATIOS = {
  /** 1:1 */
  square: 1,
  /** 4:5 */
  story: 4 / 5,
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
  /** 2.39:1 (cinema) */
  cinema: 2.39,
  /** 3:1 */
  banner: 3,
  /** A4 portrait (210/297) */
  a4: 210 / 297,
  /** A4 landscape (297/210) */
  a4Landscape: 297 / 210,
  /** 9:16 */
  portrait: 9 / 16,
  /**
   * No enforced aspect ratio.
   * (Renders children normally; useful when you want a shared API but dynamic sizing.)
   */
  auto: 1,
} as const;

export type AspectRatioVariant = keyof typeof ASPECT_RATIOS;

type RatioInput = number | `${number}/${number}`;

export interface AspectRatioProps {
  /**
   * Aspect ratio (width/height).
   * Accepts a number (e.g. 16/9) or a string fraction (e.g. "16/9").
   */
  ratio?: RatioInput;
  /** Common aspect ratios */
  variant?: AspectRatioVariant;
  /**
   * Apply the aspect-ratio styles to the child element instead of wrapping.
   * Requires a single React element child.
   */
  asChild?: boolean;
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

function parseRatio(ratio?: RatioInput): number | undefined {
  if (typeof ratio === "number") return ratio;
  if (typeof ratio !== "string") return undefined;
  const m = ratio.trim().match(/^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/);
  if (!m) return undefined;
  const w = Number(m[1]);
  const h = Number(m[2]);
  if (!Number.isFinite(w) || !Number.isFinite(h) || h === 0) return undefined;
  return w / h;
}

/**
 * AspectRatio - Maintain aspect ratio container
 * Perfect for images, videos, and media containers
 */
export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  variant = "square",
  asChild = false,
  children,
  className = "",
  testId = "aspect-ratio",
}) => {
  const parsed = parseRatio(ratio);

  // If "auto" and no explicit ratio: don't enforce a ratio.
  if (variant === "auto" && typeof parsed !== "number") {
    return (
      <div className={classNames("w-full", className)} data-testid={testId}>
        {children}
      </div>
    );
  }

  const numericRatio = typeof parsed === "number" ? parsed : ASPECT_RATIOS[variant] ?? 1;

  // Prefer native CSS aspect-ratio when available; fallback to legacy padding technique.
  const supportsAspectRatio =
    typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("aspect-ratio: 1");

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    const mergedStyle = {
      ...(child.props.style || {}),
      ...(supportsAspectRatio ? { aspectRatio: String(numericRatio) } : null),
    };

    return React.cloneElement(child, {
      ...child.props,
      style: mergedStyle,
      className: classNames("w-full", child.props.className, className),
      "data-testid": testId,
    });
  }

  const paddingBottom = `${(1 / numericRatio) * 100}%`;

  return (
    <div
      className={classNames("relative w-full", className)}
      data-testid={testId}
      style={supportsAspectRatio ? ({ aspectRatio: String(numericRatio) } as React.CSSProperties) : undefined}
    >
      {!supportsAspectRatio && <div style={{ paddingBottom }} />}
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export default AspectRatio;

