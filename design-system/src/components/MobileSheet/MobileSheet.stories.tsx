import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { MobileSheet } from "./MobileSheet";
import { Button } from "../Button";

const meta: Meta<typeof MobileSheet> = {
  component: MobileSheet,
  title: "designsystem/MobileSheet",
  tags: ["autodocs"],
  argTypes: {
    dismissible: {
      control: { type: "boolean" },
    },
    showBackdrop: {
      control: { type: "boolean" },
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const SheetContent = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-bold text-text-primary">Mobile Sheet</h2>
    <p className="text-text-secondary">
      This is a mobile-optimized bottom sheet component. Swipe down to dismiss.
    </p>
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="p-4 bg-bg-secondary rounded-lg text-text-primary"
        >
          Item {i}
        </div>
      ))}
    </div>
  </div>
);

// Basic usage
export const Base: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Sheet</Button>
        <MobileSheet open={open} onClose={() => setOpen(false)}>
          <SheetContent />
        </MobileSheet>
      </div>
    );
  },
};

// With snap points
export const WithSnapPoints: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Sheet with Snap Points</Button>
        <MobileSheet
          open={open}
          onClose={() => setOpen(false)}
          snapPoints={[0.5, 0.9]}
        >
          <SheetContent />
        </MobileSheet>
      </div>
    );
  },
};

// Non-dismissible
export const NonDismissible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Non-Dismissible Sheet</Button>
        <MobileSheet
          open={open}
          onClose={() => setOpen(false)}
          dismissible={false}
        >
          <div className="space-y-4">
            <SheetContent />
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </MobileSheet>
      </div>
    );
  },
};

// Without backdrop
export const WithoutBackdrop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Sheet Without Backdrop</Button>
        <MobileSheet
          open={open}
          onClose={() => setOpen(false)}
          showBackdrop={false}
        >
          <SheetContent />
        </MobileSheet>
      </div>
    );
  },
};

