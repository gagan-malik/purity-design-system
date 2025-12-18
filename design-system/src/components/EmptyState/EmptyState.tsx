import React from "react";
import classNames from "classnames";

export interface EmptyStateProps {
  title: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  testId?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
  testId = "empty-state",
}) => {
  return (
    <div
      className={classNames(
        "w-full rounded-3xl border border-border-secondary bg-bg-primary p-8 text-center",
        className
      )}
      data-testid={testId}
    >
      {icon && <div className="mx-auto mb-3 text-text-secondary">{icon}</div>}
      <div className="text-base font-semibold text-text-primary">{title}</div>
      {description && (
        <div className="mt-2 text-sm text-text-secondary">
          {typeof description === "string" ? <span className="whitespace-pre-wrap">{description}</span> : description}
        </div>
      )}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;

