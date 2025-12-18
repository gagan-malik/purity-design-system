import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CommandBar } from "./CommandBar";

const meta: Meta<typeof CommandBar> = {
  title: "designsystem/CommandBar",
  component: CommandBar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof CommandBar>;

export const Default: Story = {
  render: () => (
    <CommandBar
      maxVisible={3}
      actions={[
        { key: "run", label: "Run", onClick: () => {}, priority: 10 },
        { key: "stop", label: "Stop", onClick: () => {}, priority: 9 },
        { key: "share", label: "Share", onClick: () => {}, priority: 5 },
        { key: "export", label: "Export", onClick: () => {} },
        { key: "delete", label: "Delete", onClick: () => {}, disabled: true },
      ]}
    />
  ),
};

