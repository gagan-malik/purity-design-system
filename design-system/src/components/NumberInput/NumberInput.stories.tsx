import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "designsystem/NumberInput",
  component: NumberInput,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(2);
    return (
      <div className="max-w-xl space-y-3">
        <NumberInput label="Quantity" value={value} onChange={setValue} min={0} max={10} />
      </div>
    );
  },
};

