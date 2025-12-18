import classNames from "classnames";
import React from "react";

export type BadgeTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info" | "gradient" | "custom";
export type BadgeVariant = "solid" | "soft" | "outline";
export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style.
   * - soft: subtle background (default)
   * - solid: strong background
   * - outline: no background
   *
   * Back-compat (deprecated):
   * - filled ~= soft (or solid for some tones)
   * - outlined ~= outline
   */
  variant?: BadgeVariant | "filled" | "outlined";
  /**
   * Semantic tone.
   */
  tone?: BadgeTone;
  size?: BadgeSize;
  /**
   * Status dot.
   */
  dot?: boolean;
  /**
   * Icon slots. Prefer these over `icon`.
   */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Back-compat props (deprecated).
   * @deprecated Use `tone` instead.
   */
  color?: "default" | "primary" | "important" | "added" | "transparent" | "counter" | "gradient" | "success" | "custom";
  /**
   * @deprecated Use `leftIcon`/`rightIcon` with ReactNode.
   */
  icon?: string;
  /**
   * @deprecated Use `leftIcon`/`rightIcon`.
   */
  imagePlacement?: "left" | "right";
  /**
   * @deprecated Prefer `className`. This is kept for backward compatibility.
   */
  customClass?: {
    filled?: string;
    outlined?: string;
    dotBg?: string;
  };
  /**
   * Whether to render a border around the badge.
   * @default true
   */
  border?: boolean;
}

function coerceTone(props: BadgeProps): BadgeTone {
  if (props.tone) return props.tone;
  switch (props.color) {
    case "primary":
      return "brand";
    case "added":
    case "success":
      return "success";
    case "important":
      return "danger";
    case "gradient":
      return "gradient";
    case "custom":
      return "custom";
    case "transparent":
    case "default":
    case "counter":
    default:
      return "neutral";
  }
}

function coerceVariant(props: BadgeProps): BadgeVariant {
  if (props.variant === "solid" || props.variant === "soft" || props.variant === "outline") return props.variant;

  // Back-compat: filled ~= soft (except counters/gradients which are effectively solid)
  const legacy = props.variant;
  if (legacy === "outlined") return "outline";
  if (props.color === "counter" || props.color === "gradient") return "solid";
  return "soft";
}

function coerceDot(props: BadgeProps): boolean {
  if (typeof props.dot === "boolean") return props.dot;
  // Back-compat
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Boolean((props as any).showDot);
}

