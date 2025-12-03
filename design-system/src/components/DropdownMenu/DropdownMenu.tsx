import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

export interface DropdownMenuItem {
  label: string;
  icon?: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  children?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Menu items */
  items: DropdownMenuItem[];
  /** Placement */
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Whether menu is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * DropdownMenu - Enhanced dropdown with keyboard navigation and sub-menus
 * More sophisticated than basic Dropdown
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  placement = "bottom-left",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className = "",
  testId = "dropdown-menu",
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHoveredIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, items.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHoveredIndex((prev) =>
          prev === null ? items.length - 1 : Math.max(prev - 1, 0)
        );
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (hoveredIndex !== null && items[hoveredIndex]) {
          const item = items[hoveredIndex];
          if (item.children) {
            setOpenSubmenu(item.label);
          } else if (!item.disabled && item.onClick) {
            item.onClick();
            handleClose();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, hoveredIndex, items]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleToggle = () => {
    const newOpen = !open;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setHoveredIndex(null);
      setOpenSubmenu(null);
    }
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalOpen(false);
    }
    onOpenChange?.(false);
    setHoveredIndex(null);
    setOpenSubmenu(null);
  };

  const placementClasses = {
    "top-left": "bottom-full right-0 mb-2",
    "top-right": "bottom-full left-0 mb-2",
    "bottom-left": "top-full right-0 mt-2",
    "bottom-right": "top-full left-0 mt-2",
  };

  const renderMenuItem = (item: DropdownMenuItem, index: number, level = 0) => {
    if (item.separator) {
      return (
        <div
          key={`separator-${index}`}
          className="h-px bg-border-secondary my-1"
        />
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isHovered = hoveredIndex === index;

    return (
      <div key={index} className="relative">
        <button
          onClick={() => {
            if (hasChildren) {
              setOpenSubmenu(openSubmenu === item.label ? null : item.label);
            } else if (!item.disabled && item.onClick) {
              item.onClick();
              handleClose();
            }
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          disabled={item.disabled}
          className={classNames(
            "w-full px-4 py-2 text-left flex items-center justify-between gap-3 text-sm",
            "hover:bg-bg-secondary transition-colors",
            isHovered && "bg-bg-secondary",
            item.disabled && "opacity-50 cursor-not-allowed",
            !item.disabled && "cursor-pointer"
          )}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <span className="w-4 h-4">
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt="" />
                ) : (
                  item.icon
                )}
              </span>
            )}
            <span className="text-text-primary">{item.label}</span>
          </div>
          {hasChildren && (
            <svg
              className="w-4 h-4 text-text-quaternary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {/* Submenu */}
        {hasChildren && openSubmenu === item.label && (
          <div
            className={classNames(
              "absolute z-50 bg-bg-primary border border-border-secondary rounded-lg shadow-xl py-1 min-w-[200px]",
              "top-0 left-full ml-2"
            )}
          >
            {item.children!.map((child, childIndex) =>
              renderMenuItem(child, childIndex, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames("relative inline-block", className)}
      ref={menuRef}
      data-testid={testId}
    >
      <div onClick={handleToggle}>{trigger}</div>

      {open && (
        <div
          className={classNames(
            "absolute z-[9999] bg-bg-primary border border-border-secondary rounded-lg shadow-xl py-1 min-w-[200px]",
            placementClasses[placement]
          )}
        >
          {items.map((item, index) => renderMenuItem(item, index))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

