import React, { useEffect, useState } from "react";
import { ButtonV2 } from "../../../ButtonV2/ButtonV2";
import { Icons } from "../../../Icons/Icons";

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
        <div className="mr-2">
          <ButtonV2
            onClick={onBack}
            size="sm"
            hierarchy="tertiary"
            shape="rounded"
            iconOnly={true}
            aria-label="Back"
          >
            <Icons name="chevron-left" size="sm" />
          </ButtonV2>
        </div>
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
          <ButtonV2
            onClick={onClose}
            size="sm"
            hierarchy="tertiary"
            shape="rounded"
            iconOnly={true}
            aria-label="Close settings"
          >
            <Icons name="close" size="sm" />
          </ButtonV2>
        </div>
      )}
    </div>
  );
};

export default SettingsModalHeader; 