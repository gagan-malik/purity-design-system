import React from "react";
import classNames from "classnames";
import { ReactPopover, PopoverPlacement } from "../MenuPopover/Popover";

export type ButtonTone = "brand" | "neutral" | "danger";
export type ButtonVariant = "filled" | "outlined" | "solid" | "outline" | "ghost" | "link";
// Back-compat type exports
export type ButtonColor = "primary" | "secondary" | "destructive" | "label" | "gradient";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "mini";
export type ButtonShape = "circle" | "square";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * New API:
   * - solid/outline/ghost/link
   * Back-compat:
   * - filled ~= solid
   * - outlined ~= outline
   */
  variant?: ButtonVariant;
  /**
   * New API: semantic intent.
   */
  tone?: ButtonTone;
  /**
   * Back-compat color mapping. Prefer `tone`.
   */
  color?: ButtonColor;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /**
   * Back-compat icon prop (deprecated).
   * @deprecated Prefer startIcon/endIcon.
   */
  imgSrc?: string;
  /**
   * Back-compat alignment (deprecated).
   * @deprecated Prefer startIcon/endIcon.
   */
  imagePlacement?: "left" | "right";
  /**
   * Loading state.
   */
  loading?: boolean;
  loadingText?: string;
  spinnerPlacement?: "start" | "end";
  /**
   * Tooltip content displayed when disabled (hover + focus).
   */
  disabledReason?: string;
  /** Mobile: Minimum touch target size */
  minTouchSize?: "default" | "large"; // 44px or 48px
  /** Mobile: Enable haptic feedback (if available) */
  hapticFeedback?: boolean;
  /**
   * Render the styles onto a child element (e.g. <a>).
   * Requires a single React element child.
   */
  asChild?: boolean;
}

const Spinner = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={classNames("inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin", className)}
  />
);

function ariaLabelFallback(labelNode: React.ReactNode): string {
  if (typeof labelNode === "string") return labelNode;
  if (typeof labelNode === "number") return String(labelNode);
  return "Button";
}

function coerceTone({ tone, color }: Pick<ButtonProps, "tone" | "color">): ButtonTone {
  if (tone) return tone;
  if (color === "destructive") return "danger";
  if (color === "secondary" || color === "label") return "neutral";
  return "brand";
}

function coerceVariant(variant: ButtonVariant | undefined): "solid" | "outline" | "ghost" | "link" {
  if (!variant) return "solid";
  if (variant === "filled") return "solid";
  if (variant === "outlined") return "outline";
  return variant;
}

/**
 * Button component rewritten using shadcn patterns with design system tokens.
 * 
 * Uses design system tokens for:
 * - Spacing: var(--spacing-xs), var(--spacing-sm), var(--spacing-md), etc.
 * - Radius: var(--radius-sm), var(--radius-md), var(--radius-lg), etc.
 * - Shadows: var(--shadow-sm), var(--shadow-md), etc.
 * - Typography: font sizes, weights, line heights
 * - Colors: semantic tokens (--bg-brand-solid, --text-primary, --border-primary, etc.)
 */
