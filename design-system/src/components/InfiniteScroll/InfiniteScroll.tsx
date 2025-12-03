import React, { useEffect, useRef, useState, useCallback } from "react";
import { Loader } from "../Loader";

export interface InfiniteScrollProps {
  /** Callback when more items should be loaded */
  onLoadMore: () => Promise<void> | void;
  /** Whether more items are available */
  hasMore: boolean;
  /** Whether loading is in progress */
  isLoading?: boolean;
  /** Loading indicator component */
  loader?: React.ReactNode;
  /** End message when no more items */
  endMessage?: React.ReactNode;
  /** Threshold in pixels from bottom to trigger load */
  threshold?: number;
  /** Children content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * InfiniteScroll - Auto-load more content when scrolling near bottom
 * Mobile-optimized infinite scroll component
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  onLoadMore,
  hasMore,
  isLoading = false,
  loader,
  endMessage,
  threshold = 200,
  children,
  className = "",
  testId = "infinite-scroll",
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [onLoadMore, isLoading, isLoadingMore, hasMore]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Create Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: `${threshold}px`,
        threshold: 0.1,
      }
    );

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, isLoadingMore, threshold, handleLoadMore]);

  const defaultLoader = (
    <div className="flex justify-center py-4">
      <Loader size="sm" />
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-4 text-text-quaternary text-sm">
      No more items to load
    </div>
  );

  return (
    <div className={className} data-testid={testId}>
      {children}

      {/* Sentinel element for intersection observer */}
      <div ref={sentinelRef} className="h-1" />

      {/* Loading indicator */}
      {(isLoading || isLoadingMore) && hasMore && (loader || defaultLoader)}

      {/* End message */}
      {!hasMore && !isLoading && (endMessage || defaultEndMessage)}
    </div>
  );
};

export default InfiniteScroll;

