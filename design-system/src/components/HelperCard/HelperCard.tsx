import React, { FunctionComponent, useMemo } from 'react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  instructions?: string;
}

export interface HelperCardProps {
  /** The name/title of the helper */
  title: string;
  /** The handle/tag of the helper (without @ symbol) */
  handle: string;
  /** URL of the avatar image */
  avatarUrl?: string;
  /** Background color class for the card */
  bgColor?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional custom class names */
  className?: string;
  /** Array of tasks associated with this helper */
  tasks?: Task[];
  /** Error handler callback */
  onError?: (error: Error) => void;
  /** Loading state */
  isLoading?: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="inline-flex items-center h-[56px] rounded-2xl bg-gray-100 dark:bg-gray-800 p-4 animate-pulse">
    <div className="relative flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-col justify-center">
        <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded mt-1" />
      </div>
    </div>
  </div>
);

const EmptyState: React.FC<{ message?: string }> = ({ message = "No data available" }) => (
  <div className="inline-flex items-center h-[56px] rounded-2xl bg-gray-50 dark:bg-gray-800 p-4">
    <span className="text-sm text-gray-500 dark:text-gray-400">{message}</span>
  </div>
);

export const HelperCard: FunctionComponent<HelperCardProps> = ({
  title,
  handle,
  avatarUrl,
  bgColor = "bg-gray-100",
  onClick,
  className = "",
  tasks = [],
  onError,
  isLoading = false,
}) => {
  // Error handling function
  const handleError = (error: Error) => {
    console.error("[HelperCard] Error:", error);
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

  // Empty state
  if (!title || !handle) {
    return <EmptyState />;
  }

  // Click handler with error boundary
  const handleClick = () => {
    try {
      onClick?.();
    } catch (error) {
      handleError(error as Error);
    }
  };

  try {
    return (
      <div 
        onClick={handleClick}
        className={`inline-flex items-center h-[56px] rounded-2xl ${bgColor} p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer whitespace-nowrap ${className}`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
        <div className="relative flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : 'none' }}
          >
            {!avatarUrl && (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{getInitial}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm font-semibold text-gray-900 dark:text-white">{title}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">@{handle}</div>
          </div>
          {tasks?.length > 0 && (
            <div className="ml-2 text-xs text-gray-400 dark:text-gray-500">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    handleError(error as Error);
    return <EmptyState message="Error displaying helper card" />;
  }
};

export default HelperCard; 