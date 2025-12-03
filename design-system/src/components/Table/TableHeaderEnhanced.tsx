import React from "react";
import classNames from "classnames";
import { IColumnType } from "./types";
import { Checkbox } from "../Checkbox";

interface Props<T> {
  columns: IColumnType<T>[];
  TableTitle: string | JSX.Element;
  selectAll: boolean;
  onSelectAll: (isChecked: boolean) => void;
  multiSelect: boolean;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (columnKey: string) => void;
  columnWidths?: Record<string, number>;
  onResize?: (columnKey: string, width: number) => void;
}

export function TableHeaderEnhanced<T>({
  columns,
  TableTitle,
  selectAll,
  onSelectAll,
  multiSelect,
  sortColumn,
  sortDirection,
  onSort,
  columnWidths,
  onResize,
}: Props<T>): JSX.Element {
  const [resizingColumn, setResizingColumn] = React.useState<string | null>(null);

  const handleResizeStart = (columnKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    setResizingColumn(columnKey);
    
    const startX = e.clientX;
    const startWidth = columnWidths?.[columnKey] || 150;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      const newWidth = Math.max(100, startWidth + diff);
      onResize?.(columnKey, newWidth);
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <tr className="bg-bg-secondary">
      <th
        className={`${multiSelect ? "px-6" : "px-9"} py-3.5 text-left text-sm font-semibold text-text-tertiary`}
        style={columnWidths?.[columns[0].key] ? { width: `${columnWidths[columns[0].key]}px` } : undefined}
      >
        <div className="flex items-center gap-3">
          {multiSelect && (
            <Checkbox
              id="select-all-checkbox"
              checked={selectAll ? "basic" : "unchecked"}
              label=""
              onChange={(newValue) => onSelectAll(newValue === "basic")}
            />
          )}
          <div className="flex items-center gap-2 flex-1">
            <span>{columns[0].title}</span>
            {columns[0].sortable && (
              <button
                onClick={() => onSort?.(columns[0].key)}
                className="hover:bg-bg-primary_hover rounded p-1"
              >
                <svg
                  className={classNames(
                    "w-4 h-4 text-text-quaternary",
                    sortColumn === columns[0].key && "text-primary-600"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      sortColumn === columns[0].key && sortDirection === "desc"
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {columns[0].resizable && (
          <div
            onMouseDown={(e) => handleResizeStart(columns[0].key, e)}
            className={classNames(
              "absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary-500",
              resizingColumn === columns[0].key && "bg-primary-500"
            )}
          />
        )}
      </th>

      {columns.slice(1).map((column, index) => (
        <th
          key={`table-header-${index}`}
          className={classNames(
            column.headerStyle ||
              "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary",
            "relative"
          )}
          style={columnWidths?.[column.key] ? { width: `${columnWidths[column.key]}px` } : undefined}
        >
          <div className="flex items-center gap-2">
            <span>{column.title}</span>
            {column.sortable && (
              <button
                onClick={() => onSort?.(column.key)}
                className="hover:bg-bg-primary_hover rounded p-1"
              >
                <svg
                  className={classNames(
                    "w-4 h-4 text-text-quaternary",
                    sortColumn === column.key && "text-primary-600"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      sortColumn === column.key && sortDirection === "desc"
                        ? "M5 15l7-7 7 7"
                        : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
              </button>
            )}
          </div>
          {column.resizable && (
            <div
              onMouseDown={(e) => handleResizeStart(column.key, e)}
              className={classNames(
                "absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary-500",
                resizingColumn === column.key && "bg-primary-500"
              )}
            />
          )}
        </th>
      ))}
    </tr>
  );
}

