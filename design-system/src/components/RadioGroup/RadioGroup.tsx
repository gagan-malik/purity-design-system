import React from "react";
import classNames from "classnames";

export interface RadioGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Options to display */
  options: RadioGroupOption[];
  /** Selected value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * RadioGroup - Group of radio buttons
 * Perfect for form selections and option groups
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  orientation = "vertical",
  className = "",
  testId = "radio-group",
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  return (
    <div
      role="radiogroup"
      className={classNames(
        orientation === "horizontal" ? "flex gap-4" : "space-y-2",
        className
      )}
      data-testid={testId}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        const isDisabled = option.disabled ?? false;

        return (
          <label
            key={option.value}
            className={classNames(
              "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
              "hover:bg-bg-secondary",
              isSelected && "bg-primary-50 border-2 border-primary-500",
              !isSelected && "border-2 border-transparent",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="radio"
              value={option.value}
              checked={isSelected}
              onChange={() => handleChange(option.value)}
              disabled={isDisabled}
              className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <div className="flex-1">
              <div className="font-medium text-text-primary">{option.label}</div>
              {option.description && (
                <div className="text-sm text-text-secondary mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;

