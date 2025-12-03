import React, { useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string;
  /** Header content */
  header: React.ReactNode;
  /** Body content */
  content: React.ReactNode;
  /** Whether this item is initially open */
  defaultOpen?: boolean;
  /** Whether this item can be toggled */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItem[];
  /** Whether multiple items can be open at once */
  allowMultiple?: boolean;
  /** Callback when item is toggled */
  onToggle?: (itemId: string, isOpen: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Variant style */
  variant?: "default" | "bordered" | "separated";
  /** Test ID for testing */
  testId?: string;
}

/**
 * Accordion - Collapsible content sections
 * Perfect for FAQs, expandable sections, and nested navigation
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  onToggle,
  className = "",
  variant = "default",
  testId = "accordion",
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
  );

  const handleToggle = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item?.disabled) return;

    setOpenItems((prev) => {
      const isOpen = prev.has(itemId);
      const newSet = new Set(prev);

      if (allowMultiple) {
        if (isOpen) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
      } else {
        // Only allow one open at a time
        if (isOpen) {
          newSet.delete(itemId);
        } else {
          newSet.clear();
          newSet.add(itemId);
        }
      }

      onToggle?.(itemId, !isOpen);
      return newSet;
    });
  };

  const variantClasses = {
    default: "space-y-2",
    bordered: "space-y-2 border border-border-secondary rounded-lg overflow-hidden",
    separated: "space-y-4",
  };

  return (
    <div
      className={classNames(variantClasses[variant], className)}
      data-testid={testId}
    >
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const isDisabled = item.disabled ?? false;

        return (
          <div
            key={item.id}
            className={classNames(
              "overflow-hidden",
              variant === "bordered" && "border-b border-border-secondary last:border-b-0"
            )}
          >
            <button
              onClick={() => handleToggle(item.id)}
              disabled={isDisabled}
              className={classNames(
                "w-full flex items-center justify-between p-4 text-left transition-colors",
                "hover:bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-500",
                {
                  "opacity-50 cursor-not-allowed": isDisabled,
                  "bg-bg-secondary": isOpen,
                }
              )}
              aria-expanded={isOpen}
              aria-disabled={isDisabled}
            >
              <div className="flex-1">{item.header}</div>
              <svg
                className={classNames(
                  "w-5 h-5 text-text-quaternary transition-transform duration-200",
                  {
                    "transform rotate-180": isOpen,
                  }
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
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-text-secondary">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;

