import React, { useState, useEffect, useRef } from "react";
import { SidebarGroup } from "./SettingsModalContainer/SettingsSidebar";
import SettingsSidebar from "./SettingsModalContainer/SettingsSidebar";
import SettingsContent from "./SettingsModalContainer/SettingsContent";
import SettingsModalHeader from "./common/SettingsModalHeader";
import RightArrow from '../../assets/icons/arrow-right.svg';
import Icons from "../../Icons/Icons";
import classNames from "classnames";
import { Button, ButtonColor, ButtonVariant } from "../../Button";
import { ButtonV2 } from "../../ButtonV2/ButtonV2";
import closeIcon from "../../../assets/icons/alert/close.svg";

/**
 * SettingsModal component for displaying application settings in a modal
 * @param {ISettingsModalProps} props - Component props
 * @returns {React.ReactElement} SettingsModal component
 */
export interface ISettingsModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Groups of settings items for the sidebar */
  sidebarGroups: SidebarGroup[];
  /** Currently selected section */
  selectedSection: string;
  /** Callback when a section is selected */
  onSelectSection: (section: string) => void;
  /** Optional: map of section name to content */
  sectionContent?: Record<string, React.ReactNode>;
}

const styles = {
  // Modal container with viewport height constraints
  modalOverlay: 'fixed inset-0 flex items-center justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]',
  modalOverlayMobile: 'fixed inset-0 flex items-end justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]',
  
  // Desktop modal container
  modalClass: 'items-start df:w-full justify-center transition duration-500 ease-in-out flex flex-col rounded-3xl bg-bg-primary shadow-3xl md:w-[800px] overflow-hidden max-h-[calc(100vh-var(--spacing-4xl))]',
  
  // Mobile modal container
  modalClassMobile: 'w-[390px] max-h-[calc(100vh-var(--spacing-xl))] flex flex-col items-center justify-end pt-0 pb-6 px-0 relative rounded-t-[32px] bg-bg-primary shadow-xl overflow-hidden',
  
  // Header container - fixed height, no shrinking
  headerContainer: 'w-full flex-shrink-0',
  
  // Main content container with proper flex layout
  container: 'flex flex-row items-start relative w-auto h-auto p-0 flex-1 min-h-0',
  
  // Sidebar wrapper with independent scrolling and design system scrollbar
  sidebarWrapper: 'flex-shrink-0 flex flex-col w-[204px] pt-0 pr-0 pb-0 pl-0 gap-0 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-102px-var(--spacing-4xl))] scrollbar-thin scrollbar-thumb-bg-quaternary scrollbar-track-bg-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
  
  // Content area with independent scrolling and design system scrollbar
  content: 'flex flex-col flex-1 px-8 pt-0 pb-0 overflow-y-auto max-h-[calc(100vh-102px-var(--spacing-4xl))] scrollbar-thin scrollbar-thumb-bg-quaternary scrollbar-track-bg-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
  
  // Mobile content wrapper with design system scrollbar
  mobileContentWrapper: 'flex flex-col w-[360px] items-start overflow-y-auto max-h-[calc(100vh-102px-var(--spacing-xl))] scrollbar-thin scrollbar-thumb-bg-quaternary scrollbar-track-bg-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
  
  // Mobile header styles
  mobileHeader: 'flex flex-col w-full items-center relative flex-[0_0_auto] bg-bg-primary rounded-t-[32px]',
  mobileHeaderContent: 'flex flex-col items-center gap-3 p-4 w-full',
  mobileHeaderInner: 'flex flex-col items-center gap-2 w-full',
  mobileHeaderRow: 'flex flex-row h-8 items-center justify-between w-full',
  mobileTitle: 'w-fit mt-[-1px] font-semibold text-text-primary text-xl leading-7 whitespace-nowrap',
  
  // Mobile sidebar container
  mobileSidebarContainer: 'flex flex-col w-full overflow-y-auto scrollbar-thin scrollbar-thumb-bg-quaternary scrollbar-track-bg-secondary scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
};

