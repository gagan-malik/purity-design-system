import React, { FunctionComponent, useMemo } from 'react';

export type WorkflowStatus = 'draft' | 'active' | 'archived';

export interface WorkflowCardProps {
  /** The title of the workflow */
  title: string;
  /** The description of the workflow */
  description: string;
  /** URL of the avatar image */
  avatarUrl?: string;
  /** Background color class for the card */
  bgColor?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional menu click handler */
  onMenuClick?: (e: React.MouseEvent) => void;
  /** Optional custom class names */
  className?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state */
  error?: Error;
  /** Status of the workflow */
  status?: WorkflowStatus;
  /** Error handler callback */
  onError?: (error: Error) => void;
}

const LoadingSkeleton: React.FC = () => (
  <div className="inline-flex flex-col h-[144px] rounded-[32px] bg-gray-100 dark:bg-gray-800 p-4 animate-pulse">
    <div className="flex flex-col h-full min-w-fit">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="w-32 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
      <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

const EmptyState: React.FC<{ message?: string }> = ({ message = "No workflow data available" }) => (
  <div className="inline-flex flex-col h-[144px] rounded-[32px] bg-gray-50 dark:bg-gray-800 p-4">
    <div className="flex items-center justify-center h-full">
      <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>
    </div>
  </div>
);

export const WorkflowCard: FunctionComponent<WorkflowCardProps> = ({
  title,
  description,
  avatarUrl,
  bgColor = "bg-gray-100",
  onClick,
  onMenuClick,
  className = "",
  isLoading = false,
  error,
  status = 'active',
  onError,
}) => {
  // Error handling function
  const handleError = (error: Error) => {
    console.error("[WorkflowCard] Error:", error);
    onError?.(error);
  };

  // Safe getter for initial letter
  const getInitial = useMemo(() => {
    try {
      if (!title || typeof title !== 'string') return '';
      return title.charAt(0).toUpperCase();
    } catch (error) {
      handleError(error as Error);
      return '';
    }
  }, [title]);

  // Loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return <EmptyState message={`Error: ${error.message}`} />;
  }

  // Empty state
  if (!title || !description) {
    return <EmptyState />;
  }

  // Click handlers with error boundaries
  const handleClick = () => {
    try {
      onClick?.();
    } catch (error) {
      handleError(error as Error);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    try {
      e.stopPropagation();
      onMenuClick?.(e);
    } catch (error) {
      handleError(error as Error);
    }
  };

  // Status indicator styles
  const statusStyles = {
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };

  try {
    return (
      <div 
        onClick={handleClick}
        className={`inline-flex flex-col h-[144px] rounded-[32px] ${bgColor} p-4 box-border text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer whitespace-normal ${className}`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <div className="flex flex-col h-full min-w-fit">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none' }}
              >
                {!avatarUrl && (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{getInitial}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-5">{title}</div>
                {status && (
                  <div className={`text-xs px-2 py-0.5 rounded-full mt-1 ${statusStyles[status]}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={handleMenuClick}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 dark:text-gray-400">
                <path d="M10.0001 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 9.99998C10.8334 9.53974 10.4603 9.16665 10.0001 9.16665C9.53984 9.16665 9.16675 9.53974 9.16675 9.99998C9.16675 10.4602 9.53984 10.8333 10.0001 10.8333Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.0001 4.99998C10.4603 4.99998 10.8334 4.62688 10.8334 4.16665C10.8334 3.70641 10.4603 3.33331 10.0001 3.33331C9.53984 3.33331 9.16675 3.70641 9.16675 4.16665C9.16675 4.62688 9.53984 4.99998 10.0001 4.99998Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.0001 16.6666C10.4603 16.6666 10.8334 16.2935 10.8334 15.8333C10.8334 15.3731 10.4603 15 10.0001 15C9.53984 15 9.16675 15.3731 9.16675 15.8333C9.16675 16.2935 9.53984 16.6666 10.0001 16.6666Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-5 max-w-[280px] line-clamp-3">
            {description}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    handleError(error as Error);
    return <EmptyState message="Error displaying workflow card" />;
  }
};

export default WorkflowCard; 