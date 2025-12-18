import React from "react";
import classNames from "classnames";
import { ChatMessage, ChatMessageProps } from "../ChatMessage";

export interface ChatMessageListProps {
  messages: Array<Omit<ChatMessageProps, "testId"> & { id: string }>;
  /** Auto-scroll to bottom when messages append */
  autoScroll?: boolean;
  /** Show “new messages” button when user scrolled up */
  showNewMessagesHint?: boolean;
  className?: string;
  testId?: string;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  autoScroll = true,
  showNewMessagesHint = true,
  className,
  testId = "chat-message-list",
}) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = React.useState(true);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const onScroll = () => {
      const threshold = 120;
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
      setIsNearBottom(distance < threshold);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll as any);
  }, []);

  React.useEffect(() => {
    if (!autoScroll) return;
    if (!isNearBottom) return;
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, autoScroll, isNearBottom]);

  const showHint = showNewMessagesHint && !isNearBottom;

  return (
    <div className={classNames("relative w-full", className)} data-testid={testId}>
      <div
        ref={rootRef}
        className="max-h-[70vh] overflow-auto rounded-3xl border border-border-secondary bg-bg-primary p-4 space-y-4"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} {...m} />
        ))}
        <div ref={endRef} />
      </div>

      {showHint && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-secondary hover:bg-bg-active transition-colors shadow-sm"
            onClick={() => endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" })}
          >
            New messages
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;

