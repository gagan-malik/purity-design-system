import React from "react";
import classNames from "classnames";

export interface PathStep {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface PathStepperProps {
  steps: PathStep[];
  currentId: string;
  onChange?: (id: string) => void;
  className?: string;
  testId?: string;
}

export const PathStepper: React.FC<PathStepperProps> = ({
  steps,
  currentId,
  onChange,
  className,
  testId = "path-stepper",
}) => {
  const currentIndex = Math.max(0, steps.findIndex((s) => s.id === currentId));

  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, idx) => {
          const state = idx < currentIndex ? "done" : idx === currentIndex ? "current" : "upcoming";
          return (
            <div key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                disabled={s.disabled || !onChange}
                onClick={() => onChange?.(s.id)}
                className={classNames(
                  "flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm",
                  state === "done" && "bg-bg-secondary border-border-secondary text-text-secondary",
                  state === "current" && "bg-bg-active border-border-secondary text-text-primary font-semibold",
                  state === "upcoming" && "bg-bg-primary border-border-secondary text-text-tertiary",
                  (s.disabled || !onChange) && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className={classNames("w-5 h-5 rounded-full border inline-flex items-center justify-center text-xs",
                  state === "done" ? "bg-bg-primary" : state === "current" ? "bg-bg-primary" : "bg-bg-secondary"
                )}>
                  {state === "done" ? "✓" : idx + 1}
                </span>
                <span>{s.label}</span>
              </button>
              {idx < steps.length - 1 && <span className="text-text-tertiary">→</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathStepper;

