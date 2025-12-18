import React from "react";
import classNames from "classnames";

export interface ErrorBannerProps {
  title?: string;
  message: string | React.ReactNode;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  testId?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  onDismiss,
  className,
  testId = "error-banner",
}) => {
  return (
    <div
      className={classNames(
        "w-full rounded-2xl border border-border-secondary bg-bg-secondary p-4",
        className
      )}
      role="alert"
      data-testid={testId}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-text-secondary" aria-hidden="true">
          ⚠
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-text-primary">{title}</div>
          <div className="mt-1 text-sm text-text-secondary">
            {typeof message === "string" ? <span className="whitespace-pre-wrap">{message}</span> : message}
          </div>
          {(onRetry || onDismiss) && (
            <div className="mt-3 flex items-center gap-2">
              {onRetry && (
                <button
                  type="button"
                  className="text-sm font-medium underline underline-offset-4 text-text-primary"
                  onClick={onRetry}
                >
                  Retry
                </button>
              )}
              {onDismiss && (
                <button
                  type="button"
                  className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
                  onClick={onDismiss}
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;