export const Badge: React.FC<BadgeProps> = ({
  // new API
  variant,
  tone: _tone,
  size = "sm",
  dot: _dot,
  leftIcon,
  rightIcon,

  // back-compat API
  color = "default",
  icon,
  imagePlacement = "left",
  customClass,
  border = true,

  className,
  children,
  ...rest
}) => {
  const tone = coerceTone({ tone: _tone, color, ...rest } as BadgeProps);
  const resolvedVariant = coerceVariant({ variant, color, ...rest } as BadgeProps);
  const dot = coerceDot({ dot: _dot, ...rest } as BadgeProps);

  const base = "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap";

  const sizeStyles: Record<BadgeSize, string> = {
    xs: "py-0.5 px-2 text-xxs gap-1",
    sm: "py-[2px] px-2 text-xs gap-1",
    md: "py-[2px] px-2.5 text-sm gap-1.5",
    lg: "py-1 px-3 text-sm gap-1.5",
  };

  const tones: Record<BadgeTone, { soft: string; solid: string; outline: string; dot: string }> = {
    neutral: {
      soft: `text-text-secondary bg-bg-disabled ${border ? "border border-solid border-utility-gray-200" : ""}`,
      solid: `text-text-white bg-utility-gray-700 ${border ? "border border-solid border-utility-gray-700" : ""}`,
      outline: `text-text-secondary ${border ? "border border-solid border-utility-gray-200" : ""}`,
      dot: "bg-utility-gray-500",
    },
    brand: {
      soft: `text-utility-brand-700 bg-utility-brand-50 ${border ? "border border-solid border-utility-brand-200" : ""}`,
      solid: `text-text-white bg-brand-600 ${border ? "border border-solid border-brand-600" : ""}`,
      outline: `text-utility-brand-700 ${border ? "border border-solid border-utility-brand-200" : ""}`,
      dot: "bg-utility-brand-500",
    },
    success: {
      soft: `text-utility-success-700 bg-utility-success-50 ${border ? "border border-solid border-utility-success-200" : ""}`,
      solid: `text-text-white bg-bg-success-solid ${border ? "border border-solid border-bg-success-solid" : ""}`,
      outline: `text-bg-success-solid ${border ? "border border-solid border-bg-success-solid" : ""}`,
      dot: "bg-utility-success-500",
    },
    warning: {
      soft: `text-text-warning-primary bg-warning-50 ${border ? "border border-solid border-warning-200" : ""}`,
      solid: `text-text-white bg-warning-600 ${border ? "border border-solid border-warning-600" : ""}`,
      outline: `text-text-warning-primary ${border ? "border border-solid border-warning-200" : ""}`,
      dot: "bg-warning-500",
    },
    danger: {
      soft: `text-utility-error-700 bg-utility-error-50 ${border ? "border border-solid border-utility-error-200" : ""}`,
      solid: `text-text-white bg-utility-error-600 ${border ? "border border-solid border-utility-error-600" : ""}`,
      outline: `text-utility-error-700 ${border ? "border border-solid border-utility-error-200" : ""}`,
      dot: "bg-utility-error-500",
    },
    info: {
      soft: `text-blue-700 bg-blue-50 ${border ? "border border-solid border-blue-200" : ""}`,
      solid: `text-text-white bg-blue-600 ${border ? "border border-solid border-blue-600" : ""}`,
      outline: `text-blue-700 ${border ? "border border-solid border-blue-200" : ""}`,
      dot: "bg-blue-500",
    },
    gradient: {
      soft: "text-text-white bg-gradient",
      solid: "text-text-white bg-gradient",
      outline: `text-gradient ${border ? "border border-solid border-bg-gradient" : ""}`,
      dot: "bg-gradient",
    },
    custom: {
      soft: customClass?.filled || "",
      solid: customClass?.filled || "",
      outline: customClass?.outlined || "",
      dot: customClass?.dotBg || "bg-utility-gray-500",
    },
  };

  const resolved = tones[tone][resolvedVariant];

  const resolvedLeftIcon =
    leftIcon ||
    (icon && imagePlacement === "left" ? <img src={icon} alt="" aria-hidden className="h-4 w-4" /> : null);
  const resolvedRightIcon =
    rightIcon ||
    (icon && imagePlacement === "right" ? <img src={icon} alt="" aria-hidden className="h-4 w-4" /> : null);

  return (
    <span className={classNames(base, sizeStyles[size], resolved, className)} {...rest}>
      {dot ? <span className={classNames("h-2 w-2 rounded-full", tones[tone].dot)} aria-hidden /> : null}
      {resolvedLeftIcon ? <span className="inline-flex items-center" aria-hidden>{resolvedLeftIcon}</span> : null}
      <span>{children}</span>
      {resolvedRightIcon ? <span className="inline-flex items-center" aria-hidden>{resolvedRightIcon}</span> : null}
    </span>
  );
};

export interface CountBadgeProps extends Omit<BadgeProps, "children" | "dot" | "icon" | "leftIcon" | "rightIcon"> {
  count: number;
  max?: number;
  showZero?: boolean;
  /**
   * Required for screen readers when rendering counts (e.g. "3 notifications").
   */
  ariaLabel: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  showZero = false,
  ariaLabel,
  tone = "danger",
  variant = "solid",
  size = "xs",
  ...rest
}) => {
  const shouldShow = showZero ? count >= 0 : count > 0;
  if (!shouldShow) return null;

  const display = count > max ? `${max}+` : String(count);
  return (
    <Badge tone={tone} variant={variant} size={size} {...rest} aria-label={ariaLabel}>
      {display}
    </Badge>
  );
};

export default Badge;
