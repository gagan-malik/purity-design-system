import React from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

export interface SheetProps {
  /** Whether the sheet is open */
  open: boolean;
  /** Callback when sheet should close */
  onClose: () => void;
  /** Side to open from */
  side?: "top" | "right" | "bottom" | "left";
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Sheet - Side panel drawer component
 * Perfect for filters, details panel, and side navigation
 */
export const Sheet: React.FC<SheetProps> = ({
  open,
  onClose,
  side = "right",
  children,
  className = "",
  testId = "sheet",
}) => {
  const slideVariants = {
    right: { x: "100%", xOpen: 0 },
    left: { x: "-100%", xOpen: 0 },
    top: { y: "-100%", yOpen: 0 },
    bottom: { y: "100%", yOpen: 0 },
  };

  const variant = slideVariants[side];

  const positionClasses = {
    right: "inset-y-0 right-0",
    left: "inset-y-0 left-0",
    top: "inset-x-0 top-0",
    bottom: "inset-x-0 bottom-0",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-overlay z-[998]"
          />

          {/* Sheet */}
          <motion.div
            initial={variant}
            animate={side === "top" || side === "bottom" ? { y: variant.yOpen } : { x: variant.xOpen }}
            exit={variant}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={classNames(
              "fixed z-[999] bg-bg-primary shadow-3xl",
              positionClasses[side],
              side === "top" || side === "bottom" ? "max-h-[90vh]" : "w-full max-w-md",
              className
            )}
            data-testid={testId}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sheet;

