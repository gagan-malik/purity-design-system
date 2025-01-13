import React from "react";

interface IIconsProps {
  name: "clock-stopwatch";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  color?: string;
  height?: string;
  width?: string;
}

export const Icons: React.FC<IIconsProps> = ({
  name,
  size = "md",
  color,
  height,
  width,
}) => {
  let sizeClass = {
    xs: {
      height: "12",
      width: "12",
    },
    sm: {
      height: "16",
      width: "16",
    },
    md: {
      height: "20",
      width: "20",
    },
    lg: {
      height: "24",
      width: "24",
    },
    xl: {
      height: "32",
      width: "32",
    },
    custom: {
      height: height,
      width: width,
    },
  };

  return (
    <>
      {name == "clock-stopwatch" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={sizeClass[size].width}
          height={sizeClass[size].height}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M6 4.75V6.75L7.25 7.5M6 2.5C3.65279 2.5 1.75 4.40279 1.75 6.75C1.75 9.09721 3.65279 11 6 11C8.34721 11 10.25 9.09721 10.25 6.75C10.25 4.40279 8.34721 2.5 6 2.5ZM6 2.5V1M5 1H7M10.1645 2.79602L9.41449 2.04602L9.78949 2.42102M1.83551 2.79602L2.58551 2.04602L2.21051 2.42102"
            stroke="currentColor"
            className={color}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
};

export default Icons;
