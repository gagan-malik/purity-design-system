import React from "react";
import classNames from "classnames";
import { useSafeArea } from "../../hooks";

export interface StatusBarProps {
  /** Status items */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * StatusBar - System status bar component
 * Perfect for mobile status indicators
 */
export const StatusBar: React.FC<StatusBarProps> = ({
  children,
  className = "",
  testId = "status-bar",
}) => {
  const { top } = useSafeArea();

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 right-0 z-[9999] bg-bg-primary/80 backdrop-blur-sm",
        "flex items-center justify-between px-4 py-2 text-xs text-text-secondary",
        className
      )}
      style={{ paddingTop: `${top + 8}px` }}
      data-testid={testId}
    >
      {children || (
        <>
          <div>9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 border border-text-secondary rounded-sm" />
            <div className="w-6 h-3 border border-text-secondary rounded-sm" />
          </div>
        </>
      )}
    </div>
  );
};

export default StatusBar;

