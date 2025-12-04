import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { Button } from "../Button";

const meta: Meta<typeof CommandMenu> = {
  component: CommandMenu,
  title: "designsystem/CommandMenu",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { id: "1", label: "Create new file", group: "File", onSelect: () => alert("Create file") },
  { id: "2", label: "Open file", group: "File", onSelect: () => alert("Open file") },
  { id: "3", label: "Save file", group: "File", onSelect: () => alert("Save file") },
  { id: "4", label: "Cut", group: "Edit", onSelect: () => alert("Cut") },
  { id: "5", label: "Copy", group: "Edit", onSelect: () => alert("Copy") },
  { id: "6", label: "Paste", group: "Edit", onSelect: () => alert("Paste") },
];

// Basic command menu
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Command Menu (Cmd+K)</Button>
        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={menuItems}
        />
      </div>
    );
  },
};

