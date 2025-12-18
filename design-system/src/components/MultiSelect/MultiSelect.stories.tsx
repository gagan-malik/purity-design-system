import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect, MultiSelectOption } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "designsystem/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const options: MultiSelectOption[] = [
      { id: "a", label: "Design tokens" },
      { id: "b", label: "Storybook" },
      { id: "c", label: "AI primitives" },
      { id: "d", label: "Enterprise data grid", disabled: true },
    ];
    const [value, setValue] = React.useState<MultiSelectOption[]>([options[0]]);
    return (
      <div className="max-w-2xl">
        <MultiSelect label="Topics" options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};

