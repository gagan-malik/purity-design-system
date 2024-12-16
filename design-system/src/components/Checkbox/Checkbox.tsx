import React from "react";
import classNames from "classnames";

interface ICheckboxProps {
  id: string;
  label?: string;
  checked: "unchecked" | "basic" | "dash" | "medium";
  disabled?: boolean;
  onChange?: (checked: "unchecked" | "basic" | "dash" | "medium") => void;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  id,
  label,
  checked,
  disabled = false,
  onChange,
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange &&
        onChange(
          checked === "unchecked"
            ? "basic"
            : checked === "basic"
            ? "dash"
            : "unchecked"
        );
    }
  };

  return (
    <label
      htmlFor={id}
      className={classNames("flex items-center cursor-pointer", {
        "opacity-50 cursor-not-allowed": disabled,
      })}
    >
      <div
        className={classNames(
          "w-5 h-5 mr-2 flex items-center justify-center rounded-sm  transition-colors",
          {
            "bg-bg-brand-solid":
              checked === "basic" || checked === "dash" || checked === "medium",
            "border border-border-primary": checked === "unchecked",
          }
        )}
        onClick={handleChange}
      >
        {checked === "basic" && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {checked === "medium" && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        {checked === "dash" && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 6H9.5"
              stroke="white"
              stroke-width="1.66666"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-text-secondary font-medium">{label}</span>}
    </label>
  );
};
