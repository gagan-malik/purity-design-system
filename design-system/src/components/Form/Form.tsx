import React from "react";
import classNames from "classnames";

export interface FormProps {
  /** Form fields/children */
  children: React.ReactNode;
  /** Form submit handler */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Form - Form wrapper component with validation
 * Provides form context and validation utilities
 */
export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className = "",
  testId = "form",
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames("space-y-4", className)}
      data-testid={testId}
    >
      {children}
    </form>
  );
};

export default Form;

