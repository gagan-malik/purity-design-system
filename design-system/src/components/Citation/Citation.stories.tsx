import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Citation } from "./Citation";

const meta: Meta<typeof Citation> = {
  title: "designsystem/Citation",
  component: Citation,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Citation>;

export const Inline: Story = {
  render: () => (
    <div className="max-w-xl text-text-primary text-sm leading-6">
      This is an answer with a citation <Citation index={1} sources={[{ id: "1", title: "Design tokens overview", url: "https://example.com", snippet: "Tokens define color, type, and spacing." }]} />{" "}
      that you can open to view sources.
    </div>
  ),
};

