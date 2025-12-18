import React from "react";
import classNames from "classnames";

export interface ConversationItem {
  id: string;
  title: string;
  updatedAt?: string;
  pinned?: boolean;
  unreadCount?: number;
}

export interface ConversationListProps {
  conversations: ConversationItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string, title: string) => void;
  searchable?: boolean;
  className?: string;
  testId?: string;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  onDelete,
  onRename,
  searchable = true,
  className,
  testId = "conversation-list",
}) => {
  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  return (
    <div className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary p-3", className)} data-testid={testId}>
      {searchable && (
        <input
          type="search"
          className="w-full rounded-2xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-brand focus:border-border-brand"
          placeholder="Search conversations…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      <div className={classNames("mt-3 space-y-2", !searchable && "mt-0")}>
        {filtered.map((c) => {
          const active = c.id === selectedId;
          return (
            <div
              key={c.id}
              className={classNames(
                "rounded-2xl border border-border-secondary px-3 py-2",
                active ? "bg-bg-secondary" : "bg-bg-primary hover:bg-bg-secondary",
                "transition-colors"
              )}
            >
              <button
                type="button"
                className="w-full text-left"
                onClick={() => onSelect?.(c.id)}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-text-primary truncate">
                      {c.pinned ? "📌 " : ""}
                      {c.title}
                    </div>
                    {c.updatedAt && (
                      <div className="text-xs text-text-tertiary font-mono">
                        {c.updatedAt}
                      </div>
                    )}
                  </div>
                  {c.unreadCount ? (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-border-secondary bg-bg-active">
                      {c.unreadCount}
                    </span>
                  ) : null}
                </div>
              </button>

              {(onRename || onDelete) && (
                <div className="mt-2 flex items-center justify-end gap-3">
                  {onRename && (
                    <button
                      type="button"
                      className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
                      onClick={() => {
                        const next = window.prompt("Rename conversation", c.title);
                        if (!next) return;
                        onRename(c.id, next);
                      }}
                    >
                      Rename
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      className="text-sm font-medium underline underline-offset-4 text-text-tertiary"
                      onClick={() => onDelete(c.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-sm text-text-tertiary px-2 py-3">No conversations found.</div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;

