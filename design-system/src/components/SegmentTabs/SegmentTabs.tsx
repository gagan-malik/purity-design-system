import React, { useState } from "react";

export interface SegmentTabProps {
  tabs: { id: string; label: string }[];
  onTabChange?: (tabId: string) => void;
  defaultTab?: string;
  defaultBackground?: boolean;
}

export const SegmentTab: React.FC<SegmentTabProps> = ({
  tabs,
  onTabChange,
  defaultTab,
  defaultBackground,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="">
      {defaultBackground ? (
        <div className="flex gap-1 w-fit bg-bg-secondary rounded-full  p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-3 py-2 rounded-full font-semibold text-base transition-colors ${
                activeTab === tab.id
                  ? "bg-bg-secondary_subtle text-text-secondary"
                  : "text-text-quaternary"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex gap-x-1 rounded-md p-1 bg-bg-primary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-4xl font-semibold text-base transition-colors ${
                activeTab === tab.id
                  ? "bg-bg-secondary_subtle text-text-secondary"
                  : "text-text-quaternary hover:bg-bg-primary_hover"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
