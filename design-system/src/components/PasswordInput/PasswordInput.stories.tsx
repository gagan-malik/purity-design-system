import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "designsystem/PasswordInput",
  component: PasswordInput,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <PasswordInput label="Password" placeholder="Enter password" />
    </div>
  ),
};

