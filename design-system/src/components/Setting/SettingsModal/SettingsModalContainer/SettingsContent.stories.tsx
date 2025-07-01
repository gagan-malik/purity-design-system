import React from "react";
import SettingsContent from "./SettingsContent";

export default {
  title: "Setting/SettingsModal/SettingsContent",
  component: SettingsContent,
};

export const Default = () => (
  <div style={{ background: '#f9f9f9', minHeight: 700, padding: 40 }}>
    <SettingsContent>Profile Settings</SettingsContent>
  </div>
); 