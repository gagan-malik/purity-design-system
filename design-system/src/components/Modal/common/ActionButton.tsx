import React from "react";

interface IActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "tertiary";
  disabled?: boolean;
}

const ActionButton = (props: IActionButtonProps) => {
  const { children, onClick, variant = "primary", disabled = false } = props;

  return (
    <button
      disabled={disabled}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg ${
        variant === "primary" ? "bg-blue-600 text-N-600" : "text-neutral-500"
      }  text-center text-N-0 text-base font-medium cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
