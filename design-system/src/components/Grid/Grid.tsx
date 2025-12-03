import React from "react";
import classNames from "classnames";
import { useIsMobile, useResponsive } from "../../hooks";

export interface GridProps {
  /** Number of columns on desktop */
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between grid items */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  /** Children items */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

/**
 * Grid - Responsive grid layout component
 * Perfect for image grids, card grids, and collection views
 */
export const Grid: React.FC<GridProps> = ({
  columns = 3,
  gap = "md",
  children,
  className = "",
  testId = "grid",
}) => {
  const { isMobile, isTablet } = useResponsive();

  const getColumnsClass = () => {
    if (typeof columns === "number") {
      if (isMobile) return "grid-cols-1";
      if (isTablet) return "grid-cols-2";
      return `grid-cols-${columns}`;
    }

    // Responsive columns object
    const cols = columns;
    if (isMobile && cols.sm) return `grid-cols-${cols.sm}`;
    if (isTablet && cols.md) return `grid-cols-${cols.md}`;
    if (cols.lg) return `grid-cols-${cols.lg}`;
    if (cols.xl) return `grid-cols-${cols.xl}`;
    return "grid-cols-3";
  };

  return (
    <div
      className={classNames(
        "grid",
        getColumnsClass(),
        gapClasses[gap],
        className
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Grid;

