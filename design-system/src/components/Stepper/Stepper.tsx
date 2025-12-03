import React from "react";
import classNames from "classnames";

export interface StepperProps {
  /** Current value */
  value: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Whether stepper is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Stepper - Increment/decrement control
 * Perfect for quantity selectors and number inputs
 */
export const Stepper: React.FC<StepperProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  size = "md",
  className = "",
  testId = "stepper",
}) => {
  const handleDecrement = () => {
    if (disabled) return;
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const isMin = value <= min;
  const isMax = value >= max;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const buttonSizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  return (
    <div
      className={classNames(
        "inline-flex items-center border border-border-primary rounded-lg bg-bg-primary",
        className
      )}
      data-testid={testId}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || isMin}
        className={classNames(
          "flex items-center justify-center font-semibold text-text-primary",
          "hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
          buttonSizeClasses[size],
          "rounded-l-lg"
        )}
        aria-label="Decrease value"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <div
        className={classNames(
          "px-4 py-2 min-w-[3rem] text-center font-semibold text-text-primary border-x border-border-primary",
          sizeClasses[size]
        )}
      >
        {value}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || isMax}
        className={classNames(
          "flex items-center justify-center font-semibold text-text-primary",
          "hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
          buttonSizeClasses[size],
          "rounded-r-lg"
        )}
        aria-label="Increase value"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Stepper;

