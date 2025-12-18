import React from "react";
import classNames from "classnames";

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  /** Mask pattern using # for digits. Example: "(###) ###-####" */
  mask: string;
  label?: string;
  className?: string;
  testId?: string;
}

function applyMask(mask: string, rawDigits: string) {
  let out = "";
  let di = 0;
  for (const ch of mask) {
    if (ch === "#") {
      if (di >= rawDigits.length) break;
      out += rawDigits[di++];
    } else {
      out += ch;
    }
  }
  return out;
}

function stripToDigits(v: string) {
  return v.replace(/\D/g, "");
}

export const MaskedInput: React.FC<MaskedInputProps> = ({
  value,
  onChange,
  mask,
  label,
  className,
  testId = "masked-input",
  ...props
}) => {
  const masked = applyMask(mask, stripToDigits(value));

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <input
        {...props}
        value={masked}
        onChange={(e) => onChange(stripToDigits(e.target.value))}
        inputMode="numeric"
        className={classNames(
          "w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary",
          "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
          className
        )}
      />
      <div className="mt-1 text-xs text-text-tertiary font-mono">mask: {mask}</div>
    </div>
  );
};

export default MaskedInput;

