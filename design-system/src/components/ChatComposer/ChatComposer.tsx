import React from "react";
import classNames from "classnames";

export interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onStop?: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Whether generation is currently in progress (shows Stop) */
  isGenerating?: boolean;
  /** Optional footer slot (attachments, hints, etc.) */
  footer?: React.ReactNode;
  className?: string;
  testId?: string;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  value,
  onChange,
  onSubmit,
  onStop,
  placeholder = "Message…",
  disabled = false,
  isGenerating = false,
  footer,
  className,
  testId = "chat-composer",
}) => {
  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-3", className)} data-testid={testId}>
      <div className="flex items-end gap-3">
        <textarea
          className={classNames(
            "min-h-[44px] max-h-[240px] w-full resize-none rounded-2xl bg-bg-primary px-3 py-2 text-sm text-text-primary",
            "border border-border-primary focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (disabled) return;
              if (isGenerating) return;
              onSubmit?.();
            }
          }}
        />

        {isGenerating ? (
          <button
            type="button"
            className={classNames(
              "rounded-full px-4 py-2 text-sm font-semibold",
              "border border-border-secondary bg-bg-secondary hover:bg-bg-active transition-colors",
              (disabled || !onStop) && "opacity-50 cursor-not-allowed hover:bg-bg-secondary"
            )}
            onClick={onStop}
            disabled={disabled || !onStop}
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            className={classNames(
              "rounded-full px-4 py-2 text-sm font-semibold",
              "bg-bg-active text-text-primary border border-border-secondary hover:bg-bg-secondary transition-colors",
              (disabled || !onSubmit || !value.trim()) && "opacity-50 cursor-not-allowed hover:bg-bg-active"
            )}
            onClick={onSubmit}
            disabled={disabled || !onSubmit || !value.trim()}
          >
            Send
          </button>
        )}
      </div>

      {footer && <div className="mt-3">{footer}</div>}
    </div>
  );
};

export default ChatComposer;

