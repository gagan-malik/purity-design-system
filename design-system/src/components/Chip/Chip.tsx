import React from "react";
import classNames from "classnames";

export type ChipVariant = "soft" | "outline";
export type ChipTone = "neutral" | "brand";

export interface ChipProps {
  /**
   * Preferred: render label via children.
   */
  children?: React.ReactNode;
  /**
   * Back-compat.
   * @deprecated Prefer `children`.
   */
  label?: string;
  variant?: ChipVariant;
  tone?: ChipTone;
  disabled?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  testId?: string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  label,
  variant = "soft",
  tone = "neutral",
  disabled = false,
  onRemove,
  onClick,
  startIcon,
  endIcon,
  className,
  testId = "chip",
}) => {
  const content = children ?? label;
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium";
  const tones: Record<ChipTone, { soft: string; outline: string }> = {
    neutral: {
      soft: "bg-bg-secondary border-border-secondary text-text-secondary",
      outline: "bg-transparent border-border-secondary text-text-secondary",
    },
    brand: {
      soft: "bg-utility-brand-50 border-utility-brand-200 text-utility-brand-700",
      outline: "bg-transparent border-utility-brand-200 text-utility-brand-700",
    },
  };

  return (
    <span
      className={classNames(base, tones[tone][variant], disabled && "opacity-50", className)}
      data-testid={testId}
      role="group"
      aria-disabled={disabled || undefined}
    >
      {startIcon ? <span className="inline-flex items-center" aria-hidden>{startIcon}</span> : null}
      {onClick ? (
        <button
          type="button"
          className={classNames(
            "text-left",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-button-ringBrandShadowSm rounded-full"
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {content}
        </button>
      ) : (
        <span>{content}</span>
      )}
      {endIcon ? <span className="inline-flex items-center" aria-hidden>{endIcon}</span> : null}
      {onRemove && (
        <button
          type="button"
          className={classNames(
            "rounded-full w-6 h-6 inline-flex items-center justify-center border border-border-secondary",
            "hover:bg-bg-active transition-colors",
            disabled && "cursor-not-allowed hover:bg-transparent"
          )}
          aria-label={`Remove ${typeof content === "string" ? content : "chip"}`}
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

