import React from "react";
import classNames from "classnames";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the label is required */
  required?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Label - Accessible form label component
 * Properly associates labels with form inputs
 */
export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  className = "",
  testId = "label",
  ...props
}) => {
  return (
    <label
      className={classNames(
        "block text-sm font-medium text-text-tertiary mb-2",
        className
      )}
      data-testid={testId}
      {...props}
    >
      {children}
      {required && (
        <span className="text-text-warning-primary ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

export default Label;

