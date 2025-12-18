import React from "react";
import classNames from "classnames";

export type ToggleTone = "brand" | "success" | "warning" | "danger";
export type ToggleSize = "sm" | "md" | "lg";
export type ToggleVariant = "default" | "ios";

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked" | "defaultChecked" | "onChange" | "size"
  > {
  id: string;
  label?: React.ReactNode;
  labelPosition?: "left" | "right";

  /** New API */
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  disabled?: boolean;
  variant?: ToggleVariant;
  size?: ToggleSize;
  tone?: ToggleTone;

  /** Back-compat API (deprecated) */
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "primary" | "success" | "warning" | "error";
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  labelPosition = "right",
  checked: checkedProp,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  variant = "default",
  size = "md",
  tone,
  // back-compat
  isChecked,
  onChange,
  color,
  className,
  ...rest
}) => {
  const isControlled = typeof checkedProp === "boolean" || typeof isChecked === "boolean";
  const initial = typeof defaultChecked === "boolean" ? defaultChecked : Boolean(isChecked);
  const [uncontrolled, setUncontrolled] = React.useState<boolean>(initial);

  const checked = typeof checkedProp === "boolean" ? checkedProp : typeof isChecked === "boolean" ? isChecked : uncontrolled;

  const resolvedTone: ToggleTone =
    tone ||
    (color === "success"
      ? "success"
      : color === "warning"
        ? "warning"
        : color === "error"
          ? "danger"
          : "brand");

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) setUncontrolled(next);
    onCheckedChange?.(next);
    onChange?.(next);
  };

  const sizeClasses: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
    sm: { track: "w-9 h-5", thumb: "w-4 h-4", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
  };

  const tones: Record<ToggleTone, { on: string; ring: string }> = {
    brand: { on: "bg-bg-brand-solid", ring: "focus-visible:ring-button-ringBrandShadowSm" },
    success: { on: "bg-success-solid", ring: "focus-visible:ring-button-ringGrayShadowSm" },
    warning: { on: "bg-warning-solid", ring: "focus-visible:ring-button-ringGrayShadowSm" },
    danger: { on: "bg-error-solid", ring: "focus-visible:ring-button-ringErrorShadowSm" },
  };

  const sizeConfig = sizeClasses[size];
  const trackColor = checked ? tones[resolvedTone].on : "bg-bg-tertiary";

  const root = classNames(
    "inline-flex items-center",
    labelPosition === "right" ? "flex-row" : "flex-row-reverse",
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    className
  );

  const labelSpacing = labelPosition === "right" ? "ml-3" : "mr-3";

  return (
    <label htmlFor={id} className={root}>
      {label && <span className={classNames("text-text-secondary font-medium", labelSpacing)}>{label}</span>}

      <span className="relative inline-flex">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          {...rest}
        />

        <span
          aria-hidden
          className={classNames(
            "block rounded-full transition-colors duration-300 ease-in-out",
            sizeConfig.track,
            trackColor,
            variant === "ios" && "shadow-inner",
            "peer-focus-visible:outline-none peer-focus-visible:ring-4",
            tones[resolvedTone].ring
          )}
        />

        <span
          aria-hidden
          className={classNames(
            "absolute left-0.5 top-0.5 rounded-full transition-transform duration-300 ease-in-out",
            sizeConfig.thumb,
            "bg-fg-white shadow",
            checked && sizeConfig.translate,
            variant === "ios" ? "shadow-lg" : "shadow-sm"
          )}
        />
      </span>
    </label>
  );
};