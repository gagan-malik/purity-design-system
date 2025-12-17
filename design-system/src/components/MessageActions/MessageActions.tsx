import React from "react";
import classNames from "classnames";

export interface MessageActionsProps {
  onCopy?: () => void;
  onRegenerate?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  disabled?: boolean;
  className?: string;
  testId?: string;
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center justify-center rounded-full w-8 h-8",
        "border border-border-secondary bg-bg-primary hover:bg-bg-secondary transition-colors",
        disabled && "opacity-50 cursor-not-allowed hover:bg-bg-primary"
      )}
      aria-label={label}
      onClick={onClick}
      disabled={disabled || !onClick}
    >
      {children}
    </button>
  );
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onCopy,
  onRegenerate,
  onLike,
  onDislike,
  disabled = false,
  className,
  testId = "message-actions",
}) => {
  return (
    <div className={classNames("inline-flex items-center gap-2", className)} data-testid={testId}>
      <IconButton label="Copy" onClick={onCopy} disabled={disabled}>
        <span className="text-xs text-text-secondary">⧉</span>
      </IconButton>
      <IconButton label="Regenerate" onClick={onRegenerate} disabled={disabled}>
        <span className="text-xs text-text-secondary">↻</span>
      </IconButton>
      <IconButton label="Like" onClick={onLike} disabled={disabled}>
        <span className="text-xs text-text-secondary">👍</span>
      </IconButton>
      <IconButton label="Dislike" onClick={onDislike} disabled={disabled}>
        <span className="text-xs text-text-secondary">👎</span>
      </IconButton>
    </div>
  );
};

export default MessageActions;

