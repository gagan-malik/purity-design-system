import React from "react";
import classNames from "classnames";
import { Separator } from "../Separator";

export interface ToolbarProps {
  /** Toolbar items/buttons */
  children: React.ReactNode;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Toolbar - Bottom action toolbar
 * Perfect for editor toolbars and action bars
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  orientation = "horizontal",
  className = "",
  testId = "toolbar",
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-1 p-2 bg-bg-primary border border-border-secondary rounded-lg",
        orientation === "vertical" && "flex-col",
        className
      )}
      role="toolbar"
      data-testid={testId}
    >
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < React.Children.count(children) - 1 && (
            <Separator orientation={orientation === "vertical" ? "horizontal" : "vertical"} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Toolbar;

