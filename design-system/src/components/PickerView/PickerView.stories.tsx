import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { PickerView } from "./PickerView";

const meta: Meta<typeof PickerView> = {
  component: PickerView,
  title: "designsystem/PickerView",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const numbers = Array.from({ length: 100 }, (_, i) => ({
  label: `${i}`,
  value: i,
}));

// Basic picker
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="p-4 max-w-xs">
        <PickerView
          options={numbers}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

