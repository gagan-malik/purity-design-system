import React from "react";
import classNames from "classnames";

export type ToolCallStatus = "queued" | "running" | "succeeded" | "failed";

export interface ToolCallCardProps {
  name: string;
  status: ToolCallStatus;
  title?: string;
  description?: string;
  input?: unknown;
  output?: unknown;
  error?: string;
  startedAt?: string;
  durationMs?: number;
  onRetry?: () => void;
  onCopyOutput?: () => void;
  className?: string;
  testId?: string;
}

function statusStyles(status: ToolCallStatus) {
  switch (status) {
    case "queued":
      return "bg-bg-secondary text-text-secondary border-border-secondary";
    case "running":
      return "bg-bg-active text-text-primary border-border-secondary";
    case "succeeded":
      return "bg-bg-primary text-text-primary border-border-secondary";
    case "failed":
      return "bg-bg-secondary text-text-primary border-border-secondary";
  }
}

function statusLabel(status: ToolCallStatus) {
  switch (status) {
    case "queued":
      return "Queued";
    case "running":
      return "Running";
    case "succeeded":
      return "Succeeded";
    case "failed":
      return "Failed";
  }
}

function pretty(v: unknown) {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

export const ToolCallCard: React.FC<ToolCallCardProps> = ({
  name,
  status,
  title,
  description,
  input,
  output,
  error,
  startedAt,
  durationMs,
  onRetry,
  onCopyOutput,
  className,
  testId = "tool-call-card",
}) => {
  const badge = statusStyles(status);

  return (
    <div
      className={classNames(
        "w-full rounded-3xl border border-border-secondary bg-bg-primary p-4",
        className
      )}
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-text-primary truncate">
              {title || name}
            </div>
            <span className={classNames("text-xs px-2 py-0.5 rounded-full border", badge)}>
              {statusLabel(status)}
            </span>
          </div>
          {description && <div className="mt-1 text-sm text-text-secondary">{description}</div>}
          {(startedAt || typeof durationMs === "number") && (
            <div className="mt-2 text-xs text-text-tertiary font-mono">
              {startedAt ? `start=${startedAt}` : ""}
              {startedAt && typeof durationMs === "number" ? " · " : ""}
              {typeof durationMs === "number" ? `duration=${durationMs}ms` : ""}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {status === "failed" && onRetry && (
            <button
              type="button"
              className="text-sm font-medium underline underline-offset-4 text-text-primary"
              onClick={onRetry}
            >
              Retry
            </button>
          )}
          {onCopyOutput && (
            <button
              type="button"
              className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
              onClick={onCopyOutput}
            >
              Copy output
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {typeof input !== "undefined" && (
          <details className="rounded-2xl border border-border-secondary bg-bg-secondary p-3" open={status !== "queued"}>
            <summary className="cursor-pointer text-sm font-semibold text-text-primary">Input</summary>
            <pre className="mt-2 overflow-auto text-xs text-text-secondary font-mono whitespace-pre-wrap break-words">
              {pretty(input)}
            </pre>
          </details>
        )}

        {typeof output !== "undefined" && (
          <details className="rounded-2xl border border-border-secondary bg-bg-secondary p-3" open={status === "succeeded"}>
            <summary className="cursor-pointer text-sm font-semibold text-text-primary">Output</summary>
            <pre className="mt-2 overflow-auto text-xs text-text-secondary font-mono whitespace-pre-wrap break-words">
              {pretty(output)}
            </pre>
          </details>
        )}

        {error && (
          <div className="rounded-2xl border border-border-secondary bg-bg-secondary p-3">
            <div className="text-sm font-semibold text-text-primary">Error</div>
            <div className="mt-1 text-sm text-text-secondary whitespace-pre-wrap">{error}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolCallCard;

