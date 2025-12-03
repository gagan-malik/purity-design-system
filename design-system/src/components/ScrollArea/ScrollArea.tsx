import React from "react";
import classNames from "classnames";

export interface ScrollAreaProps {
  /** Children content */
  children: React.ReactNode;
  /** Maximum height */
  maxHeight?: string | number;
  /** Whether to show scrollbar */
  showScrollbar?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ScrollArea - Custom scrollable container
 * Perfect for custom scrollbars and scroll animations
 */
export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  maxHeight = "400px",
  showScrollbar = true,
  className = "",
  testId = "scroll-area",
}) => {
  const maxHeightValue = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      className={classNames(
        "overflow-auto",
        showScrollbar
          ? "scrollbar-thin scrollbar-thumb-border-secondary scrollbar-track-bg-primary"
          : "scrollbar-hide",
        className
      )}
      style={{ maxHeight: maxHeightValue }}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default ScrollArea;

