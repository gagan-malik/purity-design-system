import React from "react";
import classNames from "classnames";
import { Stepper } from "../Stepper";

export interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  /** Show stepper controls */
  spinButtons?: boolean;
  className?: string;
  testId?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  spinButtons = true,
  className,
  testId = "number-input",
}) => {
  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => {
            const next = Number(e.target.value);
            if (Number.isNaN(next)) return;
            onChange(Math.max(min, Math.min(max, next)));
          }}
          className={classNames(
            "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary",
            "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        {spinButtons && (
          <Stepper value={value} min={min} max={max} step={step} onChange={onChange} disabled={disabled} />
        )}
      </div>
    </div>
  );
};

export default NumberInput;

