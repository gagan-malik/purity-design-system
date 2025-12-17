import React from "react";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type ChatRole = "user" | "assistant" | "system" | "tool";

export interface ChatMessageProps {
  /** Sender role */
  role: ChatRole;
  /** Optional display name */
  name?: string;
  /** Message content (string will be rendered as markdown by default) */
  content: string | React.ReactNode;
  /** Render string content as markdown */
  markdown?: boolean;
  /** Right-to-left layout support */
  dir?: "ltr" | "rtl" | "auto";
  /** Timestamp or meta line */
  meta?: React.ReactNode;
  /** Optional leading icon/avatar */
  leading?: React.ReactNode;
  /** Optional trailing actions slot (e.g., MessageActions) */
  actions?: React.ReactNode;
  /** Container className */
  className?: string;
  /** Bubble className */
  bubbleClassName?: string;
  /** Test id */
  testId?: string;
}

const roleStyles: Record<ChatRole, { wrap: string; bubble: string; label: string }> = {
  user: {
    wrap: "justify-end",
    bubble: "bg-bg-active text-text-primary border border-border-secondary",
    label: "text-text-tertiary",
  },
  assistant: {
    wrap: "justify-start",
    bubble: "bg-bg-primary text-text-primary border border-border-secondary",
    label: "text-text-tertiary",
  },
  system: {
    wrap: "justify-center",
    bubble: "bg-bg-secondary text-text-secondary border border-border-secondary",
    label: "text-text-tertiary",
  },
  tool: {
    wrap: "justify-start",
    bubble: "bg-bg-secondary text-text-primary border border-border-secondary font-mono",
    label: "text-text-tertiary",
  },
};

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  name,
  content,
  markdown = true,
  dir = "auto",
  meta,
  leading,
  actions,
  className,
  bubbleClassName,
  testId = "chat-message",
}) => {
  const styles = roleStyles[role];

  const renderBody = () => {
    if (typeof content !== "string") return content;
    if (!markdown) return <span className="whitespace-pre-wrap break-words">{content}</span>;

    return (
      <div className="prose prose-sm max-w-none prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border-secondary prose-pre:rounded-xl prose-pre:p-3 prose-code:before:content-none prose-code:after:content-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div
      className={classNames("w-full flex", styles.wrap, className)}
      dir={dir}
      data-testid={testId}
    >
      <div className="max-w-[860px] w-full flex gap-3">
        {leading && <div className="mt-1 flex-shrink-0">{leading}</div>}
        <div className={classNames("min-w-0 flex-1", role === "user" && "flex flex-col items-end")}>
          {(name || meta || actions) && (
            <div
              className={classNames(
                "mb-1 flex items-center gap-2 text-xs",
                role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {name && <span className={classNames("font-medium", styles.label)}>{name}</span>}
              {meta && <span className={styles.label}>{meta}</span>}
              {actions && <span className="ml-auto">{actions}</span>}
            </div>
          )}
          <div
            className={classNames(
              "rounded-2xl px-4 py-3 text-sm leading-6",
              "shadow-sm",
              styles.bubble,
              bubbleClassName
            )}
          >
            {renderBody()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

