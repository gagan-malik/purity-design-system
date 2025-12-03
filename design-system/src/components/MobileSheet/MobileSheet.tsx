import React, { useEffect } from "react";
import classNames from "classnames";
import { useIsMobile, useSwipe } from "../../hooks";
import { AnimatePresence, motion } from "framer-motion";

export interface MobileSheetProps {
  /** Whether the sheet is open */
  open: boolean;
  /** Callback when sheet should close */
  onClose: () => void;
  /** Snap points as percentages (e.g., [0.5, 0.9] for 50% and 90% heights) */
  snapPoints?: number[];
  /** Initial snap point index */
  defaultSnapPoint?: number;
  /** Whether sheet can be dismissed by swiping down */
  dismissible?: boolean;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Callback when backdrop is clicked */
  onBackdropClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children: React.ReactNode;
  /** Maximum height as percentage (0-1) */
  maxHeight?: number;
  /** Test ID for testing */
  testId?: string;
}

/**
 * MobileSheet - A mobile-optimized bottom sheet component
 * Slides up from the bottom with snap points and swipe-to-dismiss
 */
export const MobileSheet: React.FC<MobileSheetProps> = ({
  open,
  onClose,
  snapPoints = [0.9],
  defaultSnapPoint = 0,
  dismissible = true,
  showBackdrop = true,
  onBackdropClick,
  className = "",
  children,
  maxHeight = 0.95,
  testId = "mobile-sheet",
}) => {
  const isMobile = useIsMobile();
  const [currentSnap, setCurrentSnap] = React.useState(defaultSnapPoint);
  const [dragY, setDragY] = React.useState(0);

  const sheetRef = React.useRef<HTMLDivElement>(null);

  // Swipe down to dismiss
  const { swipeHandlers } = useSwipe({
    onSwipeDown: dismissible
      ? () => {
          const currentHeight = getCurrentHeight();
          if (currentHeight < 0.3) {
            onClose();
          }
        }
      : undefined,
    threshold: 50,
  });

  const getCurrentHeight = () => {
    if (snapPoints.length === 0) return maxHeight;
    return Math.min(snapPoints[currentSnap] || snapPoints[0], maxHeight);
  };

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Calculate transform based on snap point and drag
  const heightPercentage = getCurrentHeight();
  const translateY = open
    ? `${(1 - heightPercentage) * 100 - (dragY / window.innerHeight) * 100}%`
    : "100%";

  const handleBackdropClick = () => {
    if (onBackdropClick) {
      onBackdropClick();
    } else if (dismissible) {
      onClose();
    }
  };

  // Only show on mobile, fallback to regular modal on desktop
  if (!isMobile) {
    return null; // Or render as regular modal - handled by parent
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          {showBackdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-bg-overlay z-[998]"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
          )}

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ y: translateY }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDrag={(_, info) => {
              setDragY(Math.max(0, info.offset.y));
            }}
            onDragEnd={(_, info) => {
              const threshold = window.innerHeight * 0.2;
              const velocity = info.velocity.y;

              if (info.offset.y > threshold || velocity > 500) {
                if (dismissible) {
                  onClose();
                }
              }

              setDragY(0);
            }}
            className={classNames(
              "fixed left-0 right-0 bg-bg-primary rounded-t-3xl shadow-3xl z-[999]",
              "flex flex-col max-h-[95vh]",
              className
            )}
            style={{
              height: `${heightPercentage * 100}%`,
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
            data-testid={testId}
            {...swipeHandlers}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-border-secondary rounded-full" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSheet;

