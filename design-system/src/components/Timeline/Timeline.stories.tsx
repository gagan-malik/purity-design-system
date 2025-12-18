import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "designsystem/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        items={[
          { id: "1", title: "User message", description: "Create a data grid.", time: "10:02", icon: "👤" as any },
          { id: "2", title: "Tool call", description: "Search for Table component.", time: "10:03", icon: "🛠" as any },
          { id: "3", title: "Completed", description: "Implemented DataGrid wrapper.", time: "10:05", icon: "✅" as any },
        ]}
      />
    </div>
  ),
};

