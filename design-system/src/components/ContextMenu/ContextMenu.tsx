import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useLongPress } from "../../hooks";
import { useIsMobile } from "../../hooks";

export interface ContextMenuItem {
  label: string;
  icon?: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
}

export interface ContextMenuProps {
  /** Menu items */
  items: ContextMenuItem[];
  /** Children to attach context menu to */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ContextMenu - Right-click/long-press menu
 * Perfect for contextual actions and right-click menus
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className = "",
  testId = "context-menu",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { handlers } = useLongPress({
    onLongPress: () => {
      setIsOpen(true);
    },
    threshold: 500,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      
      // Adjust position if menu goes off screen
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const newPosition = { ...position };
        
        if (rect.right > window.innerWidth) {
          newPosition.x = window.innerWidth - rect.width - 10;
        }
        if (rect.bottom > window.innerHeight) {
          newPosition.y = window.innerHeight - rect.height - 10;
        }
        
        if (newPosition.x !== position.x || newPosition.y !== position.y) {
          setPosition(newPosition);
        }
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, position]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled || item.separator) return;
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div
      className={classNames("relative", className)}
      onContextMenu={handleContextMenu}
      {...(isMobile ? handlers : {})}
      data-testid={testId}
    >
      {children}

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed z-[9999] bg-bg-primary border border-border-secondary rounded-lg shadow-xl py-1 min-w-[200px]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {items.map((item, index) => {
            if (item.separator) {
              return (
                <div
                  key={`separator-${index}`}
                  className="h-px bg-border-secondary my-1"
                />
              );
            }

            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={classNames(
                  "w-full px-4 py-2 text-left flex items-center gap-3 text-sm",
                  "hover:bg-bg-secondary transition-colors",
                  item.destructive && "text-error-600",
                  !item.destructive && "text-text-primary",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {item.icon && (
                  <span className="w-4 h-4">
                    {typeof item.icon === "string" ? (
                      <img src={item.icon} alt="" />
                    ) : (
                      item.icon
                    )}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;

