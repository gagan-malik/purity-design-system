import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: "designsystem/Slider",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic slider
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="p-4 max-w-md">
        <Slider value={value} onChange={setValue} showValue />
      </div>
    );
  },
};

// With min/max
export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState(25);
    return (
      <div className="p-4 max-w-md">
        <div className="mb-2 text-sm text-text-secondary">
          Value: {value} (Range: 0-100)
        </div>
        <Slider value={value} onChange={setValue} min={0} max={100} step={5} showValue />
      </div>
    );
  },
};

// With steps
export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="p-4 max-w-md">
        <div className="mb-2 text-sm text-text-secondary">Step: 10</div>
        <Slider value={value} onChange={setValue} step={10} showValue />
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <Slider value={50} disabled showValue />
    </div>
  ),
};

// Uncontrolled
export const Uncontrolled: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <Slider defaultValue={30} showValue />
    </div>
  ),
};

