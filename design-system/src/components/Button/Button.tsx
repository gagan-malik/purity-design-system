import React from "react";
import { ReactPopover, PopoverPlacement } from "../MenuPopover/Popover";

export type ButtonVariant = "filled" | "outlined";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "destructive"
  | "label"
  | "gradient";
export type ButtonSize = "sm" | "md" | "lg" | "mini";
export type ButtonShape = "circle" | "square";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  imgSrc?: string;
  disabledReason?: string;
  imagePlacement?: "left" | "right";
  shape?: ButtonShape;
  border?: boolean;
  textColor?: string;
  /** Mobile: Minimum touch target size */
  minTouchSize?: "default" | "large"; // 44px or 48px
  /** Mobile: Enable haptic feedback (if available) */
  hapticFeedback?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  color = "primary",
  size = "md",
  imgSrc,
  children,
  disabledReason,
  disabled = false,
  imagePlacement = "left",
  shape = "square",
  border = true,
  textColor="text-text-secondary",
  minTouchSize = "default",
  hapticFeedback = false,
  ...props
}) => {
    const baseStyles = {
    primary: "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
    secondary: "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
    destructive: "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
    label: "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-0",
    gradient: "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2",
  }
  const sizeStyles = {
    sm: "py-1 px-2 text-sm min-h-touch",
    md: "py-2 px-3 min-h-touch",
    lg: "py-3 px-6 text-lg min-h-touch-lg",
    mini: "py-1 px-2 h-11 w-11 min-h-touch min-w-touch",
  };
  const colorStyles = {
    primary: {
      filled: disabled
        ? "bg-bg-primary_hover text-fg-disabled"
        : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-600 text-text-white focus:ring-blue-400",
      outlined: disabled
        ? "bg-transparent text-fg-disabled border-gray-200 border"
        : `bg-transparent hover:bg-blue-50 text-blue-700 ${
            border && " border-blue-300 border"
          } focus:ring-blue-400`,
    },
    secondary: {
      filled: disabled
        ? "bg-transparent text-fg-disabled"
        : "bg-transparent hover:bg-bg-secondary_hover text-text-primary focus:ring-gray-400 border border-border-secondary",
      outlined: disabled
        ? "bg-transparent text-fg-disabled"
        : "bg-transparent hover:bg-bg-secondary_hover text-fg-tertiary",
    },
    destructive: {
      filled: disabled
        ? "bg-bg-disabled text-fg-disabled"
        : "bg-error-600 hover:bg-error-700 focus:bg-error-600 text-text-white focus:ring-error-400",
      outlined: disabled
        ? "bg-transparent text-fg-disabled border border-gray-200"
        : "bg-transparent hover:bg-error-100 border border-error-300 text-error-700 focus:ring-error-400",
    },
    label: {
      filled: disabled
        ? "bg-gray-50 text-gray-600"
        : `bg-gray-200 hover:bg-bg-secondary_hover ${textColor ? textColor : "text-text-secondary"} focus:ring-bg-secondary_hover`,
      outlined: disabled
        ? "bg-transparent text-gray-600 border"
        : `bg-transparent hover:bg-bg-secondary_hover ${textColor ? textColor : "text-text-secondary"} focus:ring-bg-secondary_hover focus:ring-offset-0`,
    },
    gradient: {
      filled: disabled
        ? "bg-gray-50 text-gray-600"
        : "bg-gradient text-text-white",
      outlined: disabled
        ? "bg-transparent text-gray-600 border-gradient-light"
        : "bg-transparent text-bg-gradient hover:bg-gradient hover:text-text-white focus:ring-gradient",
    },
  };

  const imgStyles = {
    primary: {
      filled: "fill-base-white",
      outlined: "fill-blue-500",
    },
    secondary: {
      filled: "fill-base-white",
      outlined: "fill-gray-500",
    },
    destructive: {
      filled: "fill-base-white",
      outlined: "fill-error-600",
    },
    label: {
      filled: "fill-base-white",
      outlined: "fill-gray-500",
    },
    gradient: {
      filled: "fill-base-white",
      outlined: "fill-gray-500",
    },
  };

  const alignStyle = {
    left: "space-x-2",
    right: "space-x-4 space-x-reverse flex-row-reverse",
  };

  const buttonShape = {
    circle: "rounded-full",
    square: "rounded",
  };
  
  // Touch target size classes
  const touchSizeClass = minTouchSize === "large" ? "min-h-touch-lg min-w-touch-lg" : "";
  
  const buttonStyles = `${baseStyles[color]} ${colorStyles[color][variant]} ${sizeStyles[size]} ${alignStyle[imagePlacement]} ${buttonShape[shape]} ${touchSizeClass} flex flex-column items-center justify-center active:scale-95 transition-transform`;
  const imageStyles = `${imgStyles[color][variant]}`;

  return disabledReason ? (
    <ReactPopover
      content={<div>{disabledReason}</div>} 
      trigger="hover"
      placement={PopoverPlacement.right}
      width="200px"
    >
      <button className={buttonStyles} disabled={disabled} {...props}>
        {imgSrc && <img src={imgSrc} className={imageStyles} />}
        {size !== "mini" && children && <div>{children}</div>}
      </button>
    </ReactPopover>
  ) : (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {imgSrc && <img src={imgSrc} className={imageStyles} />}
      {size !== "mini" && children && <div>{children}</div>}
    </button>
  );
};