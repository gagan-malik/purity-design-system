import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RunTimeline } from "./RunTimeline";
import { ToolCallCard } from "../ToolCallCard/ToolCallCard";

const meta: Meta<typeof RunTimeline> = {
  title: "designsystem/RunTimeline",
  component: RunTimeline,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof RunTimeline>;

export const Default: Story = {
  render: () => (
    <div className="max-w-3xl">
      <RunTimeline
        steps={[
          { id: "plan", title: "Plan", status: "succeeded", description: "Break down the task into steps.", meta: "1s" },
          {
            id: "tool",
            title: "Tool call",
            status: "running",
            description: "Search repository for matching files.",
            meta: "running",
            content: <ToolCallCard name="search" status="running" input={{ query: "ChatMessageList" }} />,
          },
          { id: "final", title: "Respond", status: "pending", description: "Summarize changes and next steps." },
        ]}
      />
    </div>
  ),
};

