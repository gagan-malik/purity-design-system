import React from "react";
import classNames from "classnames";

export interface RatingProps {
  /** Controlled value */
  value?: number;
  /** Uncontrolled default value */
  defaultValue?: number;
  /**
   * New API (preferred)
   */
  onValueChange?: (value: number) => void;
  /**
   * Back-compat (deprecated)
   * @deprecated Use onValueChange.
   */
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
  testId?: string;
  /** Accessible label for the group */
  ariaLabel?: string;
  name?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  onChange,
  max = 5,
  disabled = false,
  label,
  className,
  testId = "rating",
  ariaLabel,
  name = "rating",
}) => {
  const isControlled = typeof valueProp === "number";
  const [uncontrolled, setUncontrolled] = React.useState<number>(defaultValue);
  const value = isControlled ? (valueProp as number) : uncontrolled;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  const commit = (v: number) => {
    if (disabled) return;
    if (!isControlled) setUncontrolled(v);
    onValueChange?.(v);
    onChange?.(v);
  };

  const activeIndex = Math.max(0, Math.min(max - 1, value - 1));
  return (
    <div className={classNames("inline-flex items-center gap-3", className)} data-testid={testId}>
      {label && <span className="text-sm font-semibold text-text-primary">{label}</span>}
      <div
        className="inline-flex items-center gap-1"
        role="radiogroup"
        aria-label={ariaLabel || label || "Rating"}
      >
        {stars.map((s) => {
          const active = s <= value;
          return (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={active && s === value}
              aria-label={`Rate ${s} of ${max}`}
              name={name}
              disabled={disabled}
              tabIndex={s - 1 === activeIndex ? 0 : -1}
              onClick={() => commit(s)}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  e.preventDefault();
                  commit(Math.min(max, value + 1));
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  e.preventDefault();
                  commit(Math.max(1, value - 1));
                }
                if (e.key === "Home") {
                  e.preventDefault();
                  commit(1);
                }
                if (e.key === "End") {
                  e.preventDefault();
                  commit(max);
                }
              }}
              className={classNames(
                "w-8 h-8 rounded-full border border-border-secondary inline-flex items-center justify-center",
                "hover:bg-bg-secondary transition-colors",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-button-ringBrandShadowSm",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
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

