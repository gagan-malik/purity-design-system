import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "designsystem/RadioGroup",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "option1", label: "Option 1", description: "This is option 1" },
  { value: "option2", label: "Option 2", description: "This is option 2" },
  { value: "option3", label: "Option 3", description: "This is option 3" },
];

// Basic radio group
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <div className="p-4 max-w-md">
        <RadioGroup options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};

// Horizontal
export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <div className="p-4">
        <RadioGroup
          options={options}
          value={value}
          onChange={setValue}
          orientation="horizontal"
        />
      </div>
    );
  },
};

// With disabled option
export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <div className="p-4 max-w-md">
        <RadioGroup
          options={[
            ...options,
            { value: "option4", label: "Option 4 (Disabled)", disabled: true },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

