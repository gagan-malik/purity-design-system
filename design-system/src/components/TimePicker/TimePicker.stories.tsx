import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "designsystem/TimePicker",
  component: TimePicker,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <TimePicker label="Time" defaultValue="09:30" />
    </div>
  ),
};

