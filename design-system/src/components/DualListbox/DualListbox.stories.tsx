import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DualListbox } from "./DualListbox";

const meta: Meta<typeof DualListbox> = {
  title: "designsystem/DualListbox",
  component: DualListbox,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DualListbox>;

export const Default: Story = {
  render: () => {
    const options = Array.from({ length: 12 }, (_, i) => ({
      id: String(i + 1),
      label: `Option ${i + 1}`,
    }));
    const [value, setValue] = React.useState<string[]>(["1", "3"]);
    return (
      <div className="max-w-4xl">
        <DualListbox options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};

