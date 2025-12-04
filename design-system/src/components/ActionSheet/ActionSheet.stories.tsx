import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { ActionSheet } from "./ActionSheet";
import { Button } from "../Button";
import deleteIcon from "../../assets/icons/delete.svg";

const meta: Meta<typeof ActionSheet> = {
  component: ActionSheet,
  title: "designsystem/ActionSheet",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Base: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Action Sheet</Button>
        <ActionSheet
          open={open}
          onClose={() => setOpen(false)}
          actions={[
            {
              label: "Share",
              onAction: () => alert("Share clicked"),
            },
            {
              label: "Edit",
              onAction: () => alert("Edit clicked"),
            },
            {
              label: "Delete",
              icon: deleteIcon,
              destructive: true,
              onAction: () => alert("Delete clicked"),
            },
          ]}
        />
      </div>
    );
  },
};

// With title
export const WithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Action Sheet</Button>
        <ActionSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Choose an action"
          actions={[
            {
              label: "Copy Link",
              onAction: () => alert("Copy Link clicked"),
            },
            {
              label: "Share",
              onAction: () => alert("Share clicked"),
            },
            {
              label: "Delete",
              destructive: true,
              onAction: () => alert("Delete clicked"),
            },
          ]}
        />
      </div>
    );
  },
};

