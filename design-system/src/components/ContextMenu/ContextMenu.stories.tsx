import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { ContextMenu } from "./ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  title: "designsystem/ContextMenu",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Copy", onClick: () => alert("Copied!") },
  { label: "Cut", onClick: () => alert("Cut!") },
  { separator: true },
  { label: "Paste", onClick: () => alert("Pasted!") },
  { label: "Delete", onClick: () => alert("Deleted!"), destructive: true },
];

// Basic context menu
export const Basic: Story = {
  render: () => (
    <div className="p-8">
      <ContextMenu items={menuItems}>
        <div className="p-8 bg-bg-secondary rounded-lg text-center cursor-pointer">
          Right-click me (or long-press on mobile)
        </div>
      </ContextMenu>
    </div>
  ),
};

// With disabled items
export const WithDisabled: Story = {
  render: () => (
    <div className="p-8">
      <ContextMenu
        items={[
          ...menuItems,
          { label: "Disabled Item", onClick: () => {}, disabled: true },
        ]}
      >
        <div className="p-8 bg-bg-secondary rounded-lg text-center cursor-pointer">
          Right-click me
        </div>
      </ContextMenu>
    </div>
  ),
};

