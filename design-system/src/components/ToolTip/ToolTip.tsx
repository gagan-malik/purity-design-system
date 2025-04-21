import React, { useState } from "react";

interface IToolTipProps {
  text?: string;
  desc?: string;
  children: React.ReactNode;
  align?: "left" | "right" | "bottom" | "top" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showArrow?: boolean;
  className?: string;
}

export const ToolTip = (props: IToolTipProps) => {
  const { text, desc, children, align = "bottom", className, showArrow = false } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  let alignClass = {
    left: "-left-2 top-1/2 -translate-y-1/2 transform -translate-x-full",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    "top-left": "bottom-full left-0 mb-2",
    "top-right": "bottom-full right-0 mb-2",
    "bottom-left": "top-full left-0 mt-2",
    "bottom-right": "top-full right-0 mt-2",
  };

  let arrowClass = {
    left: "right-[-8px] top-1/2 -translate-y-1/2 border-l-bg-primary-solid border-l-8 border-y-transparent border-y-[6px] border-r-0",
    right: "left-[-8px] top-1/2 -translate-y-1/2 border-r-bg-primary-solid border-r-8 border-y-transparent border-y-[6px] border-l-0",
    top: "bottom-[-8px] left-1/2 -translate-x-1/2 border-t-bg-primary-solid border-t-8 border-x-transparent border-x-[6px] border-b-0",
    bottom: "top-[-8px] left-1/2 -translate-x-1/2 border-b-bg-primary-solid border-b-8 border-x-transparent border-x-[6px] border-t-0",
    "top-left": "bottom-[-8px] left-[20%] border-t-bg-primary-solid border-t-8 border-x-transparent border-x-[6px] border-b-0",
    "top-right": "bottom-[-8px] right-[20%] border-t-bg-primary-solid border-t-8 border-x-transparent border-x-[6px] border-b-0",
    "bottom-left": "top-[-8px] left-[20%] border-b-bg-primary-solid border-b-8 border-x-transparent border-x-[6px] border-t-0",
    "bottom-right": "top-[-8px] right-[20%] border-b-bg-primary-solid border-b-8 border-x-transparent border-x-[6px] border-t-0",
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
        {showTooltip && (text || desc) && (
          <div
            className={`${
              showTooltip ? "opacity-100" : "opacity-0"
            } shadow-md absolute transition-opacity duration-300 font-normal text-xs inline-block bg-bg-primary-solid px-3 py-2 rounded-md text-white text-left max-w-[300px] w-max ${alignClass[align]}`}
          >
            {text && <div className="font-semibold">{text}</div>}
            {desc && <div className="text-xs mt-1">{desc}</div>}
            {showArrow && (
              <span className={`absolute w-0 h-0 border-solid ${arrowClass[align]}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
