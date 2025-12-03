import React from "react";
import classNames from "classnames";

export interface SeparatorProps {
  /** Orientation of the separator */
  orientation?: "horizontal" | "vertical";
  /** Whether separator is decorative (aria-hidden) */
  decorative?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Separator - Visual divider component
 * Used to separate content sections and list items
 */
export const Separator: React.FC<SeparatorProps> = ({
  orientation = "horizontal",
  decorative = true,
  className = "",
  testId = "separator",
}) => {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      aria-hidden={decorative}
      className={classNames(
        "bg-border-secondary",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
      data-testid={testId}
    />
  );
};

export default Separator;

