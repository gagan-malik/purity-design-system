import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToolCallCard } from "./ToolCallCard";

const meta: Meta<typeof ToolCallCard> = {
  title: "designsystem/ToolCallCard",
  component: ToolCallCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ToolCallCard>;

export const Running: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ToolCallCard
        name="search"
        title="Search docs"
        status="running"
        description="Querying documentation index"
        input={{ query: "tailwind theme tokens" }}
        startedAt={new Date().toISOString()}
      />
    </div>
  ),
};

export const Succeeded: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ToolCallCard
        name="fetch"
        status="succeeded"
        input={{ url: "https://example.com" }}
        output={{ ok: true, items: [1, 2, 3] }}
        durationMs={842}
        onCopyOutput={() => {}}
      />
    </div>
  ),
};

export const Failed: Story = {
  render: () => (
    <div className="max-w-3xl">
      <ToolCallCard
        name="deleteFile"
        status="failed"
        input={{ path: "/danger.txt" }}
        error="Permission denied: unsafe operation requires approval."
        onRetry={() => {}}
      />
    </div>
  ),
};

