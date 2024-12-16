import React from "react";
export interface TypographyProps {
  fontWeight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  fontStyle?: "italic" | "normal";
  fontSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  fontColor?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "white"
    | "disabled"
    | "placeholder"
    | "warning";
  children: string | React.JSX.Element;
}

export const Typography = ({
  fontWeight = "light",
  fontSize = "sm",
  fontStyle = "normal",
  fontColor = "primary",
  children,
}: TypographyProps) => {
  const textWeight = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
  };

  const textColor = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
    tertiary: "text-text-tertiary",
    white: "text-text-white",
    disabled: "text-text-disabled",
    placeholder: "text-text-placeholder",
    warning: "text-text-warning",
  };

  const textStyle = {
    italic: "italic",
    normal: "not-italic",
  };

  const textStyles = `${textWeight[fontWeight]} ${textSize[fontSize]} ${textStyle[fontStyle]} ${textColor[fontColor]}`;

  return <div className={textStyles}>{children}</div>;
};
