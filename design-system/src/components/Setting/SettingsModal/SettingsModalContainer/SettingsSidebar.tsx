import React from "react";
import { Icons } from "../../../Icons/Icons";

import NotificationIcon from '../../../../assets/icons/Setting/bell-ringing-02.svg';
import StarIcon from '../../../../assets/icons/Setting/currency-dollar.svg';
import DataflowIcon from '../../../../assets/icons/Setting/chart-breakout-square.svg';
import user03 from '../../../../assets/icons/Setting/user-03.svg';
import sliders01 from '../../../../assets/icons/Setting/sliders-01.svg';
import contrast02 from '../../../../assets/icons/Setting/contrast-02.svg';
import building08 from '../../../../assets/icons/Setting/building-08.svg';
import building07 from '../../../../assets/icons/Setting/building-07.svg';
import users03 from '../../../../assets/icons/Setting/users-03.svg';
import integrations from '../../../../assets/icons/Setting/Integrations.svg';
import creditCard02 from '../../../../assets/icons/Setting/credit-card-02.svg';
import receipt from '../../../../assets/icons/Setting/receipt.svg';

export type SidebarGroup = {
  group: string;
  items: Array<{
    label: string;
    icon: string;
    onClick: () => void;
    active?: boolean;
  }>;
};

/**
 * SettingsSidebar component for displaying navigation in settings
 * @param {ISettingsSidebarProps} props - Component props
 * @returns {React.ReactElement} SettingsSidebar component
 */
export interface ISettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Groups of settings items */
  groups: SidebarGroup[];
  /** Currently selected section */
  selectedSection: string;
  /** Callback when a section is selected */
  onSelectSection: (section: string) => void;
  /** Mobile mode flag */
  mobile?: boolean;
}

const styles = {
  container: 'flex flex-col w-[204px] gap-8 pt-0 pr-2 pb-2 pl-3',
  group: 'flex flex-col gap-3 w-full',
  groupLabel: 'pl-4 pr-0 py-0 text-[11px] font-semibold text-fg-quaternary dark:text-fg-quaternary uppercase mb-0 tracking-wider',
  itemList: 'flex flex-col gap-1 w-full',
  item: {
    base: 'flex items-center gap-2 w-full pl-4 pr-4 py-2 rounded-3xl text-left transition-colors mx-0',
    active: 'bg-bg-secondary dark:bg-bg-secondary text-text-primary dark:text-text-primary font-semibold',
    inactive: 'text-fg-quaternary dark:text-fg-quaternary hover:bg-bg-secondary dark:hover:bg-bg-secondary hover:text-text-primary dark:hover:text-text-primary',
  },
  icon: 'w-5 h-5 flex items-center justify-center',
  itemText: 'font-semibold text-sm mt-[-1px] whitespace-nowrap',
  mobileGroup: 'bg-bg-secondary dark:bg-bg-secondary rounded-3xl w-full flex flex-col pt-3 pb-3',
};

const renderIcon = (icon: string) => {
  return <Icons name={icon as any} size="sm" />;
};

export const SettingsSidebar: React.FC<ISettingsSidebarProps> = ({
  groups,
  selectedSection,
  onSelectSection,
  className,
  mobile = false,
  ...props
}) => {
  return (
    <nav className={`${mobile ? 'w-full' : styles.container} ${className || ''}`} {...props}>
      {groups.map((group, groupIdx) => (
        <React.Fragment key={group.group}>
          {/* Group label outside the box for mobile */}
          {mobile && (
            <div
              className="w-full bg-transparent px-4"
              style={{ padding: 0 }}
            >
              <div className="pl-4 pr-0 pt-4 pb-4 text-[11px] font-semibold text-fg-quaternary dark:text-fg-quaternary uppercase tracking-wider w-full">
                {group.group}
              </div>
            </div>
          )}
          <div className={mobile ? 'px-4' : ''}>
            <div
              className={
                mobile
                  ? styles.mobileGroup
                  : styles.group
              }
            >
              {/* Group label for desktop only */}
              {!mobile && (
                <div className={styles.groupLabel}>{group.group}</div>
              )}
              <div className={mobile ? 'flex flex-col w-full' : styles.itemList}>
                {group.items.map((item, itemIdx) => (
                  <button
                    key={item.label}
                    role="tab"
                    aria-selected={item.active}
                    aria-controls={`panel-${item.label}`}
                    className={
                      mobile
                        ? `flex items-center w-full px-0 py-0 text-left transition-colors bg-transparent text-text-primary dark:text-text-primary${itemIdx !== group.items.length - 1 ? ' mb-5' : ''}`
                        : `${styles.item.base} ${item.active ? styles.item.active : styles.item.inactive}`
                    }
                    onClick={() => {
                      item.onClick();
                      onSelectSection(item.label);
                    }}
                    type="button"
                    style={mobile ? { borderRadius: 0 } : {}}
                  >
                    <span className={mobile ? 'w-5 h-5 flex items-center justify-center ml-5 text-fg-quaternary dark:text-fg-quaternary' : styles.icon}>
                      {renderIcon(item.icon)}
                    </span>
                    <span className={mobile ? `${styles.itemText} font-normal ml-2` : styles.itemText}>{item.label}</span>
                    {mobile && (
                      <span className="ml-auto mr-5 text-fg-quaternary dark:text-fg-quaternary">
                        <Icons name="chevron-right" size="sm" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default SettingsSidebar; 