import React from "react";
import classNames from "classnames";

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
  /** New API */
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconLeadingSrc?: string | React.ReactNode;
  iconTrailingSrc?: string | React.ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  asChild?: boolean;
  ariaLabel?: string;
}

export const ButtonV2: React.FC<IButtonProps> = ({
  hierarchy = "primary",
  size = "md",
  shape = "rounded",
  disabled = false,
  buttonColor,
  textColor,
  customBorderColor,
  startIcon,
  endIcon,
  iconLeadingSrc,
  iconTrailingSrc,
  children,
  iconOnly = false,
  variant = "primary",
  loading = false,
  loadingText,
  fullWidth = false,
  asChild = false,
  ariaLabel,
  className,
  onClick,
  ...props
}) => {
  const isDisabled = disabled || loading;

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
      primary: "border border-button-primaryBorder hover:border-button-primaryBorderHover",
    secondary: `border ${customBorderColor || "border-button-secondaryBorder hover:border-button-secondaryBorderHover"}`,
    tertiary: "",
    link: "",
    gradient: "",
    custom: "",
    },
    destructive: {
    primary: "border border-button-primaryErrorBorder hover:border-button-primaryErrorBorderHover",
    secondary: `border ${customBorderColor || "border-button-secondaryErrorBorder hover:border-button-secondaryErrorBorderHover"}`,
    tertiary: "",
    link: "",
    gradient: "",
    custom: "",
    }
  };
  const buttonBorderDisabled = {
    primary: "border border-border-disabled_subtle",
    secondary: "border border-border-disabled_subtle",
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

  const buttonStyles = classNames(
    "inline-flex items-center justify-center font-semibold group select-none transition-colors",
    "active:scale-[0.99] focus:outline-none",
    buttonShape[shape],
    iconOnly ? buttonSizeIconOnly[size] : buttonSize[size],
    isDisabled ? buttonBackgroundDisabled[hierarchy] : buttonBackground[variant][hierarchy],
    isDisabled ? buttonTextColorDisabled[hierarchy] : buttonTextColor[variant][hierarchy],
    isDisabled ? buttonBorderDisabled[hierarchy] : buttonBorder[variant][hierarchy],
    fullWidth && "w-full",
    className
  );

  const resolvedStartIcon =
    startIcon ||
    (iconLeadingSrc
      ? typeof iconLeadingSrc === "string"
        ? <img src={iconLeadingSrc} alt="" aria-hidden />
        : iconLeadingSrc
      : null);

  const resolvedEndIcon =
    endIcon ||
    (iconTrailingSrc
      ? typeof iconTrailingSrc === "string"
        ? <img src={iconTrailingSrc} alt="" aria-hidden />
        : iconTrailingSrc
      : null);

  const Spinner = (
    <span
      aria-hidden
      className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
    />
  );

  const content = iconOnly ? (
    <>
      {loading ? Spinner : resolvedStartIcon || resolvedEndIcon || children}
      <span className="sr-only">{ariaLabel || (typeof children === "string" ? children : "Button")}</span>
    </>
  ) : (
    <>
      {loading ? Spinner : resolvedStartIcon}
      <span>{loading && loadingText ? loadingText : children}</span>
      {resolvedEndIcon}
    </>
  );

  const handleClick: React.MouseEventHandler<any> = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...(child.props || {}),
      className: classNames(buttonStyles, child.props?.className),
      onClick: handleClick,
      children: content,
      "aria-disabled": isDisabled ? true : undefined,
      tabIndex: isDisabled ? -1 : child.props?.tabIndex,
    });
  }

  return (
    <button
      className={hierarchy !== "custom" ? buttonStyles : className}
      disabled={isDisabled}
      aria-label={iconOnly ? ariaLabel || (props as any)["aria-label"] : undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
};
