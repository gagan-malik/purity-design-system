import React from "react";

export type ButtonV2Hierarchy = "primary" | "secondary" | "tertiary" | "link" | "gradient" | "custom";
export type ButtonV2Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonV2Shape = "rounded" | "square";
export type ButtonV2Variant = "primary" | "destructive";
export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hierarchy?: ButtonV2Hierarchy;
  size?: ButtonV2Size;
  shape?: ButtonV2Shape;
  variant?: ButtonV2Variant;
  disabled?: boolean;
  buttonColor?: string;
  textColor?: string;
  customBorderColor?: string;
  iconLeadingSrc?: string;
  iconTrailingSrc?: string;
  iconOnly?: boolean;
}

export const ButtonV2: React.FC<IButtonProps> = ({
  hierarchy = "primary",
  size = "md",
  shape = "rounded",
  disabled = false,
  buttonColor,
  textColor,
  customBorderColor,
  iconLeadingSrc,
  iconTrailingSrc,
  children,
  iconOnly = false,
  variant = "primary",
  ...props
}) => {
  const buttonBackground = {
    primary : {
      primary: buttonColor || "bg-button-primaryBg hover:bg-button-primaryBgHover focus:ring-4 focus:ring-button-ringBrandShadowSm",
    secondary: buttonColor || "bg-button-secondaryBg hover:bg-button-secondaryBgHover focus:ring-4  focus:ring-button-ringGrayShadowSm",
    tertiary: buttonColor || "bg-button-tertiaryBg hover:bg-button-tertiaryBgHover",
    link: buttonColor || "bg-link-500 hover:bg-link-600",
    gradient: buttonColor || "bg-gradient ",
    custom: "",
    },
    destructive: {
      primary: buttonColor || "bg-button-primaryErrorBg hover:bg-button-primaryErrorBgHover focus:ring-4 focus:ring-button-ringErrorShadowSm",
    secondary: buttonColor || "bg-button-secondaryErrorBg hover:bg-button-secondaryErrorBgHover focus:ring-4 focus:ring-button-ringErrorShadowSm",
    tertiary: buttonColor || "bg-button-tertiaryErrorBg hover:bg-button-tertiaryErrorBgHover",
    link: buttonColor || "bg-link-500 hover:bg-link-600",
    gradient: buttonColor || "bg-gradient ",
    custom: "",
    }
  };
  const buttonBackgroundDisabled = {
    primary: "bg-bg-disabled",
    secondary: "bg-bg-primary",
    tertiary: "bg-bg-primary",
    link: "",
    gradient: "bg-bg-disabled",
    custom: "",
  };
  const buttonBorder = {
    primary : {
      primary: "border-inner border-button-primaryBorder hover:border-button-primaryBorderHover",
    secondary: `border-inner ${customBorderColor || "border-button-secondaryBorder hover:border-button-secondaryBorderHover"}`,
    tertiary: "",
    link: "",
    gradient: "",
    custom: "",
    },
    destructive: {
    primary: "border-inner border-button-primaryErrorBorder hover:border-button-primaryErrorBorderHover",
    secondary: `border-inner ${customBorderColor || "border-button-secondaryErrorBorder hover:border-button-secondaryErrorBorderHover"}`,
    tertiary: "",
    link: "",
    gradient: "",
    custom: "",
    }
  };
  const buttonBorderDisabled = {
    primary: "border-inner border-border-disabled_subtle",
    secondary: "border-inner border-border-disabled_subtle",
    tertiary: "",
    link: "",
    gradient: "",
    custom: "",
  };  

  const buttonTextColor = {
    primary : {
      primary: textColor || "text-button-primaryFg hover:text-button-primaryFgHover",
      secondary: textColor || "text-button-secondaryFg hover:text-button-secondaryFgHover",
      tertiary: textColor || "text-button-tertiaryFg hover:text-button-tertiaryFgHover",
      link: textColor || "text-button-tertiaryFg hover:text-button-tertiaryFgHover",
      gradient: textColor || "text-button-primaryFg hover:text-button-primaryFgHover",
      custom: "",
    },
    destructive: {
      primary: textColor || "text-button-primaryFg hover:text-button-primaryFgHover",
      secondary: textColor || "text-button-secondaryErrorFg hover:text-button-secondaryErrorFgHover",
      tertiary: textColor || "text-button-tertiaryErrorFg hover:text-button-tertiaryErrorFgHover",
      link: textColor || "text-button-tertiaryErrorFg hover:text-button-tertiaryErrorFgHover",
      gradient: textColor || "text-button-primaryFg hover:text-button-primaryFgHover",
      custom: "",
    }
  };

  const buttonTextColorDisabled = {
    primary: "text-fg-disabled",
    secondary: "text-fg-disabled",
    tertiary: "text-fg-disabled",
    link: "text-fg-disabled",
    gradient: "text-fg-disabled",
    custom: "",
  };
  const buttonSize = {
    xs: "text-sm px-3 py-2 gap-1 h-8",
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
    disabled ? buttonBackgroundDisabled[hierarchy] : buttonBackground[variant][hierarchy]
  } ${
    disabled ? buttonTextColorDisabled[hierarchy] : buttonTextColor[variant][hierarchy]
  } ${disabled ? buttonBorderDisabled[hierarchy] : buttonBorder[variant][hierarchy]}`;
  return (
    <button className={hierarchy !== "custom" ? buttonStyles : ""} disabled={disabled} {...props}>
      {iconLeadingSrc && <img src={iconLeadingSrc} />}
      <div>{children}</div>
      {iconTrailingSrc && <img src={iconTrailingSrc} />}
    </button>
  );
};
