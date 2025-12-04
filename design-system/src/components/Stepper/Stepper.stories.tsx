import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { Stepper } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  title: "designsystem/Stepper",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stepper
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    return (
      <div className="p-4">
        <Stepper value={value} onChange={setValue} min={0} max={10} />
      </div>
    );
  },
};

// With steps
export const WithSteps: Story = {
  render: () => {
    const [value, setValue] = useState(10);
    return (
      <div className="p-4">
        <div className="mb-2 text-sm text-text-secondary">Step: 5</div>
        <Stepper value={value} onChange={setValue} min={0} max={100} step={5} />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState(5);
    const [value2, setValue2] = useState(5);
    const [value3, setValue3] = useState(5);

    return (
      <div className="p-4 space-y-4">
        <div>
          <div className="mb-2 text-sm text-text-secondary">Small</div>
          <Stepper value={value1} onChange={setValue1} size="sm" />
        </div>
        <div>
          <div className="mb-2 text-sm text-text-secondary">Medium</div>
          <Stepper value={value2} onChange={setValue2} size="md" />
        </div>
        <div>
          <div className="mb-2 text-sm text-text-secondary">Large</div>
          <Stepper value={value3} onChange={setValue3} size="lg" />
        </div>
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="p-4">
      <Stepper value={5} onChange={() => {}} disabled />
    </div>
  ),
};

// Quantity selector example
export const QuantitySelector: Story = {
  render: () => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="p-4 max-w-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-text-primary mb-2">Quantity</h3>
          <Stepper value={quantity} onChange={setQuantity} min={1} max={99} />
        </div>
        <div className="text-sm text-text-secondary">
          Current quantity: {quantity}
        </div>
      </div>
    );
  },
};

