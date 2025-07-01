import React, { useState } from "react";
import SettingsSidebar, { SidebarGroup } from "./SettingsSidebar";

export default {
  title: "Setting/SettingsModal/SettingsSidebar",
  component: SettingsSidebar,
  parameters: {
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#fff' },
        { name: 'dark', value: '#18181b' },
      ],
    },
  },
};

const groups: SidebarGroup[] = [
  {
    group: "Account",
    items: [
      { label: "Profile", icon: "user-03", onClick: () => {}, active: true },
      { label: "Preferences", icon: "sliders-01", onClick: () => {} },
      { label: "Notifications", icon: "bell-02", onClick: () => {} },
      { label: "Appearance", icon: "contrast-02", onClick: () => {} },
    ],
  },
  {
    group: "Organisation",
    items: [
      { label: "Overview", icon: "building-08", onClick: () => {} },
      { label: "Workspaces", icon: "building-07", onClick: () => {} },
      { label: "Members", icon: "users-03", onClick: () => {} },
      { label: "Integrations", icon: "menu-02", onClick: () => {} },
    ],
  },
  {
    group: "Billing",
    items: [
      { label: "Your plan", icon: "star-01", onClick: () => {} },
      { label: "Add-ons", icon: "dataflow-03", onClick: () => {} },
      { label: "Payment", icon: "credit-card-02", onClick: () => {} },
      { label: "Invoices", icon: "receipt", onClick: () => {} },
      { label: "Manage seats", icon: "users-03", onClick: () => {} },
    ],
  },
];

export const Default = () => {
  const [selectedSection, setSelectedSection] = useState('Profile');
  return (
    <div style={{ background: '#fff', padding: 32 }}>
      <SettingsSidebar 
        groups={groups} 
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />
    </div>
  );
}; 