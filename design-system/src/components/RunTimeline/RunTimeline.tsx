import React from "react";
import classNames from "classnames";

export type RunStepStatus = "pending" | "running" | "succeeded" | "failed";

export interface RunStep {
  id: string;
  title: string;
  description?: string;
  status: RunStepStatus;
  meta?: React.ReactNode;
  content?: React.ReactNode;
}

export interface RunTimelineProps {
  steps: RunStep[];
  className?: string;
  testId?: string;
}

function dotClass(status: RunStepStatus) {
  switch (status) {
    case "pending":
      return "bg-bg-secondary border-border-secondary";
    case "running":
      return "bg-bg-active border-border-secondary";
    case "succeeded":
      return "bg-bg-primary border-border-secondary";
    case "failed":
      return "bg-bg-secondary border-border-secondary";
  }
}

export const RunTimeline: React.FC<RunTimelineProps> = ({
  steps,
  className,
  testId = "run-timeline",
}) => {
  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="space-y-4">
        {steps.map((s, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={s.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={classNames("w-3 h-3 rounded-full border", dotClass(s.status))} />
                {!isLast && <div className="w-px flex-1 bg-border-secondary mt-2" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-text-primary">{s.title}</div>
                  {s.meta && <div className="text-xs text-text-tertiary font-mono">{s.meta}</div>}
                </div>
                {s.description && <div className="mt-1 text-sm text-text-secondary">{s.description}</div>}
                {s.content && <div className="mt-3">{s.content}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RunTimeline;

