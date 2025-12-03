import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Content to display in popover */
  content: React.ReactNode;
  /** Placement */
  placement?: "top" | "bottom" | "left" | "right";
  /** Whether popover is open (controlled) */
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
 * Popover - Floating popup component
 * Perfect for additional controls and inline editing
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className = "",
  testId = "popover",
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let x = 0;
      let y = 0;

      switch (placement) {
        case "top":
          x = rect.left + rect.width / 2;
          y = rect.top;
          break;
        case "bottom":
          x = rect.left + rect.width / 2;
          y = rect.bottom;
          break;
        case "left":
          x = rect.left;
          y = rect.top + rect.height / 2;
          break;
        case "right":
          x = rect.right;
          y = rect.top + rect.height / 2;
          break;
      }

      setPosition({ x, y });
    }
  }, [open, placement]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        if (!isControlled) {
          setInternalOpen(false);
        }
        onOpenChange?.(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, isControlled, onOpenChange]);

  const handleToggle = () => {
    const newOpen = !open;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className={classNames("relative inline-block", className)} data-testid={testId}>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>

      {open && (
        <div
          ref={popoverRef}
          className={classNames(
            "fixed z-[9999] bg-bg-primary border border-border-secondary rounded-lg shadow-xl p-4",
            placementClasses[placement]
          )}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;

