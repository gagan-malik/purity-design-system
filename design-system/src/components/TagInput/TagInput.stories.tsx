import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "./TagInput";

const meta: Meta<typeof TagInput> = {
  title: "designsystem/TagInput",
  component: TagInput,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(["design", "tokens"]);
    return (
      <div className="max-w-2xl">
        <TagInput value={tags} onChange={setTags} />
      </div>
    );
  },
};

