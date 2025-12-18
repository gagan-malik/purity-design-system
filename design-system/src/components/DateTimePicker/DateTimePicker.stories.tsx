import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "./DateTimePicker";

const meta: Meta<typeof DateTimePicker> = {
  title: "designsystem/DateTimePicker",
  component: DateTimePicker,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <DateTimePicker label="Date & time" />
    </div>
  ),
};

