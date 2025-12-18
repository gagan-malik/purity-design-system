import React from "react";
import classNames from "classnames";

export interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  className,
  testId = "color-picker",
}) => {
  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="h-10 w-14 rounded-xl border border-border-secondary bg-bg-primary p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={classNames(
            "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary",
            "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
    </div>
  );
};

export default ColorPicker;

