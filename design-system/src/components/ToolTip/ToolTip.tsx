import React, { useState } from "react";

interface IToolTipProps {
  text: string;
  children: React.ReactNode;
  align?: "left" | "right" | "bottom" | "top";
  className?: string;
}
export const ToolTip = (props: IToolTipProps) => {
  const { text, children, align = "bottom", className } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  let alignClass = {
    left: "top-0 right-10",
    right: "left-10 top-0",
    top: "bottom-40",
    bottom: "top-6 right-0",
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div>
        {showTooltip && text && (
          <div
            className={`${
              showTooltip ? "opacity-100" : "opacity-0"
            } absolute transition-opacity duration-300 font-normal text-xs inline-block bg-brand-950 px-lg py-xs rounded text-white text-center p-1 ${alignClass[align]}
            `}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
};
