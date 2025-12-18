import React from "react";
import classNames from "classnames";

export interface TokenUsageMeterProps {
  used: number;
  limit?: number;
  costUsd?: number;
  label?: string;
  className?: string;
  testId?: string;
}

export const TokenUsageMeter: React.FC<TokenUsageMeterProps> = ({
  used,
  limit,
  costUsd,
  label = "Usage",
  className,
  testId = "token-usage-meter",
}) => {
  const pct = typeof limit === "number" && limit > 0 ? Math.min(100, (used / limit) * 100) : null;

  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-text-primary">{label}</div>
          <div className="mt-1 text-sm text-text-secondary font-mono">
            {used.toLocaleString()}
            {typeof limit === "number" ? ` / ${limit.toLocaleString()} tokens` : " tokens"}
          </div>
        </div>
        {typeof costUsd === "number" && (
          <div className="text-sm text-text-tertiary font-mono">${costUsd.toFixed(4)}</div>
        )}
      </div>

      {pct !== null && (
        <div className="mt-3 h-2 w-full rounded-full bg-bg-secondary overflow-hidden">
          <div className="h-full bg-bg-active" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
};

export default TokenUsageMeter;

