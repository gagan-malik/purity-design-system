import React from "react";
import classNames from "classnames";
import { DropdownMenu, DropdownMenuItem } from "../DropdownMenu";

export interface MenubarMenu {
  label: string;
  items: DropdownMenuItem[];
}

export interface MenubarProps {
  menus: MenubarMenu[];
  className?: string;
  testId?: string;
}

export const Menubar: React.FC<MenubarProps> = ({
  menus,
  className,
  testId = "menubar",
}) => {
  return (
    <div
      className={classNames(
        "inline-flex items-center gap-1 rounded-2xl border border-border-secondary bg-bg-primary p-1",
        className
      )}
      data-testid={testId}
      role="menubar"
    >
      {menus.map((m) => (
        <DropdownMenu
          key={m.label}
          placement="bottom-left"
          trigger={
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm font-semibold text-text-primary hover:bg-bg-secondary"
            >
              {m.label}
            </button>
          }
          items={m.items}
        />
      ))}
    </div>
  );
};

export default Menubar;

