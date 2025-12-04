import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { Sheet } from "./Sheet";
import { Button } from "../Button";

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  title: "designsystem/Sheet",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const SheetContent = () => (
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Sheet Content</h2>
    <p className="text-text-secondary">
      This is a side sheet panel. It can slide from any side.
    </p>
  </div>
);

// Right side
export const RightSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Right Sheet</Button>
        <Sheet open={open} onClose={() => setOpen(false)} side="right">
          <SheetContent />
        </Sheet>
      </div>
    );
  },
};

// Left side
export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <Button onClick={() => setOpen(true)}>Open Left Sheet</Button>
        <Sheet open={open} onClose={() => setOpen(false)} side="left">
          <SheetContent />
        </Sheet>
      </div>
    );
  },
};

