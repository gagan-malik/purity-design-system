import React, { useState, useRef } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../../hooks";

export interface PickerViewOption {
  label: string;
  value: string | number;
}

export interface PickerViewProps {
  /** Options to display */
  options: PickerViewOption[];
  /** Selected value */
  value?: string | number;
  /** Default value */
  defaultValue?: string | number;
  /** Callback when value changes */
  onChange?: (value: string | number) => void;
  /** Number of visible options */
  visibleCount?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * PickerView - Wheel picker (spinner) component
 * Perfect for mobile date/time selection and option selection
 */
export const PickerView: React.FC<PickerViewProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  visibleCount = 5,
  className = "",
  testId = "picker-view",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || options[0]?.value);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  if (!isMobile) {
    // Fallback to select on desktop
    return (
      <select
        value={value}
        onChange={(e) => {
          const newValue = options.find((opt) => opt.value.toString() === e.target.value)?.value;
          if (newValue !== undefined) {
            if (controlledValue === undefined) setInternalValue(newValue);
            onChange?.(newValue);
          }
        }}
        className={className}
        data-testid={testId}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  const itemHeight = 44;
  const containerHeight = itemHeight * visibleCount;
  const selectedY = containerHeight / 2 - itemHeight / 2;

  const handleSelect = (index: number) => {
    const selectedOption = options[index];
    if (selectedOption) {
      if (controlledValue === undefined) {
        setInternalValue(selectedOption.value);
      }
      onChange?.(selectedOption.value);
    }
  };

  return (
    <div
      ref={pickerRef}
      className={classNames("relative overflow-hidden", className)}
      style={{ height: `${containerHeight}px` }}
      data-testid={testId}
    >
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />

      {/* Selection indicator */}
      <div
        className="absolute left-0 right-0 border-t border-b border-primary-500 z-10 pointer-events-none"
        style={{ top: `${selectedY}px`, height: `${itemHeight}px` }}
      />

      {/* Options */}
      <div className="relative">
        {options.map((option, index) => {
          const y = index * itemHeight - selectedIndex * itemHeight + selectedY + dragY;
          const distance = Math.abs(index - selectedIndex);
          const scale = Math.max(0.8, 1 - distance * 0.1);
          const opacity = Math.max(0.3, 1 - distance * 0.3);

          return (
            <button
              key={option.value}
              onClick={() => handleSelect(index)}
              className="absolute left-0 right-0 flex items-center justify-center text-text-primary font-medium"
              style={{
                top: `${y}px`,
                height: `${itemHeight}px`,
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PickerView;

