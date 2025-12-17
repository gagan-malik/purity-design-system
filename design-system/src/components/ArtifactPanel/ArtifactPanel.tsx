import React from "react";
import classNames from "classnames";

export interface ArtifactPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "right" | "left";
  width?: number;
  className?: string;
  testId?: string;
}

export const ArtifactPanel: React.FC<ArtifactPanelProps> = ({
  open,
  onClose,
  title = "Artifact",
  children,
  position = "right",
  width = 420,
  className,
  testId = "artifact-panel",
}) => {
  if (!open) return null;

  const side = position === "right" ? "right-0" : "left-0";

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-bg-overlay backdrop-filter backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      />
      <div
        className={classNames(
          "absolute top-0 bottom-0",
          side,
          "bg-bg-primary border-l border-border-secondary shadow-3xl",
          className
        )}
        style={{ width }}
        data-testid={testId}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between gap-3 p-4 border-b border-border-secondary">
            <div className="text-sm font-semibold text-text-primary truncate">{title}</div>
            <button
              type="button"
              className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactPanel;

