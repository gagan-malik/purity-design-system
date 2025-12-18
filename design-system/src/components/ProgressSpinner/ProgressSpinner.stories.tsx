import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressSpinner } from "./ProgressSpinner";

const meta: Meta<typeof ProgressSpinner> = {
  title: "designsystem/ProgressSpinner",
  component: ProgressSpinner,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ProgressSpinner>;

export const Default: Story = {
  render: () => (
    <div className="space-y-3">
      <ProgressSpinner label="Loading…" />
      <ProgressSpinner size="sm" label="Small" />
      <ProgressSpinner size="lg" label="Large" />
    </div>
  ),
};

