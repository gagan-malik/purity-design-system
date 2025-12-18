import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TeachingBubble } from "./TeachingBubble";
import { Button } from "../Button";

const meta: Meta<typeof TeachingBubble> = {
  title: "Molecules/TeachingBubble",
  component: TeachingBubble,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TeachingBubble>;

export const Default: Story = {
  render: () => (
    <TeachingBubble
      trigger={
        <button className="rounded-full px-4 py-2 text-sm font-semibold border border-border-secondary bg-bg-primary hover:bg-bg-secondary">
          Hover/click me
        </button>
      }
      title="Try agent steps"
      description="Use RunTimeline to display plan → tool calls → results."
      actions={<Button size="sm">Got it</Button>}
    />
  ),
};

