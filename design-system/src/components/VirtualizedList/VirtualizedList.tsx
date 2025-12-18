import React from "react";
import classNames from "classnames";

export interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  overscan?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  testId?: string;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  overscan = 6,
  renderItem,
  className,
  testId = "virtualized-list",
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(height / itemHeight) + overscan * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      className={classNames("w-full rounded-3xl border border-border-secondary bg-bg-primary overflow-auto", className)}
      style={{ height }}
      onScroll={(e) => setScrollTop((e.target as HTMLDivElement).scrollTop)}
      data-testid={testId}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: offsetY, left: 0, right: 0 }}>
          {items.slice(startIndex, endIndex).map((item, i) => {
            const index = startIndex + i;
            return (
              <div key={index} style={{ height: itemHeight }}>
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VirtualizedList;

