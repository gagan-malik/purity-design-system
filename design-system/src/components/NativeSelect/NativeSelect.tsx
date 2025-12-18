import React from "react";
import classNames from "classnames";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Options for the select
   */
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  children?: React.ReactNode;
}

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(
  (
    {
      label,
      helperText,
      error,
      options,
      children,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={classNames(
            "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm",
            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          {...props}
        >
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

NativeSelect.displayName = "NativeSelect";
