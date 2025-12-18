import React from "react";
import classNames from "classnames";

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
  testId?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  disabled = false,
  label,
  className,
  testId = "rating",
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return (
    <div className={classNames("inline-flex items-center gap-3", className)} data-testid={testId}>
      {label && <span className="text-sm font-semibold text-text-primary">{label}</span>}
      <div className="inline-flex items-center gap-1">
        {stars.map((s) => {
          const active = s <= value;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled || !onChange}
              onClick={() => onChange?.(s)}
              className={classNames(
                "w-8 h-8 rounded-full border border-border-secondary inline-flex items-center justify-center",
                "hover:bg-bg-secondary transition-colors",
                (disabled || !onChange) && "opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
              aria-label={`Rate ${s} of ${max}`}
            >
              <span className={classNames(active ? "text-text-primary" : "text-text-tertiary")}>★</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;

