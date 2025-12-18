import React from "react";
import classNames from "classnames";

export interface AttachmentItem {
  id: string;
  file: File;
  status?: "queued" | "uploading" | "uploaded" | "error";
  progress?: number; // 0-100
  error?: string;
}

export interface AttachmentPickerProps {
  /** Accept string for file input */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Current attachments (controlled) */
  attachments?: AttachmentItem[];
  /** Called when new files are selected */
  onAddFiles?: (files: FileList) => void;
  /** Called when user removes an attachment */
  onRemove?: (id: string) => void;
  /** Disable picker */
  disabled?: boolean;
  className?: string;
  testId?: string;
}

export const AttachmentPicker: React.FC<AttachmentPickerProps> = ({
  accept,
  multiple = true,
  attachments = [],
  onAddFiles,
  onRemove,
  disabled = false,
  className,
  testId = "attachment-picker",
}) => {
  const inputId = React.useId();

  return (
    <div className={classNames("w-full", className)} data-testid={testId}>
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={inputId}
          className={classNames(
            "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold",
            "border border-border-secondary bg-bg-primary hover:bg-bg-secondary transition-colors",
            disabled && "opacity-50 cursor-not-allowed hover:bg-bg-primary"
          )}
        >
          Attach
        </label>
        <input
          id={inputId}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            if (!e.target.files || !onAddFiles) return;
            onAddFiles(e.target.files);
            // reset input so selecting same file again triggers change
            e.target.value = "";
          }}
        />
        <div className="text-xs text-text-tertiary">{attachments.length ? `${attachments.length} attached` : ""}</div>
      </div>

      {attachments.length > 0 && (
        <div className="mt-3 space-y-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border-secondary bg-bg-primary px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-text-primary truncate">{a.file.name}</div>
                <div className="text-xs text-text-tertiary">
                  {a.status || "queued"}
                  {typeof a.progress === "number" ? ` · ${a.progress}%` : ""}
                  {a.error ? ` · ${a.error}` : ""}
                </div>
                {typeof a.progress === "number" && (
                  <div className="mt-2 h-1.5 w-full rounded-full bg-bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-bg-active"
                      style={{ width: `${Math.max(0, Math.min(100, a.progress))}%` }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className={classNames(
                  "text-sm font-medium underline underline-offset-4 text-text-tertiary",
                  (!onRemove || disabled) && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => onRemove?.(a.id)}
                disabled={!onRemove || disabled}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentPicker;

