import React from "react";
import { Checkbox } from "../Checkbox";
import { IColumnType } from "./types";
import { SwipeableCard } from "../SwipeableCard";

interface TableMobileCardProps<T> {
  item: T;
  columns: IColumnType<T>[];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
  swipeActions?: Array<{
    label: string;
    icon?: string;
    onAction: () => void;
    destructive?: boolean;
  }>;
}

/**
 * Mobile-optimized card view for table rows
 */
export function TableMobileCard<T>({
  item,
  columns,
  index,
  isSelected,
  onSelect,
  multiSelect = false,
  swipeActions,
}: TableMobileCardProps<T>): JSX.Element {
  const primaryColumn = columns[0];
  const secondaryColumns = columns.slice(1, 3); // Show first 2 secondary columns on mobile

  const cardContent = (
    <div
      className={`p-4 rounded-lg border border-border-secondary ${
        isSelected ? "bg-primary-50 border-primary-300" : "bg-bg-primary"
      }`}
      onClick={!multiSelect ? onSelect : undefined}
    >
      {/* Primary column (title) */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          {multiSelect && (
            <Checkbox
              id={`mobile-row-checkbox-${index}`}
              checked={isSelected ? "basic" : "unchecked"}
              label=""
              onChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="flex-1">
            {primaryColumn.render
              ? primaryColumn.render(primaryColumn, item)
              : (item as any)[primaryColumn.key]}
          </div>
        </div>
      </div>

      {/* Secondary columns */}
      {secondaryColumns.length > 0 && (
        <div className="space-y-1.5 mt-3 pt-3 border-t border-border-secondary">
          {secondaryColumns.map((column, colIndex) => (
            <div key={`mobile-col-${colIndex}`} className="flex justify-between">
              <span className="text-xs font-medium text-text-quaternary">
                {column.title}:
              </span>
              <span className="text-sm text-text-secondary text-right">
                {column.render
                  ? column.render(column, item)
                  : (item as any)[column.key]}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Show more indicator if there are more columns */}
      {columns.length > 3 && (
        <div className="mt-2 text-xs text-text-quaternary">
          +{columns.length - 3} more
        </div>
      )}
    </div>
  );

  // Wrap in SwipeableCard if swipe actions are provided
  if (swipeActions && swipeActions.length > 0) {
    return (
      <SwipeableCard
        swipeLeftActions={swipeActions.map((action) => ({
          label: action.label,
          icon: action.icon,
          onAction: action.onAction,
          destructive: action.destructive,
        }))}
      >
        {cardContent}
      </SwipeableCard>
    );
  }

  return <div>{cardContent}</div>;
}

