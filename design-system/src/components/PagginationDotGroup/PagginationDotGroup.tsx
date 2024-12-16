  import React from "react";

  interface IPagginationDotGroupProps {
    type: "dot" | "line";
    size: "small" | "medium" | "large";
    activeIndex: number;
    totalSteps: number;
    variant?: "transparent" | "filled";
  }

  const getDotStyle = (active: boolean, size: string, variant: string) => {
    const sizeMap = {
      small: "w-2 h-2",
      medium: "w-3 h-3",
      large: "w-4 h-4",
    };

    return `${sizeMap[size as keyof typeof sizeMap]} rounded-full m-1`;
  };

  const getLineStyle = (active: boolean, size: string, variant: string) => {
    const sizeMap = {
      small: "h-1",
      medium: "h-2",
      large: "h-3",
    };

    return `${sizeMap[size as keyof typeof sizeMap]} rounded-full m-1 flex-1`;
  };

  const PagginationDotGroup: React.FC<IPagginationDotGroupProps> = ({
    type,
    size,
    activeIndex,
    totalSteps,
    variant = "transparent",
  }) => {
    return (
      <div className={`${variant === "filled" ? "bg-bg-primary" : ""} ${type === "dot" ? "w-fit" : "w-full"} rounded-full p-2 flex`}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`${
              index === activeIndex - 1 ? "bg-fg-brand-primary_alt" : "bg-bg-quaternary"
            } ${
              type === "dot"
                ? getDotStyle(index === activeIndex, size, variant)
                : getLineStyle(index === activeIndex, size, variant)
            }`}
          />
        ))}
      </div>
    );
  };

  export default PagginationDotGroup;
