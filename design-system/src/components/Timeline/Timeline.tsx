import React from "react";
import classNames from "classnames";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  testId?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  className,
  testId = "timeline",
}) => {
  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-4", className)} data-testid={testId}>
      <div className="space-y-4">
        {items.map((it, idx) => (
          <div key={it.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-border-secondary bg-bg-secondary flex items-center justify-center">
                {it.icon ?? <span className="text-xs">•</span>}
              </div>
              {idx < items.length - 1 && <div className="w-px flex-1 bg-border-secondary mt-2" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-text-primary">{it.title}</div>
                {it.time && <div className="text-xs text-text-tertiary font-mono">{it.time}</div>}
              </div>
              {it.description && <div className="mt-1 text-sm text-text-secondary">{it.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

