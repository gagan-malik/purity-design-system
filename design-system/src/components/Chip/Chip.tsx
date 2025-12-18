import React from "react";
import classNames from "classnames";

export type ChipVariant = "default" | "secondary";

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
  testId?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = "default",
  disabled = false,
  onRemove,
  onClick,
  className,
  testId = "chip",
}) => {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm";
  const variants: Record<ChipVariant, string> = {
    default: "bg-bg-primary border-border-secondary text-text-primary",
    secondary: "bg-bg-secondary border-border-secondary text-text-secondary",
  };

  return (
    <span
      className={classNames(base, variants[variant], disabled && "opacity-50", className)}
      data-testid={testId}
    >
      <button
        type="button"
        className={classNames("text-left", !onClick && "cursor-default")}
        onClick={onClick}
        disabled={disabled || !onClick}
      >
        {label}
      </button>
      {onRemove && (
        <button
          type="button"
          className={classNames(
            "rounded-full w-6 h-6 inline-flex items-center justify-center border border-border-secondary",
            "hover:bg-bg-active transition-colors",
            disabled && "cursor-not-allowed hover:bg-transparent"
          )}
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          disabled={disabled}
        >
          <span className="text-xs">×</span>
        </button>
      )}
    </span>
  );
};

export default Chip;

