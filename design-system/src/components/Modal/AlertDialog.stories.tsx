import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../Button";

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
  title: "designsystem/AlertDialog",
  tags: ["autodocs"],
  argTypes: {
    destructive: {
      control: { type: "boolean" },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic confirmation dialog
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          actionLabel="Delete"
          destructive={true}
          onConfirm={() => {
            alert("Item deleted!");
          }}
        />
      </div>
    );
  },
};

// Success dialog
export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Show Success</Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Success!"
          description="Your changes have been saved successfully."
          actionLabel="OK"
          onConfirm={() => {}}
        />
      </div>
    );
  },
};

// With custom labels
export const CustomLabels: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Discard Changes?"
          description="You have unsaved changes. Are you sure you want to leave?"
          cancelLabel="Stay"
          actionLabel="Discard"
          destructive={true}
          onConfirm={() => {
            alert("Changes discarded");
          }}
        />
      </div>
    );
  },
};

// Without description
export const Simple: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Simple Dialog</Button>
        <AlertDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          actionLabel="Confirm"
          onConfirm={() => {
            alert("Confirmed!");
          }}
        />
      </div>
    );
  },
};

