import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StreamingIndicator } from "./StreamingIndicator";

const meta: Meta<typeof StreamingIndicator> = {
  title: "Atoms/StreamingIndicator",
  component: StreamingIndicator,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof StreamingIndicator>;

export const Default: Story = {
  render: () => (
    <div className="space-y-3">
      <StreamingIndicator />
      <StreamingIndicator size="sm" label="Thinking" />
    </div>
  ),
};