export const Button: React.FC<ButtonProps> = ({
  variant,
  tone: toneProp,
  color = "primary",
  size = "md",
  shape = "square",
  fullWidth = false,
  startIcon,
  endIcon,
  imgSrc,
  imagePlacement = "left",
  loading = false,
  loadingText,
  spinnerPlacement = "start",
  disabledReason,
  disabled = false,
  minTouchSize = "default",
  hapticFeedback = false,
  asChild = false,
  className,
  children,
  type,
  onClick,
  style,
  ...rest
}) => {
  const tone = coerceTone({ tone: toneProp, color });
  const v = coerceVariant(variant);

  const isDisabled = disabled || loading;

  // Touch target size classes using design system tokens
  const touchSizeClass = minTouchSize === "large" ? "min-h-touch-lg min-w-touch-lg" : "min-h-touch min-w-touch";

  // Size styles using design system spacing tokens via Tailwind classes
  // All spacing values map to CSS variables: --spacing-xs, --spacing-sm, etc.
  const sizeStyles: Record<ButtonSize, string> = {
    xs: "text-sm px-3 py-2 gap-1 h-8", // Uses spacing tokens via Tailwind config
    sm: "text-sm px-3 py-2 gap-1",
    md: "text-sm px-[14px] py-[10px] gap-1", // Custom values that approximate spacing tokens
    lg: "text-base px-[18px] py-3 gap-[6px]",
    mini: "p-3 h-11 w-11", // Icon-only button
  };

  // Radius using design system tokens via Tailwind classes
  const radius = shape === "circle" ? "rounded-full" : "rounded-md"; // rounded-md uses --radius-md

  // Base classes using design system tokens
  const base =
    "inline-flex items-center justify-center font-semibold select-none transition-all duration-150 ease-in-out active:scale-[0.98] focus-visible:outline-none";

  // Disabled styles using design system tokens
  const disabledStyles = "bg-bg-disabled text-fg-disabled border border-border-disabled_subtle cursor-not-allowed opacity-50";

  // Variant styles using design system semantic tokens
  // All colors, borders, shadows use CSS variables defined in tailwind-theme.css
  const stylesByTone: Record<ButtonTone, Record<"solid" | "outline" | "ghost" | "link", string>> = {
    brand: {
      solid:
        "bg-bg-brand-solid hover:bg-bg-brand-solid_hover border border-bg-brand-solid hover:border-bg-brand-solid_hover text-text-primary_on_brand hover:text-text-primary_on_brand shadow-sm hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring-brand-shadow-sm",
      outline:
        "bg-transparent hover:bg-bg-brand-primary border border-border-brand_solid hover:border-bg-brand-solid_hover text-fg-brand-primary hover:text-fg-brand-primary focus-visible:ring-4 focus-visible:ring-ring-brand-shadow-sm",
      ghost:
        "bg-transparent hover:bg-bg-brand-primary text-fg-brand-primary hover:text-fg-brand-primary",
      link: "bg-transparent text-fg-brand-primary hover:text-fg-brand-primary underline underline-offset-1 p-0",
    },
    neutral: {
      solid:
        "bg-bg-secondary_solid hover:bg-bg-secondary_hover border border-border-primary hover:border-border-secondary text-text-primary hover:text-text-primary shadow-sm hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring-gray-shadow-sm",
      outline:
        "bg-transparent hover:bg-bg-secondary border border-border-primary hover:border-border-secondary text-fg-primary hover:text-fg-primary focus-visible:ring-4 focus-visible:ring-ring-gray-shadow-sm",
      ghost: "bg-transparent hover:bg-bg-secondary text-fg-primary hover:text-fg-primary",
      link: "bg-transparent text-fg-primary hover:text-fg-primary underline underline-offset-1 p-0",
    },
    danger: {
      solid:
        "bg-bg-error-solid hover:bg-error-700 border border-bg-error-solid hover:border-error-700 text-text-primary_on_brand hover:text-text-primary_on_brand shadow-sm hover:shadow-md focus-visible:ring-4 focus-visible:ring-ring-error-shadow-sm",
      outline:
        "bg-transparent hover:bg-bg-error-primary border border-border-error_solid hover:border-error-700 text-fg-error-primary hover:text-fg-error-primary focus-visible:ring-4 focus-visible:ring-ring-error-shadow-sm",
      ghost:
        "bg-transparent hover:bg-bg-error-primary text-fg-error-primary hover:text-fg-error-primary",
      link: "bg-transparent text-fg-error-primary hover:text-fg-error-primary underline underline-offset-1 p-0",
    },
  };

  const resolvedVisual = isDisabled ? disabledStyles : stylesByTone[tone][v];

  const layout = classNames(
    base,
    radius,
    sizeStyles[size],
    touchSizeClass,
    fullWidth && "w-full",
    resolvedVisual,
    className
  );

  const resolvedStartIcon =
    startIcon ||
    (imgSrc && imagePlacement === "left" ? <img src={imgSrc} alt="" aria-hidden className="h-4 w-4" /> : null);
  const resolvedEndIcon =
    endIcon ||
    (imgSrc && imagePlacement === "right" ? <img src={imgSrc} alt="" aria-hidden className="h-4 w-4" /> : null);

  const showSpinner = loading;
  const spinner = <Spinner />;

  const childElement = asChild && React.isValidElement(children) ? (children as React.ReactElement<any>) : null;
  const labelNode = childElement ? childElement.props?.children : children;

  const content =
    size === "mini" ? (
      <>
        {showSpinner ? spinner : resolvedStartIcon || resolvedEndIcon || childElement?.props?.children || null}
        <span className="sr-only">{typeof labelNode === "string" ? labelNode : ariaLabelFallback(labelNode)}</span>
      </>
    ) : (
      <>
        {spinnerPlacement === "start" && showSpinner ? spinner : resolvedStartIcon}
        <span>{loading && loadingText ? loadingText : labelNode}</span>
        {spinnerPlacement === "end" && showSpinner ? spinner : resolvedEndIcon}
      </>
    );

  const handleClick: React.MouseEventHandler<any> = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (hapticFeedback && typeof navigator !== "undefined" && "vibrate" in navigator) {
      // light tap
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).vibrate?.(10);
    }
    onClick?.(e);
  };

  const buttonEl = childElement ? (
    React.cloneElement(childElement, {
      ...(childElement.props || {}),
      className: classNames(layout, childElement.props?.className),
      style: style,
      onClick: handleClick,
      children: content,
      "aria-disabled": isDisabled ? true : undefined,
      tabIndex: isDisabled ? -1 : childElement.props?.tabIndex,
      "data-disabled-reason": disabledReason || undefined,
    })
  ) : (
    <button
      type={type || "button"}
      className={layout}
      style={style}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </button>
  );

  if (!disabledReason) return buttonEl;

  return (
    <ReactPopover
      content={<div className="p-3 text-sm text-text-primary">{disabledReason}</div>}
      trigger="hover"
      placement={PopoverPlacement.right}
      width="240px"
    >
      {buttonEl as any}
    </ReactPopover>
  );
};

export interface IconButtonProps extends Omit<ButtonProps, "children" | "size"> {
  icon: React.ReactNode;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, ariaLabel, ...props }) => {
  return (
    <Button
      {...props}
      size="mini"
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
};
