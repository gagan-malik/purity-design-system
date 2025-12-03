import React, { useState, useEffect } from "react";
import { TableHeader } from "./TableHeader";
import { TableHeaderEnhanced } from "./TableHeaderEnhanced";
import { TableRow } from "./TableRow";
import { TableMobileCard } from "./TableMobileCard";
import { IColumnType } from "./types";
import arrowleft from "../../assets/icons/arrow-left.svg";
import arrowright from "../../assets/icons/arrow-right.svg";
import { Button } from "../Button";
import tripleDot from "../../assets/icons/dotsvertical.svg";
import { useIsMobile } from "../../hooks";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
  TableTitle: string | JSX.Element;
  style?: React.CSSProperties;
  itemsPerPage?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  paginationEnabled?: boolean;
  headerAction?: JSX.Element;
  onPerformAction?: (selectedRows: number[]) => void;
  showTopSection?: boolean;
  multiSelect?: boolean;
  /** Mobile: View mode for mobile devices */
  mobileView?: "table" | "cards";
  /** Mobile: Swipe actions for mobile card view */
  mobileSwipeActions?: Array<{
    label: string;
    icon?: string;
    onAction: (rowIndex: number) => void;
    destructive?: boolean;
  }>;
  /** Enable sorting */
  sortable?: boolean;
  /** Enable filtering */
  filterable?: boolean;
  /** Enable column resizing */
  resizable?: boolean;
}

