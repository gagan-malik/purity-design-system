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
  ...rest
}) => {
  const tone = coerceTone({ tone: toneProp, color });
  const v = coerceVariant(variant);

  const isDisabled = disabled || loading;

  // Touch target size classes
  const touchSizeClass = minTouchSize === "large" ? "min-h-touch-lg min-w-touch-lg" : "min-h-touch min-w-touch";

  const sizeStyles: Record<ButtonSize, string> = {
    xs: "text-sm px-3 py-2 gap-1 h-8",
    sm: "text-sm px-3 py-2 gap-1",
    md: "text-sm px-[14px] py-[10px] gap-1",
    lg: "text-md px-[18px] py-3 gap-[6px]",
    // Back-compat: icon-only
    mini: "p-[10px] h-11 w-11",
  };

  const radius = shape === "circle" ? "rounded-full" : "rounded";

  const base =
    "inline-flex items-center justify-center font-semibold select-none transition-colors active:scale-[0.99] focus:outline-none";

  const disabledStyles = "bg-bg-disabled text-fg-disabled border border-border-disabled_subtle cursor-not-allowed";

  const stylesByTone: Record<ButtonTone, Record<"solid" | "outline" | "ghost" | "link", string>> = {
    brand: {
      solid:
        "bg-button-primaryBg hover:bg-button-primaryBgHover border border-button-primaryBorder hover:border-button-primaryBorderHover text-button-primaryFg hover:text-button-primaryFgHover focus:ring-4 focus:ring-button-ringBrandShadowSm",
      outline:
        "bg-button-secondaryColorBg hover:bg-button-secondaryColorBgHover border border-button-secondaryColorBorder hover:border-button-secondaryColorBorderHover text-button-secondaryColorFg hover:text-button-secondaryColorFgHover focus:ring-4 focus:ring-button-ringBrandShadowSm",
      ghost:
        "bg-transparent hover:bg-button-tertiaryColorBgHover text-button-tertiaryColorFg hover:text-button-tertiaryColorFgHover",
      link: "bg-transparent text-button-tertiaryColorFg hover:text-button-tertiaryColorFgHover underline underline-offset-4",
    },
    neutral: {
      solid:
        "bg-button-secondaryBg hover:bg-button-secondaryBgHover border border-button-secondaryBorder hover:border-button-secondaryBorderHover text-button-secondaryFg hover:text-button-secondaryFgHover focus:ring-4 focus:ring-button-ringGrayShadowSm",
      outline:
        "bg-transparent hover:bg-button-secondaryBgHover border border-button-secondaryBorder hover:border-button-secondaryBorderHover text-button-secondaryFg hover:text-button-secondaryFgHover focus:ring-4 focus:ring-button-ringGrayShadowSm",
      ghost: "bg-transparent hover:bg-button-tertiaryBgHover text-button-tertiaryFg hover:text-button-tertiaryFgHover",
      link: "bg-transparent text-button-tertiaryFg hover:text-button-tertiaryFgHover underline underline-offset-4",
    },
    danger: {
      solid:
        "bg-button-primaryErrorBg hover:bg-button-primaryErrorBgHover border border-button-primaryErrorBorder hover:border-button-primaryErrorBorderHover text-button-primaryFg hover:text-button-primaryFgHover focus:ring-4 focus:ring-button-ringErrorShadowSm",
      outline:
        "bg-button-secondaryErrorBg hover:bg-button-secondaryErrorBgHover border border-button-secondaryErrorBorder hover:border-button-secondaryErrorBorderHover text-button-secondaryErrorFg hover:text-button-secondaryErrorFgHover focus:ring-4 focus:ring-button-ringErrorShadowSm",
      ghost:
        "bg-transparent hover:bg-button-tertiaryErrorBgHover text-button-tertiaryErrorFg hover:text-button-tertiaryErrorFgHover",
      link: "bg-transparent text-button-tertiaryErrorFg hover:text-button-tertiaryErrorFgHover underline underline-offset-4",
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