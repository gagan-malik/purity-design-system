import React from "react";
import classNames from "classnames";

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  revealLabel?: string;
  className?: string;
  testId?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  revealLabel = "Show password",
  className,
  testId = "password-input",
  ...props
}) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={classNames(
            "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 pr-12 text-sm text-text-primary",
            "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
            className
          )}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 text-xs font-medium text-text-tertiary hover:text-text-primary"
          aria-label={revealLabel}
          onClick={() => setShow((v) => !v)}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;

