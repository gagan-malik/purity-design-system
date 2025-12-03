import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

export interface ResizableProps {
  /** First panel content */
  firstPanel: React.ReactNode;
  /** Second panel content */
  secondPanel: React.ReactNode;
  /** Direction */
  direction?: "horizontal" | "vertical";
  /** Default split ratio (0-1) */
  defaultRatio?: number;
  /** Minimum panel size (pixels) */
  minSize?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Resizable - Resizable panels/panes
 * Perfect for split views and adjustable layouts
 */
export const Resizable: React.FC<ResizableProps> = ({
  firstPanel,
  secondPanel,
  direction = "horizontal",
  defaultRatio = 0.5,
  minSize = 100,
  className = "",
  testId = "resizable",
}) => {
  const [ratio, setRatio] = useState(defaultRatio);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let newRatio: number;

      if (direction === "horizontal") {
        const x = e.clientX - rect.left;
        const totalWidth = rect.width;
        newRatio = Math.max(
          minSize / totalWidth,
          Math.min(1 - minSize / totalWidth, x / totalWidth)
        );
      } else {
        const y = e.clientY - rect.top;
        const totalHeight = rect.height;
        newRatio = Math.max(
          minSize / totalHeight,
          Math.min(1 - minSize / totalHeight, y / totalHeight)
        );
      }

      setRatio(newRatio);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, direction, minSize]);

  const firstPanelSize = ratio * 100;
  const secondPanelSize = (1 - ratio) * 100;

  return (
    <div
      ref={containerRef}
      className={classNames(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      data-testid={testId}
    >
      {/* First Panel */}
      <div
        className="overflow-hidden"
        style={
          direction === "horizontal"
            ? { width: `${firstPanelSize}%` }
            : { height: `${firstPanelSize}%` }
        }
      >
        {firstPanel}
      </div>

      {/* Resizer */}
      <div
        onMouseDown={handleMouseDown}
        className={classNames(
          "bg-border-secondary hover:bg-border-primary transition-colors",
          isDragging && "bg-primary-500",
          direction === "horizontal"
            ? "w-1 cursor-col-resize"
            : "h-1 cursor-row-resize"
        )}
      />

      {/* Second Panel */}
      <div
        className="overflow-hidden flex-1"
        style={
          direction === "horizontal"
            ? { width: `${secondPanelSize}%` }
            : { height: `${secondPanelSize}%` }
        }
      >
        {secondPanel}
      </div>
    </div>
  );
};

export default Resizable;

