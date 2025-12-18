import React from "react";
import "./loader.css";
import classNames from "classnames";

export type LoaderSize = "sm" | "md" | "lg";
export type LoaderTone = "brand" | "neutral" | "danger";

export interface LoaderProps {
  fullPage?: boolean;
  size?: LoaderSize;
  tone?: LoaderTone;
  className?: string;
  ariaLabel?: string;
}

const Loader: React.FC<LoaderProps> = ({
  fullPage = false,
  size = "md",
  tone = "brand",
  className,
  ariaLabel = "Loading",
}) => {
  const toneTop = {
    brand: "border-t-primary-600",
    neutral: "border-t-gray-500",
    danger: "border-t-error-600",
  }[tone];

  return (
    <div
      className={classNames("flex justify-center items-center", {
        "fixed inset-0 bg-blackTransparent z-[1100]": fullPage,
      }, className)}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <div
        className={classNames(
          "spinner border-4 border-solid rounded-full",
          toneTop,
          { "w-10 h-10": size === "md" },
          { "w-8 h-8": size === "sm" },
          { "w-12 h-12": size === "lg" }
        )}
      ></div>
    </div>
  );
};

export default Loader;
