import React from "react";
import classNames from "classnames";

export type ApprovalRisk = "low" | "medium" | "high";

export interface ApprovalCardProps {
  title: string;
  description?: string | React.ReactNode;
  risk?: ApprovalRisk;
  approveLabel?: string;
  rejectLabel?: string;
  onApprove: () => void;
  onReject: () => void;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

function riskLabel(risk: ApprovalRisk) {
  switch (risk) {
    case "low":
      return "Low risk";
    case "medium":
      return "Medium risk";
    case "high":
      return "High risk";
  }
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  title,
  description,
  risk = "medium",
  approveLabel = "Approve",
  rejectLabel = "Reject",
  onApprove,
  onReject,
  disabled = false,
  className,
  testId = "approval-card",
}) => {
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
          <div className="text-sm font-semibold text-text-primary">{title}</div>
          {description && (
            <div className="mt-1 text-sm text-text-secondary">
              {typeof description === "string" ? (
                <span className="whitespace-pre-wrap">{description}</span>
              ) : (
                description
              )}
            </div>
          )}
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full border border-border-secondary bg-bg-secondary text-text-tertiary">
          {riskLabel(risk)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          className={classNames(
            "rounded-full px-4 py-2 text-sm font-semibold",
            "border border-border-secondary bg-bg-primary hover:bg-bg-secondary transition-colors",
            disabled && "opacity-50 cursor-not-allowed hover:bg-bg-primary"
          )}
          onClick={onReject}
          disabled={disabled}
        >
          {rejectLabel}
        </button>
        <button
          type="button"
          className={classNames(
            "rounded-full px-4 py-2 text-sm font-semibold",
            "bg-bg-active text-text-primary border border-border-secondary hover:bg-bg-secondary transition-colors",
            disabled && "opacity-50 cursor-not-allowed hover:bg-bg-active"
          )}
          onClick={onApprove}
          disabled={disabled}
        >
          {approveLabel}
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;

