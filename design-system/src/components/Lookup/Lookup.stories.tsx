import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Lookup, PeoplePicker } from "./Lookup";

const meta: Meta<typeof Lookup> = {
  title: "designsystem/Lookup",
  component: Lookup,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Lookup>;

export const Single: Story = {
  render: () => {
    const options = [
      { id: "u1", label: "Ada Lovelace" },
      { id: "u2", label: "Alan Turing" },
      { id: "u3", label: "Grace Hopper" },
    ];
    const [value, setValue] = React.useState(options[0]);
    return (
      <div className="max-w-xl space-y-6">
        <Lookup options={options} value={value} onChange={setValue} label="Assignee" />
        <PeoplePicker options={options} value={[options[0]]} onChange={() => {}} label="Watchers" />
      </div>
    );
  },
};

