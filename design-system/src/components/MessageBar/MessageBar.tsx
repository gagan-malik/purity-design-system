import React from "react";
import classNames from "classnames";

export type MessageBarVariant = "info" | "success" | "warning" | "error";

export interface MessageBarProps {
  variant?: MessageBarVariant;
  message: string | React.ReactNode;
  actions?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
  testId?: string;
}

const styles: Record<MessageBarVariant, string> = {
  info: "bg-bg-secondary border-border-secondary text-text-primary",
  success: "bg-bg-secondary border-border-secondary text-text-primary",
  warning: "bg-bg-secondary border-border-secondary text-text-primary",
  error: "bg-bg-secondary border-border-secondary text-text-primary",
};

const icon: Record<MessageBarVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "⛔",
};

export const MessageBar: React.FC<MessageBarProps> = ({
  variant = "info",
  message,
  actions,
  onDismiss,
  className,
  testId = "message-bar",
}) => {
  return (
    <div
      className={classNames(
        "w-full rounded-2xl border px-4 py-3 flex items-start justify-between gap-3",
        styles[variant],
        className
      )}
      role={variant === "error" ? "alert" : "status"}
      data-testid={testId}
    >
      <div className="flex items-start gap-3 min-w-0">
        <span className="mt-0.5 text-text-secondary" aria-hidden="true">
          {icon[variant]}
        </span>
        <div className="min-w-0 text-sm">
          {typeof message === "string" ? <span className="whitespace-pre-wrap">{message}</span> : message}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {actions}
        {onDismiss && (
          <button
            type="button"
            className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBar;

