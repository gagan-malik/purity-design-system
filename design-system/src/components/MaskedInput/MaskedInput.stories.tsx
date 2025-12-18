import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MaskedInput } from "./MaskedInput";

const meta: Meta<typeof MaskedInput> = {
  title: "designsystem/MaskedInput",
  component: MaskedInput,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MaskedInput>;

export const Phone: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-xl space-y-3">
        <MaskedInput label="Phone" value={value} onChange={setValue} mask="(###) ###-####" placeholder="(555) 555-5555" />
        <div className="text-xs text-text-tertiary font-mono">raw="{value}"</div>
      </div>
    );
  },
};

