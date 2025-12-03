import React, { useState, useRef } from "react";
import classNames from "classnames";
import { useSwipe } from "../../hooks";
import { motion, AnimatePresence } from "framer-motion";

export interface SwipeAction {
  /** Label for the action */
  label: string;
  /** Background color for the action area */
  color?: string;
  /** Icon for the action */
  icon?: string | React.ReactNode;
  /** Callback when action is triggered */
  onAction: () => void;
  /** Whether this is a destructive action */
  destructive?: boolean;
}

export interface SwipeableCardProps {
  /** Card content */
  children: React.ReactNode;
  /** Actions available on swipe left */
  swipeLeftActions?: SwipeAction[];
  /** Actions available on swipe right */
  swipeRightActions?: SwipeAction[];
  /** Threshold in pixels to trigger swipe */
  swipeThreshold?: number;
  /** Whether swipe is enabled */
  enabled?: boolean;
  /** Callback when swipe starts */
  onSwipeStart?: () => void;
  /** Callback when swipe ends */
  onSwipeEnd?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * SwipeableCard - A card component with swipe actions
 * Supports swipe left/right to reveal action buttons
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  swipeLeftActions = [],
  swipeRightActions = [],
  swipeThreshold = 100,
  enabled = true,
  onSwipeStart,
  onSwipeEnd,
  className = "",
  testId = "swipeable-card",
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const hasLeftActions = swipeLeftActions.length > 0;
  const hasRightActions = swipeRightActions.length > 0;

  // Determine which action to show based on swipe direction
  const activeActions = swipeOffset > 0 ? swipeRightActions : swipeLeftActions;
  const actionWidth = activeActions.length * 80; // Approximate width per action

  const { swipeHandlers } = useSwipe({
    onSwipeLeft: enabled && hasLeftActions
      ? () => {
          if (Math.abs(swipeOffset) >= swipeThreshold) {
            // Auto-swipe to reveal actions
            setSwipeOffset(-actionWidth);
            setIsSwipeActive(true);
          }
        }
      : undefined,
    onSwipeRight: enabled && hasRightActions
      ? () => {
          if (swipeOffset >= swipeThreshold) {
            setSwipeOffset(actionWidth);
            setIsSwipeActive(true);
          }
        }
      : undefined,
    threshold: swipeThreshold,
  });

  const handleAction = (action: SwipeAction) => {
    action.onAction();
    // Reset swipe after action
    setSwipeOffset(0);
    setIsSwipeActive(false);
  };

  const handleReset = () => {
    setSwipeOffset(0);
    setIsSwipeActive(false);
    onSwipeEnd?.();
  };

  // Render action buttons
  const renderActions = (actions: SwipeAction[], position: "left" | "right") => {
    if (actions.length === 0) return null;

    return (
      <div
        className={classNames(
          "absolute top-0 bottom-0 flex items-center",
          position === "left" ? "left-0" : "right-0"
        )}
      >
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action)}
            className={classNames(
              "h-full px-6 flex items-center justify-center gap-2 text-white font-semibold",
              action.destructive ? "bg-error-600" : action.color || "bg-primary-600",
              "transition-colors hover:opacity-90"
            )}
            style={{ minWidth: "80px" }}
          >
            {action.icon && (
              <span>
                {typeof action.icon === "string" ? (
                  <img src={action.icon} alt={action.label} className="w-5 h-5" />
                ) : (
                  action.icon
                )}
              </span>
            )}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      className={classNames("relative overflow-hidden rounded-lg", className)}
      data-testid={testId}
      {...(enabled ? swipeHandlers : {})}
    >
      {/* Action buttons - Left */}
      {hasLeftActions && renderActions(swipeLeftActions, "left")}

      {/* Action buttons - Right */}
      {hasRightActions && renderActions(swipeRightActions, "right")}

      {/* Card content */}
      <motion.div
        className="relative bg-bg-primary rounded-lg"
        animate={{
          x: swipeOffset,
        }}
        drag={enabled ? "x" : false}
        dragConstraints={{
          left: hasRightActions ? -actionWidth : 0,
          right: hasLeftActions ? actionWidth : 0,
        }}
        dragElastic={0.2}
        onDrag={(_, info) => {
          setSwipeOffset(info.offset.x);
          if (Math.abs(info.offset.x) > 10) {
            setIsSwipeActive(true);
            onSwipeStart?.();
          }
        }}
        onDragEnd={(_, info) => {
          const threshold = swipeThreshold;
          const velocity = info.velocity.x;

          // Determine final position based on drag distance and velocity
          if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
            if (info.offset.x > 0 && hasRightActions) {
              setSwipeOffset(actionWidth);
            } else if (info.offset.x < 0 && hasLeftActions) {
              setSwipeOffset(-actionWidth);
            } else {
              handleReset();
            }
          } else {
            handleReset();
          }
        }}
        whileTap={{ scale: enabled && !isSwipeActive ? 0.98 : 1 }}
      >
        {children}

        {/* Reset overlay when swiped */}
        {isSwipeActive && (
          <div
            className="absolute inset-0 bg-transparent z-10"
            onClick={handleReset}
            aria-label="Reset swipe"
          />
        )}
      </motion.div>
    </div>
  );
};

export default SwipeableCard;

