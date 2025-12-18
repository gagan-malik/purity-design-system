import React from "react";
import classNames from "classnames";

export type CheckboxTone = "brand" | "neutral" | "danger";
export type CheckboxSize = "sm" | "md";
export type CheckboxChecked = boolean | "indeterminate";

export type LegacyCheckboxState = "unchecked" | "basic" | "dash" | "medium";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "defaultChecked" | "onChange" | "size"
  > {
  id: string;
  label?: React.ReactNode;
  description?: React.ReactNode;

  /**
   * New API (controlled):
   * - boolean or "indeterminate"
   */
  checked?: CheckboxChecked | LegacyCheckboxState;
  /**
   * New API (uncontrolled)
   */
  defaultChecked?: CheckboxChecked;
  onCheckedChange?: (checked: CheckboxChecked) => void;

  size?: CheckboxSize;
  tone?: CheckboxTone;

  /**
   * Back-compat API (deprecated).
   * @deprecated Prefer `checked` boolean/"indeterminate" and `onCheckedChange`.
   */
  onChange?: (checked: LegacyCheckboxState) => void;
  /**
   * @deprecated Prefer `className`.
   */
  pointerClassName?: string;
}

function isLegacyState(value: unknown): value is LegacyCheckboxState {
  return value === "unchecked" || value === "basic" || value === "dash" || value === "medium";
}

function legacyToModern(value: LegacyCheckboxState): CheckboxChecked {
  if (value === "dash") return "indeterminate";
  if (value === "unchecked") return false;
  return true;
}

function modernToInput(modern: CheckboxChecked | undefined) {
  return {
    checked: modern === true,
    indeterminate: modern === "indeterminate",
  };
}

function nextLegacy(value: LegacyCheckboxState): LegacyCheckboxState {
  // Preserve previous behavior: unchecked -> basic -> dash -> unchecked
  return value === "unchecked" ? "basic" : value === "basic" ? "dash" : "unchecked";
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  onChange,
  disabled = false,
  size = "md",
  tone = "brand",
  className,
  pointerClassName = "cursor-pointer",
  ...rest
}) => {
  const isControlledLegacy = isLegacyState(checked);
  const isControlledModern = typeof checked === "boolean" || checked === "indeterminate";
  const isControlled = isControlledLegacy || isControlledModern;

  const [uncontrolled, setUncontrolled] = React.useState<CheckboxChecked>(defaultChecked ?? false);
  const currentModern: CheckboxChecked = isControlledLegacy
    ? legacyToModern(checked)
    : isControlledModern
      ? (checked as CheckboxChecked)
      : uncontrolled;

  const inputState = modernToInput(currentModern);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = inputState.indeterminate;
  }, [inputState.indeterminate]);

  const sizes: Record<CheckboxSize, { box: string; check: string }> = {
    sm: { box: "h-4 w-4", check: "h-3 w-3" },
    md: { box: "h-5 w-5", check: "h-4 w-4" },
  };

  const tones: Record<CheckboxTone, { bg: string; border: string; ring: string }> = {
    brand: { bg: "bg-bg-brand-solid", border: "border-border-primary", ring: "focus-visible:ring-button-ringBrandShadowSm" },
    neutral: { bg: "bg-bg-secondary", border: "border-border-secondary", ring: "focus-visible:ring-button-ringGrayShadowSm" },
    danger: { bg: "bg-error-solid", border: "border-border-error", ring: "focus-visible:ring-button-ringErrorShadowSm" },
  };

  const boxBase =
    "inline-flex items-center justify-center rounded-sm border transition-colors shrink-0";

  const boxVisual =
    inputState.checked || inputState.indeterminate
      ? classNames(tones[tone].bg, "border-transparent")
      : classNames("bg-bg-primary", tones[tone].border);

  const handleToggle = () => {
    if (disabled) return;

    // Legacy controlled mode
    if (isControlledLegacy) {
      const next = nextLegacy(checked);
      onChange?.(next);
      onCheckedChange?.(legacyToModern(next));
      return;
    }

    // Modern toggle: indeterminate -> true -> false
    const next: CheckboxChecked =
      currentModern === "indeterminate" ? true : !currentModern;

    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
  };

  return (
    <label
      htmlFor={id}
      className={classNames(
        "inline-flex items-start gap-2",
        disabled ? "opacity-50 cursor-not-allowed" : pointerClassName,
        className
      )}
    >
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={inputState.checked}
        disabled={disabled}
        onChange={handleToggle}
        aria-checked={inputState.indeterminate ? "mixed" : inputState.checked}
        {...rest}
      />
      <span
        aria-hidden
        className={classNames(
          boxBase,
          sizes[size].box,
          boxVisual,
          "peer-focus-visible:outline-none peer-focus-visible:ring-4",
          tones[tone].ring
        )}
      >
        {(inputState.checked || inputState.indeterminate) && (
          <svg
            className={classNames("text-text-white", sizes[size].check)}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            {inputState.indeterminate ? (
              <path
                d="M6 12h12"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M5 13l4 4L19 7"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        )}
      </span>

      {(label || description) && (
        <span className="flex flex-col">
          {label && <span className="text-text-secondary font-medium leading-5">{label}</span>}
          {description && <span className="text-text-tertiary text-sm leading-5">{description}</span>}
        </span>
      )}
    </label>
  );
};
