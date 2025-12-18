import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TokenUsageMeter } from "./TokenUsageMeter";

const meta: Meta<typeof TokenUsageMeter> = {
  title: "Molecules/TokenUsageMeter",
  component: TokenUsageMeter,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TokenUsageMeter>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <TokenUsageMeter used={8123} limit={32000} costUsd={0.1284} />
      <TokenUsageMeter used={128000} label="Context window" />
    </div>
  ),
};