export function Table<T>({
  data,
  columns,
  TableTitle,
  style,
  itemsPerPage = 2,
  currentPage = 1,
  totalPages =  1,
  onPageChange,
  headerAction,
  paginationEnabled = true,
  onPerformAction,
  showTopSection = true,
  multiSelect = true,
  mobileView = "cards",
  mobileSwipeActions,
  sortable = false,
  filterable = false,
  resizable = false,
}: Props<T>): JSX.Element {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    columns.forEach((col) => {
      if (col.width) widths[col.key] = col.width;
    });
    return widths;
  });
  const isMobile = useIsMobile();
  
  // Apply sorting
  let processedData = [...data];
  if (sortable && sortColumn) {
    const column = columns.find((col) => col.key === sortColumn);
    if (column?.sortable) {
      processedData.sort((a, b) => {
        if (column.sortFn) {
          return column.sortFn(a, b) * (sortDirection === "asc" ? 1 : -1);
        }
        // Default sort
        const aVal = (a as any)[sortColumn];
        const bVal = (b as any)[sortColumn];
        const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return result * (sortDirection === "asc" ? 1 : -1);
      });
    }
  }

  // Apply filters
  if (filterable) {
    processedData = processedData.filter((item) => {
      return columns.every((column) => {
        if (!column.filterable || !filters[column.key]) return true;
        if (column.filterFn) {
          return column.filterFn(item, filters[column.key]);
        }
        // Default filter
        const value = String((item as any)[column.key] || "").toLowerCase();
        return value.includes(filters[column.key].toLowerCase());
      });
    });
  }
  
  const startIndex = 0;
  const endIndex = itemsPerPage;
  const currentData = processedData;

  

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const currentPageRowIndexes = currentData.map((_, index) => startIndex + index);
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, ...currentPageRowIndexes]);
    } else {
      const currentPageRowIndexes = currentData.map((_, index) => startIndex + index);
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((index) => !currentPageRowIndexes.includes(index))
      );
    }
  };

  const handleRowSelect = (index: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index)
        : [...prevSelectedRows, index]
    );
  };

  const isAllSelected = () => currentData.every((_, index) => selectedRows.includes(startIndex + index));

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleSort = (columnKey: string) => {
    if (!sortable) return;
    
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleResize = (columnKey: string, width: number) => {
    setColumnWidths((prev) => ({ ...prev, [columnKey]: width }));
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= 4 && currentPage <= totalPages - 5) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  // Mobile card view
  if (isMobile && mobileView === "cards") {
    return (
      <div className="w-full" style={style}>
        {showTopSection && (
          <div className="w-full flex justify-between py-5 px-4">
            <div className="text-lg font-semibold text-text-primary">
              {TableTitle || "Table Title"}
            </div>
            <div className="flex items-center space-x-3">
              {headerAction || (
                <img
                  src={tripleDot}
                  alt="Options"
                  className="cursor-pointer"
                />
              )}
              {onPerformAction && (
                <Button
                  color="primary"
                  onClick={() => onPerformAction(selectedRows)}
                  disabled={selectedRows.length === 0}
                >
                  Perform Action
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Mobile card view */}
        <div className="space-y-3 px-4">
          {currentData.map((item, index) => {
            const rowIndex = startIndex + index;
            const swipeActions = mobileSwipeActions?.map((action) => ({
              label: action.label,
              icon: action.icon,
              onAction: () => action.onAction(rowIndex),
              destructive: action.destructive,
            }));

            return (
              <TableMobileCard
                key={`mobile-card-${rowIndex}`}
                item={item}
                columns={columns}
                index={rowIndex}
                isSelected={selectedRows.includes(rowIndex)}
                onSelect={() => handleRowSelect(rowIndex)}
                multiSelect={multiSelect}
                swipeActions={swipeActions}
              />
            );
          })}
        </div>

        {/* Mobile pagination */}
        {paginationEnabled && totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-4">
            <Button
              color="secondary"
              imgSrc={arrowleft}
              shape="circle"
              size="md"
              variant="filled"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            />
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              color="secondary"
              imgSrc={arrowright}
              shape="circle"
              size="md"
              variant="filled"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </div>
        )}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="w-full" style={style}>
      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full align-middle w-full overflow-hidden rounded-[24px] border border-gray-300 dark:border-[#21262D]">
          {showTopSection && <div className="w-full flex justify-between py-5 px-6">
            <div className="text-lg font-semibold text-text-primary">
              {TableTitle || "Table Title"}
            </div>
            <div className="flex items-center space-x-3">
              {headerAction || (
                <img
                  src={tripleDot}
                  alt="Options"
                  className="cursor-pointer"
                />
              )}
              {onPerformAction && (
                <Button
                  color="primary"
                  onClick={() => onPerformAction(selectedRows)}
                  disabled={selectedRows.length === 0}
                >
                  Perform Action
                </Button>
              )}
            </div>
          </div>}
          <table className="rounded-[24px] min-w-full w-full dark:border-[#21262D] divide-y divide-gray-300 dark:divide-[#21262D]">
            <thead>
              {(sortable || resizable) ? (
                <TableHeaderEnhanced
                  columns={isMobile ? columns.slice(0, 2) : columns}
                  TableTitle={TableTitle}
                  selectAll={isAllSelected()}
                  onSelectAll={handleSelectAll}
                  multiSelect={multiSelect}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  columnWidths={columnWidths}
                  onResize={handleResize}
                />
              ) : (
                <TableHeader
                  columns={isMobile ? columns.slice(0, 2) : columns}
                  TableTitle={TableTitle}
                  selectAll={isAllSelected()}
                  onSelectAll={handleSelectAll}
                  multiSelect={multiSelect}
                />
              )}
            </thead>
            <tbody>
              {!isMobile || mobileView === "table" ? (
                <TableRow
                  data={currentData}
                  columns={isMobile ? columns.slice(0, 2) : columns}
                  selectedRows={selectedRows}
                  onRowSelect={handleRowSelect}
                  startIndex={startIndex}
                  multiSelect={multiSelect}
                />
              ) : null}
            </tbody>
            {paginationEnabled && totalPages > 1 && (
              <tfoot>
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-4">
                    <div className="flex justify-between items-center">
                      {isMobile ? (
                        <Button
                          color="secondary"
                          imgSrc={arrowleft}
                          shape="circle"
                          size="md"
                          variant="filled"
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      ) : (
                        <Button
                          color="secondary"
                          imagePlacement="left"
                          imgSrc={arrowleft}
                          shape="circle"
                          size="md"
                          variant="filled"
                          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                      )}

                      {isMobile ? (
                        <span className="text-gray-700">
                          Page {currentPage} of {totalPages}
                        </span>
                      ) : (
                        <div className="flex items-center space-x-1 mx-4">
                          {getPageNumbers().map((pageNumber, index) =>
                            typeof pageNumber === "number" ? (
                              <button
                                key={index}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`p-3 ${currentPage === pageNumber
                                  ? "bg-bg-secondary text-text-secondary font-bold rounded-xl"
                                  : "bg-bg-primary text-text-secondary"
                                  }`}
                              >
                                {pageNumber}
                              </button>
                            ) : (
                              <span key={index} className="p-3 text-gray-400">
                                {pageNumber}
                              </span>
                            )
                          )}
                        </div>
                      )}

                      {isMobile ? (
                        <Button
                          color="secondary"
                          imgSrc={arrowright}
                          shape="circle"
                          size="md"
                          variant="filled"
                          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        />
                      ) : (
                        <Button
                          color="secondary"
                          imagePlacement="right"
                          imgSrc={arrowright}
                          shape="circle"
                          size="md"
                          variant="filled"
                          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