const SettingsModal: React.FC<ISettingsModalProps> = ({
  open,
  onClose,
  className,
  sidebarGroups,
  selectedSection,
  onSelectSection,
  children,
  sectionContent,
  ...props
}) => {
  // Mobile view state: 'sidebar' or 'content'
  const [mobileView, setMobileView] = useState<'sidebar' | 'content'>('sidebar');
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const modalRef = useRef(null);

  // Responsive check for 414px and viewport height monitoring
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 414);
      setIsSmallMobile(window.innerWidth <= 375);
    };
    
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    checkMobile();
    updateViewportHeight();
    
    window.addEventListener('resize', () => {
      checkMobile();
      updateViewportHeight();
    });
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        checkMobile();
        updateViewportHeight();
      }, 100);
    });
    
    return () => {
      window.removeEventListener('resize', () => {
        checkMobile();
        updateViewportHeight();
      });
      window.removeEventListener('orientationchange', () => {
        setTimeout(() => {
          checkMobile();
          updateViewportHeight();
        }, 100);
      });
    };
  }, []);

  // Reset to sidebar view when modal opens or on desktop
  useEffect(() => {
    if (!open || !isMobile) setMobileView('sidebar');
  }, [open, isMobile]);

  const closeModal = (e: any) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // Calculate dynamic max heights based on viewport
  const getModalMaxHeight = () => {
    const padding = isMobile ? 16 : 32; // var(--spacing-xl) vs var(--spacing-4xl)
    return `calc(${viewportHeight}px - ${padding}px)`;
  };

  const getContentMaxHeight = () => {
    const headerHeight = 102; // Header height in pixels
    const padding = isMobile ? 16 : 32;
    return `calc(${viewportHeight}px - ${headerHeight}px - ${padding}px)`;
  };

  if (!open) return null;

  // Mobile: Sidebar only
  if (isMobile && mobileView === 'sidebar') {
    return (
      <div
        ref={modalRef}
        onClick={closeModal}
        className={styles.modalOverlayMobile}
      >
        <div 
          className={styles.modalClassMobile}
          style={{ maxHeight: getModalMaxHeight() }}
        >
          <div className={styles.mobileHeader}>
            <div className={styles.mobileHeaderContent}>
              <div className={styles.mobileHeaderInner}>
                <div className={styles.mobileHeaderRow}>
                  <div className={styles.mobileTitle}>Settings</div>
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
              </div>
            </div>
          </div>
          <div 
            className={styles.mobileSidebarContainer}
            style={{ maxHeight: getContentMaxHeight() }}
          >
            <div className="w-full">
              <SettingsSidebar
                groups={sidebarGroups}
                selectedSection={selectedSection}
                onSelectSection={(section) => {
                  onSelectSection(section);
                  setMobileView('content');
                }}
                mobile
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile: Content only
  if (isMobile && mobileView === 'content') {
    return (
      <div
        ref={modalRef}
        onClick={closeModal}
        className={styles.modalOverlayMobile}
      >
        <div 
          className={styles.modalClassMobile}
          style={{ maxHeight: getModalMaxHeight() }}
        >
          <div className={styles.mobileHeader}>
            <div className={styles.mobileHeaderContent}>
              <div className={styles.mobileHeaderInner}>
                <div className={styles.mobileHeaderRow}>
                  <ButtonV2
                    onClick={() => setMobileView('sidebar')}
                    size="sm"
                    hierarchy="tertiary"
                    shape="rounded"
                    iconOnly={true}
                    aria-label="Back"
                  >
                    <Icons name="chevron-left" size="sm" />
                  </ButtonV2>
                  <div className={styles.mobileTitle}>Settings</div>
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
              </div>
            </div>
          </div>
          <div 
            className={styles.mobileContentWrapper}
            style={{ maxHeight: getContentMaxHeight() }}
          >
            <div className="w-full pt-0">
              {sectionContent
                ? sectionContent[selectedSection]
                : children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: Default two-column layout
  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className={styles.modalOverlay}
    >
      <div 
        className={classNames(styles.modalClass, className)}
        style={{ maxHeight: getModalMaxHeight() }}
      >
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }} className="rounded-3xl">
          <div className={styles.headerContainer}>
            <SettingsModalHeader 
              onClose={onClose} 
              showCloseButton={true}
              onBack={isMobile ? () => setMobileView('sidebar') : undefined}
            />
          </div>
          <div className={styles.container}>
            <div 
              className={styles.sidebarWrapper}
              style={{ maxHeight: getContentMaxHeight() }}
            >
              <SettingsSidebar
                groups={sidebarGroups}
                selectedSection={selectedSection}
                onSelectSection={onSelectSection}
              />
            </div>
            <div 
              className={styles.content}
              style={{ maxHeight: getContentMaxHeight() }}
            >
              {sectionContent
                ? sectionContent[selectedSection]
                : children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal; 