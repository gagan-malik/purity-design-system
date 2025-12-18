import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "designsystem/Chip",
  component: Chip,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Token" />
      <Chip label="Removable" onRemove={() => {}} />
      <Chip label="Secondary" variant="secondary" onRemove={() => {}} />
      <Chip label="Disabled" disabled onRemove={() => {}} />
    </div>
  ),
};

