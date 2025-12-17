import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageActions } from "./MessageActions";

const meta: Meta<typeof MessageActions> = {
  title: "designsystem/MessageActions",
  component: MessageActions,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MessageActions>;

export const Default: Story = {
  render: () => (
    <MessageActions
      onCopy={() => {}}
      onRegenerate={() => {}}
      onLike={() => {}}
      onDislike={() => {}}
    />
  ),
};

