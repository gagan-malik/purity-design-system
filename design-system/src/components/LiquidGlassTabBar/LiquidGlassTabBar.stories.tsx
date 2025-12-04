import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { LiquidGlassTabBar } from "./LiquidGlassTabBar";

const meta: Meta<typeof LiquidGlassTabBar> = {
  component: LiquidGlassTabBar,
  title: "designsystem/LiquidGlassTabBar",
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["top", "bottom"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "compact"],
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Explore" },
  { id: "messages", label: "Messages" },
  { id: "profile", label: "Profile" },
];

// Base story with default tabs
export const Base: Story = {
  args: {
    tabs: defaultTabs,
    position: "bottom",
    variant: "default",
  },
};

// With icons (you can use your icon paths here)
export const WithIcons: Story = {
  args: {
    tabs: [
      { id: "home", label: "Home", icon: "/icons/home.svg" },
      { id: "explore", label: "Explore", icon: "/icons/searchIcon.svg" },
      { id: "messages", label: "Messages", icon: "/icons/notification.svg" },
      { id: "profile", label: "Profile", icon: "/icons/icon.svg" },
    ],
    position: "bottom",
    variant: "default",
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    tabs: defaultTabs,
    position: "bottom",
    variant: "compact",
  },
};

// Top position
export const TopPosition: Story = {
  args: {
    tabs: defaultTabs,
    position: "top",
    variant: "default",
  },
};

// With disabled tabs
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { id: "home", label: "Home" },
      { id: "explore", label: "Explore", disabled: true },
      { id: "messages", label: "Messages" },
      { id: "profile", label: "Profile" },
    ],
    position: "bottom",
    variant: "default",
  },
};

// With default active tab
export const WithDefaultTab: Story = {
  args: {
    tabs: defaultTabs,
    defaultTab: "messages",
    position: "bottom",
    variant: "default",
  },
};

// Many tabs
export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab 1" },
      { id: "tab2", label: "Tab 2" },
      { id: "tab3", label: "Tab 3" },
      { id: "tab4", label: "Tab 4" },
      { id: "tab5", label: "Tab 5" },
      { id: "tab6", label: "Tab 6" },
    ],
    position: "bottom",
    variant: "default",
  },
};

// Interactive example with background
export const Interactive: Story = {
  render: (args) => (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        padding: "2rem",
      }}
    >
      <div style={{ marginTop: "2rem", color: "white" }}>
        <h2>Liquid Glass Tab Bar Navigation</h2>
        <p>Click on different tabs to see the smooth liquid indicator animation.</p>
      </div>
      <LiquidGlassTabBar {...args} />
    </div>
  ),
  args: {
    tabs: defaultTabs,
    position: "bottom",
    variant: "default",
  },
};

