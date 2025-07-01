import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import type { SidebarGroup } from "./SettingsModalContainer/SettingsSidebar";
import type { IIconsProps } from "../../Icons/Icons";
import SettingsContent from "./SettingsModalContainer/SettingsContent";
import InputV2 from "../../FormInput/InputNew/InputV2";

const sidebarGroups: SidebarGroup[] = [
  {
    group: "Account",
    items: [
      { label: "Profile", icon: "user-03" as IIconsProps["name"], onClick: () => {} },
      { label: "Preferences", icon: "sliders-01" as IIconsProps["name"], onClick: () => {} },
      { label: "Notifications", icon: "bell-02" as IIconsProps["name"], onClick: () => {} },
      { label: "Appearance", icon: "contrast-02" as IIconsProps["name"], onClick: () => {} },
    ],
  },
  {
    group: "Organisation",
    items: [
      { label: "Overview", icon: "building-08" as IIconsProps["name"], onClick: () => {} },
      { label: "Workspaces", icon: "building-07" as IIconsProps["name"], onClick: () => {} },
      { label: "Members", icon: "users-03" as IIconsProps["name"], onClick: () => {} },
      { label: "Integrations", icon: "menu-02" as IIconsProps["name"], onClick: () => {} },
    ],
  },
  {
    group: "Billing",
    items: [
      { label: "Your plan", icon: "star-01" as IIconsProps["name"], onClick: () => {} },
      { label: "Add-ons", icon: "dataflow-03" as IIconsProps["name"], onClick: () => {} },
      { label: "Payment", icon: "credit-card-02" as IIconsProps["name"], onClick: () => {} },
      { label: "Invoices", icon: "receipt" as IIconsProps["name"], onClick: () => {} },
      { label: "Manage seats", icon: "users-03" as IIconsProps["name"], onClick: () => {} },
    ],
  },
];

const sectionContent = {
  Profile: (
    <SettingsContent>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center mt-8 mb-8">
          <div>Profile Content</div>
        </div>
      </div>
    </SettingsContent>
  ),
  Overview: (
    <SettingsContent>
      <div className="bg-white rounded-2xl mx-auto flex flex-col" style={{ maxWidth: '480px', width: '100%', padding: 0 }}>
        <div>Overview Content</div>
      </div>
    </SettingsContent>
  ),
  Preferences: <div>Preferences Content</div>,
  Notifications: <div>Notifications Content</div>,
  Appearance: <div>Appearance Content</div>,
  Workspaces: (
    <SettingsContent>
      <div className="bg-white rounded-2xl mx-auto flex flex-col" style={{ maxWidth: '480px', width: '100%', padding: 0 }}>
        <div className="flex flex-col w-full" style={{ gap: '40px', marginTop: '40px', maxHeight: '600px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#E5E7EB #F3F4F6' }}>
          <div>Workspaces Content</div>
        </div>
      </div>
    </SettingsContent>
  ),
  Members: <div>Members Content</div>,
  Integrations: <div>Integrations Content</div>,
  "Your plan": <div>Your Plan Content</div>,
  "Add-ons": <div>Add-ons Content</div>,
  Payment: <div>Payment Content</div>,
  Invoices: <div>Invoices Content</div>,
  "Manage seats": <div>Manage Seats Content</div>,
};

export default {
  title: "Setting/SettingsModal/SettingsModal",
  component: SettingsModal,
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState("Profile");
  
  // Create sidebar groups with active state based on selectedSection
  const updatedSidebarGroups = sidebarGroups.map(group => ({
    ...group,
    items: group.items.map(item => ({
      ...item,
      active: item.label === selectedSection
    }))
  }));
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Settings Modal</button>
      <SettingsModal
        open={open}
        onClose={() => setOpen(false)}
        sidebarGroups={updatedSidebarGroups}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
        sectionContent={sectionContent}
      />
    </>
  );
}; 