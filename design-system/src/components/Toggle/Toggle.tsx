import React, { useState } from 'react';
import classNames from 'classnames';

export interface IToggleProps {
  id: string;
  label?: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** iOS-style switch variant */
  variant?: "default" | "ios";
  /** Size of the switch */
  size?: "sm" | "md" | "lg";
  /** Show label on the right */
  labelPosition?: "left" | "right";
  /** Color variant */
  color?: "primary" | "success" | "warning" | "error";
}

export const Toggle: React.FC<IToggleProps> = ({
  id,
  label,
  isChecked,
  onChange,
  disabled = false,
  variant = "default",
  size = "md",
  labelPosition = "right",
  color = "primary",
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);
      onChange(newChecked);
    }
  };

  // Color mapping
  const colorClasses = {
    primary: checked ? "bg-blue-600" : "bg-bg-tertiary",
    success: checked ? "bg-green-600" : "bg-bg-tertiary",
    warning: checked ? "bg-yellow-600" : "bg-bg-tertiary",
    error: checked ? "bg-red-600" : "bg-bg-tertiary",
  };

  // Size mapping
  const sizeClasses = {
    sm: { track: "w-9 h-5", thumb: "w-4 h-4", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
  };

  const sizeConfig = sizeClasses[size];

  // iOS variant with smoother animations
  if (variant === "ios") {
    return (
      <label
        htmlFor={id}
        className={classNames(
          "flex items-center cursor-pointer",
          labelPosition === "right" ? "flex-row" : "flex-row-reverse",
          { "opacity-50 cursor-not-allowed": disabled }
        )}
      >
        {label && (
          <div
            className={classNames(
              "text-text-secondary font-medium",
              labelPosition === "right" ? "ml-3" : "mr-3"
            )}
          >
            {label}
          </div>
        )}
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={checked}
            onChange={handleToggle}
            disabled={disabled}
          />
          <div
            className={classNames(
              "block rounded-full transition-all duration-300 ease-in-out",
              sizeConfig.track,
              colorClasses[color],
              {
                "ring-2 ring-offset-2 ring-blue-500 ring-offset-white": checked && !disabled,
              }
            )}
          />
          <div
            className={classNames(
              "absolute left-0.5 top-0.5 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out",
              sizeConfig.thumb,
              {
                [sizeConfig.translate]: checked,
                "shadow-md": checked,
                "shadow-sm": !checked,
              }
            )}
          />
        </div>
      </label>
    );
  }

  // Default variant
  return (
    <label
      htmlFor={id}
      className={classNames(
        "flex items-center cursor-pointer",
        labelPosition === "right" ? "flex-row" : "flex-row-reverse",
        { "opacity-50 cursor-not-allowed": disabled }
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        <div
          className={classNames(
            "block rounded-full transition-colors duration-300 ease-in-out",
            sizeConfig.track,
            colorClasses[color]
          )}
        />
        <div
          className={classNames(
            "absolute left-0.5 top-0.5 bg-fg-white rounded-full shadow transition-transform duration-300 ease-in-out",
            sizeConfig.thumb,
            {
              [sizeConfig.translate]: checked,
            }
          )}
        />
      </div>
      {label && (
        <div
          className={classNames(
            "text-text-secondary font-medium",
            labelPosition === "right" ? "ml-3" : "mr-3"
          )}
        >
          {label}
        </div>
      )}
    </label>
  );
};