import React from "react";
import classNames from "classnames";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Disabled state
   */
  disabled?: boolean;
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "flex items-center border border-border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        data-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";

export interface InputGroupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={classNames(
        "flex-1 px-3 py-2 bg-background text-foreground border-0 outline-none",
        className
      )}
      {...props}
    />
  );
});

InputGroupInput.displayName = "InputGroupInput";

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Alignment of the addon
   */
  align?: "start" | "end" | "inline-start" | "inline-end";
}

export const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  InputGroupAddonProps
>(({ children, align = "start", className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames(
        "flex items-center justify-center px-3 py-2 bg-muted text-muted-foreground border-l border-border",
        align === "end" || align === "inline-end"
          ? "border-l-0 border-r"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

InputGroupAddon.displayName = "InputGroupAddon";

export interface InputGroupButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  InputGroupButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={classNames(
        "px-3 py-2 bg-muted text-foreground border-l border-border hover:bg-muted/80 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

InputGroupButton.displayName = "InputGroupButton";

export interface InputGroupTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  InputGroupTextProps
>(({ children, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={classNames(
        "px-3 py-2 bg-muted text-muted-foreground border-l border-border text-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

InputGroupText.displayName = "InputGroupText";
