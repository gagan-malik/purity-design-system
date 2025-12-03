import React, { useState } from "react";
import classNames from "classnames";

export interface NavigationMenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavigationMenuItem[];
  icon?: string | React.ReactNode;
}

export interface NavigationMenuProps {
  /** Menu items */
  items: NavigationMenuItem[];
  /** Active item */
  activeItem?: string;
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * NavigationMenu - Horizontal navigation with mega menus
 * Perfect for main navigation and header menus
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activeItem,
  orientation = "horizontal",
  className = "",
  testId = "navigation-menu",
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleItemClick = (item: NavigationMenuItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.children && item.children.length > 0) {
      setOpenSubmenu(openSubmenu === item.label ? null : item.label);
    }
  };

  return (
    <nav
      className={classNames(
        "flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      data-testid={testId}
    >
      {items.map((item, index) => {
        const hasSubmenu = item.children && item.children.length > 0;
        const isActive = activeItem === item.label;
        const isSubmenuOpen = openSubmenu === item.label;

        return (
          <div key={index} className="relative">
            <button
              onClick={() => handleItemClick(item)}
              className={classNames(
                "px-4 py-2 font-medium text-sm transition-colors",
                "hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500",
                isActive
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-text-secondary",
                orientation === "vertical" && "w-full text-left"
              )}
            >
              {item.label}
              {hasSubmenu && (
                <svg
                  className={classNames(
                    "ml-1 w-4 h-4 inline transition-transform",
                    isSubmenuOpen && "transform rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>

            {/* Submenu */}
            {hasSubmenu && isSubmenuOpen && (
              <div
                className={classNames(
                  "absolute z-50 bg-bg-primary border border-border-secondary rounded-lg shadow-xl py-2 min-w-[200px]",
                  orientation === "horizontal" ? "top-full mt-1" : "left-full ml-1"
                )}
              >
                {item.children!.map((child, childIndex) => (
                  <a
                    key={childIndex}
                    href={child.href}
                    onClick={child.onClick}
                    className="block px-4 py-2 text-sm text-text-primary hover:bg-bg-secondary"
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;

