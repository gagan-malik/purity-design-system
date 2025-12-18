import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "designsystem/Callout",
  component: Callout,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {
  render: () => (
    <Callout
      placement="bottom"
      trigger={
        <button className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-primary hover:bg-bg-secondary">
          Open callout
        </button>
      }
      content={<div className="text-sm text-text-primary">Anchored callout content.</div>}
    />
  ),
};

