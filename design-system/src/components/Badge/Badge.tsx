import classNames from "classnames";
import React from "react";

interface IBadgeProps {
  color?: "default" | "primary" | "important" | "added" | "transparent" | "counter" | "gradient" | "success";
  variant?: "filled" | "outlined";
  icon?: string;
  children: string | React.ReactNode;
  imagePlacement?: "left" | "right";
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
  border?: boolean;
}
const Badge: React.FC<IBadgeProps> = ({
  variant = "filled",
  children,
  icon,
  color = "default",
  imagePlacement = "left",
  size = "sm",
  showDot = false,
  border = true,
}) => {
  const baseStyle = "font-medium rounded-full";

  const colorStyles = {
    primary: {
      filled:
        `text-utility-brand-700 bg-utility-brand-50 rounded-md ${border ? "border border-solid border-utility-brand-200" : ""}`,
      outlined:
        `text-utility-brand-700 rounded-md ${border ? "border border-solid border-utility-brand-200" : ""}`,
      dotBg: "bg-utility-brand-500",
    },
    default: {
      filled:
        `text-utility-gray-700 bg-utility-gray-50 rounded-md ${border ? "border border-solid border-utility-gray-200" : ""}`,
      outlined:
        `text-utility-gray-700 rounded-md ${border ? "border border-solid border-utility-gray-200" : ""}`,
      dotBg: "bg-utility-gray-500",
    },
    transparent: {
      filled:
        `text-utility-gray-700 rounded-md ${border ? "border border-solid border-utility-gray-200" : ""}`,
      outlined:
        `text-utility-gray-700 rounded-md ${border ? "border border-solid border-utility-gray-200" : ""}`,
      dotBg: "bg-utility-gray-500",
    },
    added: {
      filled:
        `text-utility-success-700 bg-utility-success-50 rounded-md ${border ? "border border-solid border-utility-success-200" : ""}`,
      outlined:
        `text-utility-success-700 rounded-md ${border ? "border border-solid border-utility-success-200" : ""}`,
      dotBg: "bg-utility-success-500",
    },
    important: {
      filled:
        `text-utility-error-700 bg-utility-error-50 rounded-md ${border ? "border border-solid border-utility-error-200" : ""}`,
      outlined:
        `text-utility-error-700 rounded-md ${border ? "border border-solid border-utility-error-200" : ""}`,
      dotBg: "bg-utility-error-500",
    },
    counter: {
      filled:
        `text-white bg-utility-error-600 rounded-md ${border ? "border border-solid border-utility-error-600" : ""}`,
      outlined:
        `text-utility-error-600 rounded-md ${border ? "border border-solid border-utility-error-700" : ""}`,
      dotBg: "bg-utility-error-700",
    },
    success: {
      filled:
        `text-white bg-bg-success-solid rounded-md ${border ? "border border-solid border-bg-success-solid" : ""}`,
      outlined:
        `text-bg-success-solid rounded-md ${border ? "border border-solid border-bg-success-solid" : ""}`,
      dotBg: "bg-utility-gray-500",
    },
    gradient: {
      filled:
        "text-white bg-gradient rounded-md",
      outlined:
        `text-gradient rounded-md ${border ? "border border-solid border-bg-gradient" : ""}`,
      dotBg: "bg-gradient",
    },
  };

  const sizeStyles = {
    sm: "py-[2px] px-2 text-xs gap-1",
    md: "py-[2px] px-2.5 text-sm gap-1.5",
    lg: "py-1 px-3 text-sm gap-1.5",
  };

  const imgStyles = {
    filled: "fill-base-white",
    outlined: "",
  };

  const alignStyle = {
    left: "",
    right: "flex-row-reverse",
  };

  const badgeStyles = `${baseStyle} ${sizeStyles[size]} ${colorStyles[color][variant]}  ${alignStyle[imagePlacement]} flex items-center justify-center`;

  const imageStyle = `${imgStyles[variant]}`;

  const dotStyle = `${colorStyles[color]["dotBg"]} h-2 w-2 rounded-full`;

  return (
    <div className={badgeStyles}>
      {showDot ? (
        <>
          <div className={dotStyle}></div>
        </>
      ) : (
        <> {icon && <img src={icon} className={imageStyle} alt="img" />}</>
      )}

      <span>{children}</span>
    </div>
  );
};

export default Badge;
