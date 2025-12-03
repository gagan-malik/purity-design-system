import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { Loader } from "../Loader";

export interface PullToRefreshProps {
  /** Callback when refresh is triggered */
  onRefresh: () => Promise<void> | void;
  /** Whether refresh is in progress */
  isRefreshing?: boolean;
  /** Threshold in pixels to trigger refresh */
  threshold?: number;
  /** Pull indicator content */
  pullIndicator?: React.ReactNode;
  /** Release indicator content */
  releaseIndicator?: React.ReactNode;
  /** Refreshing indicator content */
  refreshingIndicator?: React.ReactNode;
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * PullToRefresh - Native mobile pull-to-refresh pattern
 * Pull down to trigger refresh callback
 */
export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  isRefreshing = false,
  threshold = 80,
  pullIndicator,
  releaseIndicator,
  refreshingIndicator,
  children,
  className = "",
  testId = "pull-to-refresh",
  disabled = false,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [canRelease, setCanRelease] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  useEffect(() => {
    if (isRefreshing && pullDistance > 0) {
      setPullDistance(0);
      setIsPulling(false);
      setCanRelease(false);
    }
  }, [isRefreshing, pullDistance]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || window.scrollY > 0) return;

    startYRef.current = e.touches[0].clientY;
    setIsPulling(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || !isPulling || window.scrollY > 0) return;

    currentYRef.current = e.touches[0].clientY;
    const distance = currentYRef.current - startYRef.current;

    if (distance > 0) {
      e.preventDefault();
      const pullDist = Math.min(distance * 0.5, threshold * 1.5);
      setPullDistance(pullDist);
      setCanRelease(pullDist >= threshold);
    }
  };

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing || !isPulling) return;

    if (canRelease && pullDistance >= threshold) {
      await onRefresh();
    }

    setPullDistance(0);
    setIsPulling(false);
    setCanRelease(false);
  };

  const pullPercentage = Math.min((pullDistance / threshold) * 100, 150);
  const rotation = pullPercentage * 1.8;

  const defaultPullIndicator = (
    <div className="flex items-center gap-2 text-text-quaternary">
      <svg
        className="w-5 h-5 transition-transform"
        style={{ transform: `rotate(${rotation}deg)` }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
      <span className="text-sm">Pull to refresh</span>
    </div>
  );

  const defaultReleaseIndicator = (
    <div className="flex items-center gap-2 text-primary-600">
      <svg
        className="w-5 h-5 transition-transform"
        style={{ transform: `rotate(180deg)` }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
      <span className="text-sm font-semibold">Release to refresh</span>
    </div>
  );

  const defaultRefreshingIndicator = (
    <div className="flex items-center gap-2 text-primary-600">
      <Loader size="sm" />
      <span className="text-sm font-semibold">Refreshing...</span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={classNames("relative", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-testid={testId}
    >
      {/* Pull indicator */}
      <div
        className={classNames(
          "absolute left-0 right-0 flex items-center justify-center transition-all duration-200",
          pullDistance > 0 ? "opacity-100" : "opacity-0"
        )}
        style={{
          top: `${-60 + pullDistance * 0.3}px`,
          height: "60px",
        }}
      >
        {isRefreshing
          ? refreshingIndicator || defaultRefreshingIndicator
          : canRelease
          ? releaseIndicator || defaultReleaseIndicator
          : pullIndicator || defaultPullIndicator}
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${Math.max(0, pullDistance * 0.5)}px)`,
          transition: isRefreshing ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;

