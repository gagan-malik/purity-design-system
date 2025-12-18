import React from "react";
import classNames from "classnames";

export interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Type of toggle group
   */
  type?: "single" | "multiple";
  /**
   * Orientation
   */
  orientation?: "horizontal" | "vertical";
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    { children, type = "single", orientation = "horizontal", className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "inline-flex rounded-md border border-border overflow-hidden",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        role="group"
        data-type={type}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /**
   * Whether the item is pressed/selected
   */
  pressed?: boolean;
  value?: string;
}

export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ children, pressed, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={classNames(
        "px-3 py-1.5 text-sm font-medium transition-colors",
        "border-r border-border last:border-r-0",
        pressed
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground hover:bg-muted",
        className
      )}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </button>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";
