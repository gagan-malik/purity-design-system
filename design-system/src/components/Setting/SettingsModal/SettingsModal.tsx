import React, { useState, useEffect, useRef } from "react";
import { SidebarGroup } from "./SettingsModalContainer/SettingsSidebar";
import SettingsSidebar from "./SettingsModalContainer/SettingsSidebar";
import SettingsContent from "./SettingsModalContainer/SettingsContent";
import SettingsModalHeader from "./common/SettingsModalHeader";
import RightArrow from '../../assets/icons/arrow-right.svg';
import Icons from "../../Icons/Icons";
import classNames from "classnames";
import { Button, ButtonColor, ButtonVariant } from "../../Button";
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
  container: 'flex flex-row items-start relative w-auto h-auto p-0',
  header: 'pt-[56px] pr-[28px] pl-[102px] pb-0 self-stretch w-full flex flex-col items-center relative',
  headerContent: 'flex flex-col items-start gap-4 pt-0 pr-0 pb-0 pl-0 relative self-stretch w-full',
  title: 'self-stretch text-text-primary text-xl leading-6 relative mt-[-1px] font-semibold',
  mainContent: 'w-full justify-center flex flex-col items-center relative',
  contentWrapper: 'w-full items-start gap-0 flex relative',
  sidebarWrapper: 'flex-shrink-0 flex flex-col w-[204px] pt-0 pr-0 pb-0 pl-[16px] gap-0',
  content: 'flex flex-col flex-1 px-8 pt-0 pb-0',
  modalClass: 'items-start df:w-full justify-center transition duration-500 ease-in-out flex flex-col rounded-[24px] bg-bg-primary m-5 shadow-3xl md:w-[800px] overflow-hidden',
  headerContainer: 'w-full',
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
  const modalRef = useRef(null);

  // Responsive check for 414px
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 414);
      setIsSmallMobile(window.innerWidth <= 375);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  if (!open) return null;

  // Mobile: Sidebar only
  if (isMobile && mobileView === 'sidebar') {
    return (
      <div
        ref={modalRef}
        onClick={closeModal}
        className="fixed inset-0 flex items-end justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]"
      >
        <div className="w-[390px] max-h-[90vh] flex flex-col items-center justify-end pt-0 pb-6 px-0 relative rounded-t-[32px] bg-bg-primary shadow-xl overflow-hidden">
          <div className="flex flex-col w-full items-center relative flex-[0_0_auto] bg-bg-primary rounded-t-[32px]">
            <div className="flex flex-col items-center gap-3 p-4 w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex flex-row h-8 items-center justify-between w-full">
                  <div className="w-fit mt-[-1px] font-semibold text-text-primary text-xl leading-7 whitespace-nowrap">Settings</div>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-hover text-text-tertiary" onClick={onClose} aria-label="Close settings">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
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
        className="fixed inset-0 flex items-end justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]"
      >
        <div className="w-[390px] max-h-[90vh] flex flex-col items-center justify-end pt-0 pb-6 px-0 relative rounded-t-[32px] bg-bg-primary shadow-xl overflow-hidden">
          <div className="flex flex-col w-full items-center relative flex-[0_0_auto] bg-bg-primary rounded-t-[32px]">
            <div className="flex flex-col items-center gap-3 p-4 w-full">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex flex-row h-8 items-center justify-between w-full">
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-hover text-text-primary"
                    onClick={() => setMobileView('sidebar')}
                    aria-label="Back"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="w-fit mt-[-1px] font-semibold text-text-primary text-xl leading-7 whitespace-nowrap">Settings</div>
                  <button 
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-hover text-text-tertiary" 
                    onClick={onClose}
                    aria-label="Close settings"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[360px] items-start">
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
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-filter backdrop-blur-sm z-[999]"
    >
      <div className={classNames(styles.modalClass, className)}>
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }} className="rounded-[24px]">
          <div className={styles.headerContainer}>
            <SettingsModalHeader 
              onClose={onClose} 
              showCloseButton={true}
              onBack={isMobile ? () => setMobileView('sidebar') : undefined}
            />
          </div>
          <div className={styles.container}>
            <SettingsSidebar
              groups={sidebarGroups}
              selectedSection={selectedSection}
              onSelectSection={onSelectSection}
            />
            <div className={styles.content}>
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