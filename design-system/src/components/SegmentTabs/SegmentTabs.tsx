import React, { useState } from "react";

export interface SegmentTabProps {
  tabs: { id: string; label: string; icon?: string | React.ReactNode }[];
  onTabChange?: (tabId: string) => void;
  defaultTab?: string;
  defaultBackground?: boolean;
  /** Orientation of tabs */
  orientation?: "horizontal" | "vertical";
  /** Enable animations */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const SegmentTab: React.FC<SegmentTabProps> = ({
  tabs,
  onTabChange,
  defaultTab,
  defaultBackground,
  orientation = "horizontal",
  animated = true,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);
  const indicatorRef = React.useRef<HTMLDivElement>(null);
  const tabsRef = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  // Update indicator position
  React.useEffect(() => {
    if (!animated) return;

    const activeButton = tabsRef.current.get(activeTab);
    const indicator = indicatorRef.current;
    const container = activeButton?.parentElement;

    if (activeButton && indicator && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      if (orientation === "horizontal") {
        const left = buttonRect.left - containerRect.left;
        const width = buttonRect.width;
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
        indicator.style.top = "";
        indicator.style.height = "";
      } else {
        const top = buttonRect.top - containerRect.top;
        const height = buttonRect.height;
        indicator.style.top = `${top}px`;
        indicator.style.height = `${height}px`;
        indicator.style.left = "";
        indicator.style.width = "";
      }
    }
  }, [activeTab, orientation, animated, tabs]);

  const containerClasses = classNames(
    orientation === "horizontal" ? "flex" : "flex flex-col",
    defaultBackground ? "w-fit bg-bg-secondary rounded-full p-1" : "rounded-md p-1 bg-bg-primary",
    className
  );

  return (
    <div className={containerClasses}>
      <div
        className={classNames(
          "relative",
          orientation === "horizontal" ? "flex gap-1" : "flex flex-col gap-1"
        )}
      >
        {animated && (
          <div
            ref={indicatorRef}
            className={classNames(
              "absolute bg-bg-secondary_subtle rounded-full transition-all duration-300 ease-out",
              orientation === "horizontal" ? "h-[calc(100%-8px)] top-1" : "w-[calc(100%-8px)] left-1"
            )}
            style={{ opacity: 0 }}
          />
        )}

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabsRef.current.set(tab.id, el);
              }}
              className={classNames(
                "relative px-3 py-2 rounded-full font-semibold text-base transition-colors",
                "flex items-center gap-2",
                isActive
                  ? "bg-bg-secondary_subtle text-text-secondary"
                  : defaultBackground
                  ? "text-text-quaternary"
                  : "text-text-quaternary hover:bg-bg-primary_hover"
              )}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.icon && (
                <span className="w-5 h-5">
                  {typeof tab.icon === "string" ? (
                    <img src={tab.icon} alt="" />
                  ) : (
                    tab.icon
                  )}
                </span>
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
