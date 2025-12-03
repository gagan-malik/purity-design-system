import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export interface CommandMenuItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  keywords?: string[];
  group?: string;
  onSelect: () => void;
}

export interface CommandMenuProps {
  /** Whether menu is open */
  open: boolean;
  /** Callback when menu should close */
  onClose: () => void;
  /** Menu items */
  items: CommandMenuItem[];
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * CommandMenu - Command palette (Cmd+K style)
 * Perfect for quick actions, search commands, and keyboard navigation
 */
export const CommandMenu: React.FC<CommandMenuProps> = ({
  open,
  onClose,
  items,
  placeholder = "Type a command or search...",
  className = "",
  testId = "command-menu",
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) => {
    if (!query) return true;
    const searchTerm = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(searchTerm) ||
      item.keywords?.some((kw) => kw.toLowerCase().includes(searchTerm))
    );
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const group = item.group || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, CommandMenuItem[]>);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].onSelect();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredItems, selectedIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-bg-overlay/50 backdrop-blur-sm z-[9999] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
      data-testid={testId}
    >
      <div
        className="w-full max-w-lg bg-bg-primary rounded-lg shadow-3xl border border-border-secondary overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-3 border-b border-border-secondary">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-text-primary placeholder-text-placeholder"
          />
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {Object.entries(groupedItems).map(([group, groupItems]) => (
            <div key={group}>
              <div className="px-3 py-2 text-xs font-semibold text-text-quaternary uppercase">
                {group}
              </div>
              {groupItems.map((item, index) => {
                const globalIndex = filteredItems.indexOf(item);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      item.onSelect();
                      onClose();
                    }}
                    className={classNames(
                      "w-full px-3 py-2 flex items-center gap-3 text-left",
                      "hover:bg-bg-secondary transition-colors",
                      selectedIndex === globalIndex && "bg-bg-secondary"
                    )}
                  >
                    {item.icon && (
                      <span className="w-5 h-5">
                        {typeof item.icon === "string" ? (
                          <img src={item.icon} alt="" />
                        ) : (
                          item.icon
                        )}
                      </span>
                    )}
                    <span className="text-text-primary">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;

