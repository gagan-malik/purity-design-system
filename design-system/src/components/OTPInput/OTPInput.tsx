import React from "react";
import classNames from "classnames";

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  testId?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  disabled = false,
  label,
  className,
  testId = "otp-input",
}) => {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? "");

  const setChar = (idx: number, ch: string) => {
    const next = chars.slice();
    next[idx] = ch;
    onChange(next.join("").slice(0, length));
  };

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      {label && <div className="mb-2 text-sm font-semibold text-text-primary">{label}</div>}
      <div className="flex items-center gap-2">
        {chars.map((c, idx) => (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={idx === 0 ? "one-time-code" : "off"}
            className={classNames(
              "w-10 h-11 text-center rounded-xl border border-border-primary bg-bg-primary text-sm text-text-primary",
              "focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            value={c}
            disabled={disabled}
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(-1);
              setChar(idx, next);
              if (next && idx < length - 1) refs.current[idx + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !c && idx > 0) {
                refs.current[idx - 1]?.focus();
              }
            }}
            onPaste={(e) => {
              if (disabled) return;
              const text = e.clipboardData.getData("text").replace(/\D/g, "");
              if (!text) return;
              e.preventDefault();
              const next = (value + text).replace(/\D/g, "").slice(0, length);
              onChange(next);
              const focusIdx = Math.min(length - 1, next.length);
              refs.current[focusIdx]?.focus();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;

