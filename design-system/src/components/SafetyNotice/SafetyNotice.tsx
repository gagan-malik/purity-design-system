import React from "react";
import classNames from "classnames";

export type SafetyNoticeVariant = "info" | "warning" | "danger";

export interface SafetyNoticeProps {
  variant?: SafetyNoticeVariant;
  title: string;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  testId?: string;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({
  variant = "info",
  title,
  description,
  actions,
  className,
  testId = "safety-notice",
}) => {
  const styles: Record<SafetyNoticeVariant, string> = {
    info: "bg-bg-secondary border-border-secondary",
    warning: "bg-bg-secondary border-border-secondary",
    danger: "bg-bg-secondary border-border-secondary",
  };

  const icon: Record<SafetyNoticeVariant, string> = {
    info: "ℹ",
    warning: "⚠",
    danger: "⛔",
  };

  return (
    <div
      className={classNames("w-full rounded-3xl border p-4", styles[variant], className)}
      role={variant === "danger" ? "alert" : "status"}
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-text-secondary" aria-hidden="true">
          {icon[variant]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-text-primary">{title}</div>
          {description && (
            <div className="mt-1 text-sm text-text-secondary">
              {typeof description === "string" ? <span className="whitespace-pre-wrap">{description}</span> : description}
            </div>
          )}
          {actions && <div className="mt-3">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default SafetyNotice;

