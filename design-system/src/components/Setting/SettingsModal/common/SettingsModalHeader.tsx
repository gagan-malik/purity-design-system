import React, { useEffect, useState } from "react";

/**
 * SettingsModalHeader component for displaying the header of the settings modal
 * @param {ISettingsModalHeaderProps} props - Component props
 * @returns {React.ReactElement} SettingsModalHeader component
 */
export interface ISettingsModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Callback when close button is clicked */
  onClose: () => void;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Callback when back button is clicked (mobile only) */
  onBack?: () => void;
}

const SettingsModalHeader: React.FC<ISettingsModalHeaderProps> = ({
  onClose,
  className,
  showCloseButton = true,
  onBack,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 414);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={`flex flex-row items-center w-full relative bg-bg-primary dark:bg-[#18181B] h-[102px] pb-0 md:h-[102px] md:px-8 md:pt-4 ${isMobile ? '' : 'px-8'} ${className || ''}`}
      style={{ boxSizing: 'border-box' }}
      {...props}
    >
      {/* Back button for mobile only */}
      {isMobile && onBack && (
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F3F3] dark:hover:bg-[#27272A] text-[#232326] dark:text-white mr-2"
          onClick={onBack}
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {/* Title container, left aligned, flex-1 */}
      <div className="flex-1 flex items-center h-full">
        <span
          className={
            isMobile
              ? "w-fit mt-[-1px] font-semibold text-[#141414] dark:text-white text-xl leading-7 whitespace-nowrap font-inter"
              : "text-[28px] font-semibold text-black dark:text-white text-left font-inter leading-none"
          }
        >
          Settings
        </span>
      </div>
      {/* 8px gap between title and close button */}
      <div className="w-2" />
      {/* Close button container, right aligned */}
      {showCloseButton && (
        <div className="flex items-center h-full">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#232326] dark:hover:bg-[#27272A] text-[#A3A3A3]"
            onClick={onClose}
            aria-label="Close settings"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsModalHeader; 