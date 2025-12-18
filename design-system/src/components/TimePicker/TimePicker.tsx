import React from "react";
import classNames from "classnames";

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  className?: string;
  testId?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  className,
  testId = "time-picker",
  ...props
}) => {
  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <input
        {...props}
        type="time"
        className={classNames(
          "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary",
          "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
          // If consumers need to style the input, pass `className` to this component
          className
        )}
      />
    </div>
  );
};

export default TimePicker;

