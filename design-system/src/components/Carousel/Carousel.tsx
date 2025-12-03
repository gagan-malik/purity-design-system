import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../../hooks";

export interface CarouselProps {
  /** Array of carousel items */
  items: React.ReactNode[];
  /** Whether to auto-play */
  autoPlay?: boolean;
  /** Auto-play interval in milliseconds */
  autoPlayInterval?: number;
  /** Whether to show indicators */
  showIndicators?: boolean;
  /** Whether to show navigation arrows */
  showArrows?: boolean;
  /** Whether to loop */
  loop?: boolean;
  /** Initial slide index */
  defaultIndex?: number;
  /** Controlled slide index */
  currentIndex?: number;
  /** Callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Carousel - Image/content carousel component
 * Perfect for image galleries, testimonials, and featured content
 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  loop = true,
  defaultIndex = 0,
  currentIndex: controlledIndex,
  onSlideChange,
  className = "",
  testId = "carousel",
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;

  const goToSlide = (index: number) => {
    if (loop) {
      const newIndex = index < 0 ? items.length - 1 : index >= items.length ? 0 : index;
      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      onSlideChange?.(newIndex);
    } else {
      const newIndex = Math.max(0, Math.min(items.length - 1, index));
      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      onSlideChange?.(newIndex);
    }
  };

  const goToNext = () => goToSlide(currentIndex + 1);
  const goToPrev = () => goToSlide(currentIndex - 1);

  useEffect(() => {
    if (autoPlay && !isPaused && items.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, isPaused, currentIndex, items.length, autoPlayInterval]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (items.length === 0) return null;

  return (
    <div
      className={classNames("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {/* Carousel Items */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={classNames(
              "absolute left-4 top-1/2 -translate-y-1/2 z-10",
              "p-2 rounded-full bg-bg-overlay/50 backdrop-blur-sm text-white",
              "hover:bg-bg-overlay/70 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-white",
              isMobile && "p-1.5"
            )}
            aria-label="Previous slide"
          >
            <svg
              className={classNames("w-5 h-5", isMobile && "w-4 h-4")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className={classNames(
              "absolute right-4 top-1/2 -translate-y-1/2 z-10",
              "p-2 rounded-full bg-bg-overlay/50 backdrop-blur-sm text-white",
              "hover:bg-bg-overlay/70 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-white",
              isMobile && "p-1.5"
            )}
            aria-label="Next slide"
          >
            <svg
              className={classNames("w-5 h-5", isMobile && "w-4 h-4")}
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
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={classNames(
                "rounded-full transition-all",
                currentIndex === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

