import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { OTPInput } from "./OTPInput";

const meta: Meta<typeof OTPInput> = {
  title: "designsystem/OTPInput",
  component: OTPInput,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="max-w-xl space-y-3">
        <OTPInput label="One-time code" value={value} onChange={setValue} />
        <div className="text-xs text-text-tertiary font-mono">value="{value}"</div>
      </div>
    );
  },
};

