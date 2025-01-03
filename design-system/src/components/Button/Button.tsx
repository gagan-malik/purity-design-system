import React from "react";
import { ReactPopover, PopoverPlacement } from "../MenuPopover/Popover";

export type ButtonHierarchy = "primary" | "secondary" | "tertiary" | "link" | "gradient";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonShape = "rounded" | "square";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  buttonColor?: string;
  textColor?: string;
  iconLeadingSrc?: string;
  iconTrailingSrc?: string;
  iconOnly?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  hierarchy = "primary",
  size = "md",
  shape = "rounded",
  disabled = false,
  buttonColor,
  textColor,
  iconLeadingSrc,
  iconTrailingSrc,
  children,
  iconOnly = false,
  ...props
}) => {
  const buttonBackground = {
    primary: buttonColor || "bg-blue-600 hover:bg-blue-700 focus:bg-blue-600 text-text-white focus:ring-blue-400",
    secondary: buttonColor || "bg-secondary-500 hover:bg-secondary-600 focus:bg-secondary-600",
    tertiary: buttonColor || "bg-tertiary-500 hover:bg-tertiary-600",
    link: buttonColor || "bg-link-500 hover:bg-link-600",
    gradient: buttonColor || "bg-gradient ",
  };
  const buttonBackgroundDisabled = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    tertiary: "bg-tertiary-500",
    link: "bg-link-500",
    gradient: "bg-gradient-to-r from-primary-500 to-secondary-500",
  };
  const buttonBorder = {
    primary: "border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500",
    secondary: "border-secondary-500 focus:outline-none focus:ring-4 focus:ring-secondary-500",
    tertiary: "",
    link: "",
    gradient: "border-gradient-to-r from-primary-500 to-secondary-500 focus:outline-none focus:ring-4 focus:ring-gradient-to-r from-primary-500 to-secondary-500",
  };
  const buttonBorderDisabled = {
    primary: "border-primary-500",
    secondary: "border-secondary-500",
    tertiary: "",
    link: "",
    gradient: "border-gradient-to-r from-primary-500 to-secondary-500",
  };  

  const buttonTextColor = {
    primary: textColor || "text-primary-500",
    secondary: textColor || "text-secondary-500",
    tertiary: textColor || "text-tertiary-500",
    link: textColor || "text-link-500",
    gradient: textColor || "text-gradient-to-r from-primary-500 to-secondary-500",
  };

  const buttonTextColorDisabled = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    tertiary: "text-tertiary-500",
    link: "text-link-500",
    gradient: "text-gradient-to-r from-primary-500 to-secondary-500",
  };
  const buttonSize = {
    xs: "text-sm px-3 py-2 gap-1",
    sm: "text-sm px-3 py-2 gap-1",
    md: "text-sm px-[14px] py-[10px] gap-1",
    lg: "text-md px-[14px] py-[10px] gap-[6px]",
    xl: "text-md px-[18px] py-3  gap-[6px]",
    "2xl": "text-lg px-[22px] py-4  gap-[10px]",
  };
  const buttonSizeIconOnly = {
    xs: "p-2",
    sm: "p-2",
    md: "p-[10px]",
    lg: "p-3",
    xl: "p-[14px]",
    "2xl": "p-4",
  };

  const buttonShape = {
    rounded: "rounded-full",
    square: "rounded-none",
  };

  const buttonStyles = `flex items-center justify-center font-semibold ${
    buttonShape[shape]
  } ${iconOnly ? buttonSizeIconOnly[size] : buttonSize[size]} ${
    disabled ? buttonBackgroundDisabled[hierarchy] : buttonBackground[hierarchy]
  } ${
    disabled ? buttonTextColorDisabled[hierarchy] : buttonTextColor[hierarchy]
  } ${disabled ? buttonBorderDisabled[hierarchy] : buttonBorder[hierarchy]}`;

  return (
    <button className={buttonStyles} disabled={disabled} {...props}>
      {iconLeadingSrc && <img src={iconLeadingSrc} />}
      <div>{children}</div>
      {iconTrailingSrc && <img src={iconTrailingSrc} />}
    </button>
  );
};
