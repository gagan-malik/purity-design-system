import React from "react";
import classNames from "classnames";
import { Popover } from "../Popover";

export interface SourceItem {
  id: string;
  title: string;
  url?: string;
  snippet?: string;
}

export interface CitationProps {
  /** 1-based number usually shown as [1], [2], ... */
  index: number;
  /** Sources to display */
  sources: SourceItem[];
  /** Optional label (e.g. "Sources") */
  label?: string;
  className?: string;
  testId?: string;
}

export const Citation: React.FC<CitationProps> = ({
  index,
  sources,
  label = "Sources",
  className,
  testId = "citation",
}) => {
  return (
    <span className={classNames("inline-flex", className)} data-testid={testId}>
      <Popover
        placement="bottom"
        trigger={
          <button
            type="button"
            className="text-xs align-super rounded-md px-1.5 py-0.5 border border-border-secondary bg-bg-secondary hover:bg-bg-active transition-colors"
            aria-label={`Open ${label} ${index}`}
          >
            [{index}]
          </button>
        }
        content={
          <div className="w-[360px] max-w-[80vw]">
            <div className="text-xs font-semibold text-text-primary mb-2">{label}</div>
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.id} className="space-y-1">
                  <div className="text-sm font-medium text-text-primary">
                    {s.url ? (
                      <a className="underline underline-offset-4" href={s.url} target="_blank" rel="noreferrer">
                        {s.title}
                      </a>
                    ) : (
                      s.title
                    )}
                  </div>
                  {s.snippet && <div className="text-xs text-text-tertiary">{s.snippet}</div>}
                </div>
              ))}
            </div>
          </div>
        }
      />
    </span>
  );
};

export default Citation;

