import React, { useState, useCallback, useRef } from "react";
import classNames from "classnames";

export interface SliderProps {
  /** Current value */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /**
   * New API (preferred):
   * Callback when value changes.
   */
  onValueChange?: (value: number) => void;
  /** Callback on value commit (after drag ends) */
  onValueCommit?: (value: number) => void;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Show value label */
  showValue?: boolean;
  /** Accessible label (recommended if no visible label) */
  ariaLabel?: string;
  /** ID of labelling element */
  ariaLabelledBy?: string;
  /** Provide a custom aria-valuetext */
  getAriaValueText?: (value: number) => string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Slider - Range input component
 * Perfect for settings, filters, and value selection
 */
export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onValueChange,
  onValueCommit,
  disabled = false,
  orientation = "horizontal",
  showValue = false,
  ariaLabel,
  ariaLabelledBy,
  getAriaValueText,
  className = "",
  testId = "slider",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const valueRef = useRef<number>(value);
  valueRef.current = value;
  const percentage = ((value - min) / (max - min)) * 100;

  const commit = useCallback(() => {
    onValueCommit?.(valueRef.current);
  }, [onValueCommit]);

  const updateValue = useCallback(
    (clientX: number, clientY: number) => {
      if (!sliderRef.current || disabled) return;

      const rect = sliderRef.current.getBoundingClientRect();
      let newPercentage: number;

      if (orientation === "horizontal") {
        newPercentage = ((clientX - rect.left) / rect.width) * 100;
      } else {
        newPercentage = ((rect.bottom - clientY) / rect.height) * 100;
      }

      newPercentage = Math.max(0, Math.min(100, newPercentage));
      const newValue = Math.round((min + (newPercentage / 100) * (max - min)) / step) * step;
      const clampedValue = Math.max(min, Math.min(max, newValue));

      if (controlledValue === undefined) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
      onValueChange?.(clampedValue);
    },
    [min, max, step, disabled, orientation, controlledValue, onChange, onValueChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    updateValue(e.clientX, e.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      commit();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    updateValue(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || disabled) return;
    e.preventDefault();
    const touch = e.touches[0];
    updateValue(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    setIsDragging(false);
    commit();
  };

  const clampAndSet = useCallback(
    (next: number) => {
      const clamped = Math.max(min, Math.min(max, Math.round(next / step) * step));
      if (controlledValue === undefined) setInternalValue(clamped);
      onChange?.(clamped);
      onValueChange?.(clamped);
      return clamped;
    },
    [min, max, step, controlledValue, onChange, onValueChange]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    let next = valueRef.current;
    const page = step * 10;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = next - step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = next + step;
        break;
      case "PageDown":
        next = next - page;
        break;
      case "PageUp":
        next = next + page;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    clampAndSet(next);
  };

  const trackClasses = classNames(
    "relative bg-bg-secondary rounded-full",
    orientation === "horizontal" ? "h-2 w-full" : "w-2 h-full",
    disabled && "opacity-50 cursor-not-allowed"
  );

  const thumbClasses = classNames(
    "absolute bg-bg-brand-solid rounded-full shadow-lg transition-all",
    orientation === "horizontal"
      ? "top-1/2 -translate-y-1/2 h-4 w-4"
      : "left-1/2 -translate-x-1/2 h-4 w-4",
    !disabled && (isDragging ? "scale-125" : "hover:scale-110 cursor-grab active:cursor-grabbing"),
    disabled && "cursor-not-allowed"
  );

  return (
    <div
      className={classNames(
        "flex items-center gap-3",
        orientation === "vertical" && "flex-col",
        className
      )}
      data-testid={testId}
    >
      {showValue && (
        <span className="text-sm font-medium text-text-primary min-w-[3rem] text-right">
          {value}
        </span>
      )}
      <div
        ref={sliderRef}
        className={trackClasses}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={getAriaValueText ? getAriaValueText(value) : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className={classNames(
            "absolute rounded-full bg-bg-brand-solid",
            orientation === "horizontal"
              ? "h-full top-0 left-0"
              : "w-full bottom-0 left-0"
          )}
          style={
            orientation === "horizontal"
              ? { width: `${percentage}%` }
              : { height: `${percentage}%` }
          }
        />
        <div
          className={thumbClasses}
          style={
            orientation === "horizontal"
              ? { left: `${percentage}%`, transform: "translate(-50%, -50%)" }
              : { bottom: `${percentage}%`, transform: "translate(-50%, 50%)" }
          }
        />
      </div>
    </div>
  );
};

export default Slider;

