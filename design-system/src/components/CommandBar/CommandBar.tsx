import React from "react";
import classNames from "classnames";
import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";

export interface CommandAction {
  key: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  /** Higher number = more likely to stay visible */
  priority?: number;
}

export interface CommandBarProps {
  actions: CommandAction[];
  maxVisible?: number;
  className?: string;
  testId?: string;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  actions,
  maxVisible = 4,
  className,
  testId = "command-bar",
}) => {
  const sorted = [...actions].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  const visible = sorted.slice(0, maxVisible);
  const overflow = sorted.slice(maxVisible);

  const overflowItems: DropdownMenuItem[] = overflow.map((a) => ({
    label: a.label,
    onClick: a.onClick,
    disabled: a.disabled,
    icon: a.icon,
  }));

  return (
    <div
      className={classNames(
        "inline-flex items-center gap-2 rounded-2xl border border-border-secondary bg-bg-primary px-2 py-2",
        className
      )}
      data-testid={testId}
    >
      {visible.map((a) => (
        <button
          key={a.key}
          type="button"
          onClick={a.onClick}
          disabled={a.disabled}
          className={classNames(
            "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
            "hover:bg-bg-secondary transition-colors",
            a.disabled ? "opacity-50 cursor-not-allowed hover:bg-transparent" : "text-text-primary"
          )}
        >
          {a.icon}
          {a.label}
        </button>
      ))}

      {overflow.length > 0 && (
        <DropdownMenu
          trigger={
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-text-primary hover:bg-bg-secondary"
            >
              More
            </button>
          }
          items={overflowItems}
        />
      )}
    </div>
  );
};

export default CommandBar;

