import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

const meta: Meta<typeof EmptyState> = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <EmptyState
        icon={<div className="text-3xl">📭</div>}
        title="No messages yet"
        description="Start a conversation to see messages here."
        action={<Button>New chat</Button>}
      />
    </div>
  ),
};

