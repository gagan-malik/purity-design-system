import React, { useState, useCallback, useRef } from "react";
import classNames from "classnames";
import { useIsMobile } from "../../hooks";

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
  /** Callback on value commit (after drag ends) */
  onValueCommit?: (value: number) => void;
  /** Whether slider is disabled */
  disabled?: boolean;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Show value label */
  showValue?: boolean;
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
  onValueCommit,
  disabled = false,
  orientation = "horizontal",
  showValue = false,
  className = "",
  testId = "slider",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

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
    },
    [min, max, step, disabled, orientation, controlledValue, onChange]
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
      if (controlledValue === undefined) {
        onValueCommit?.(internalValue);
      } else {
        onValueCommit?.(value);
      }
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
    if (controlledValue === undefined) {
      onValueCommit?.(internalValue);
    } else {
      onValueCommit?.(value);
    }
  };

  const trackClasses = classNames(
    "relative bg-bg-secondary rounded-full",
    orientation === "horizontal" ? "h-2 w-full" : "w-2 h-full",
    disabled && "opacity-50 cursor-not-allowed"
  );

  const thumbClasses = classNames(
    "absolute bg-primary-600 rounded-full shadow-lg transition-all",
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
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
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        <div
          className={classNames(
            "absolute rounded-full bg-primary-600",
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

