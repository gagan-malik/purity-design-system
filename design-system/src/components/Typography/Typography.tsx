import React from "react";
import classNames from "classnames";

export type TypographyWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type TypographySize =
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

export type TypographyTone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "white"
  | "disabled"
  | "placeholder"
  | "warning";

export interface TypographyProps {
  /** New API aliases */
  weight?: TypographyWeight;
  size?: TypographySize;
  tone?: TypographyTone;
  italic?: boolean;
  /**
   * Render as a different element.
   * @default "div" (back-compat)
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Apply typography styles to the child element.
   */
  asChild?: boolean;
  className?: string;

  /** Back-compat props (deprecated) */
  fontWeight?: TypographyWeight;
  fontStyle?: "italic" | "normal";
  fontSize?: TypographySize;
  fontColor?: TypographyTone;

  children: React.ReactNode;
}

export const Typography = ({
  weight,
  size,
  tone,
  italic,
  as = "div",
  asChild = false,
  className,
  fontWeight = "light",
  fontSize = "sm",
  fontStyle = "normal",
  fontColor = "primary",
  children,
}: TypographyProps) => {
  const resolvedWeight = weight || fontWeight;
  const resolvedSize = size || fontSize;
  const resolvedTone = tone || fontColor;
  const resolvedItalic = typeof italic === "boolean" ? italic : fontStyle === "italic";

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

  const textStyles = classNames(
    textWeight[resolvedWeight],
    textSize[resolvedSize],
    resolvedItalic ? "italic" : "not-italic",
    textColor[resolvedTone],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ...(children as React.ReactElement<any>).props,
      className: classNames(textStyles, (children as React.ReactElement<any>).props?.className),
    });
  }

  const Component = as as any;
  return <Component className={textStyles}>{children}</Component>;
};
