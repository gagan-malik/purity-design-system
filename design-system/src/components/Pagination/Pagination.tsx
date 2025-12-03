import React from "react";
import classNames from "classnames";
import { useIsMobile } from "../../hooks";

export interface PaginationProps {
  /** Current page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of pages to show on each side of current page */
  siblingCount?: number;
  /** Whether to show first/last page buttons */
  showFirstLast?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Pagination - Page navigation component
 * Perfect for table pagination, list pagination, and content navigation
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
  testId = "pagination",
}) => {
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 5; // current + 2 siblings on each side + first + last
    const totalBlocks = totalNumbers + 2; // + ellipsis on each side

    if (totalPages <= totalBlocks) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftEllipsis = leftSiblingIndex > 2;
      const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
        // Show left pages without ellipsis
        for (let i = 1; i <= 3 + siblingCount * 2; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
        // Show right pages without ellipsis
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - (2 + siblingCount * 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show both ellipsis
        pages.push(1);
        pages.push("ellipsis");
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const buttonClass = (page: number) =>
    classNames(
      "min-w-[2.5rem] h-10 px-3 rounded-lg font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-primary-500",
      page === currentPage
        ? "bg-primary-600 text-white"
        : "bg-bg-primary text-text-primary hover:bg-bg-secondary border border-border-secondary"
    );

  return (
    <nav
      className={classNames("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
      data-testid={testId}
    >
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => handlePageClick(1)}
          className={buttonClass(-1)}
          aria-label="First page"
        >
          {isMobile ? "«" : "First"}
        </button>
      )}

      {/* Previous Page */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={classNames(
          buttonClass(-1),
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Previous page"
      >
        {isMobile ? "‹" : "Previous"}
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-text-quaternary"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={buttonClass(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={classNames(
          buttonClass(-1),
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
        aria-label="Next page"
      >
        {isMobile ? "›" : "Next"}
      </button>

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => handlePageClick(totalPages)}
          className={buttonClass(-1)}
          aria-label="Last page"
        >
          {isMobile ? "»" : "Last"}
        </button>
      )}
    </nav>
  );
};

export default Pagination;

