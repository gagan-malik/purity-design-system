import React from "react";
import classNames from "classnames";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Keyboard key or key combination to display
   */
  children: React.ReactNode;
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ children, size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-1 text-sm",
      lg: "px-2.5 py-1.5 text-base",
    };

    return (
      <kbd
        ref={ref}
        className={classNames(
          "font-mono font-medium rounded border border-border bg-muted text-foreground",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames("inline-flex items-center gap-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

KbdGroup.displayName = "KbdGroup";
