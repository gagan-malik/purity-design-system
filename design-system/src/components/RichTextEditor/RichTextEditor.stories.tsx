import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "designsystem/RichTextEditor",
  component: RichTextEditor,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("<p>Hello <b>world</b></p>");
    return (
      <div className="max-w-2xl space-y-3">
        <RichTextEditor label="Notes" value={value} onChange={setValue} />
        <div className="text-xs text-text-tertiary font-mono break-words">{value}</div>
      </div>
    );
  },
};

