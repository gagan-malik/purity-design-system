import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, ComboboxOption } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "designsystem/Combobox",
  component: Combobox,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => {
    const options: ComboboxOption[] = [
      { id: 1, label: "GPT-4.1" },
      { id: 2, label: "GPT-4.1 mini" },
      { id: 3, label: "Local small", disabled: true },
    ];
    const [value, setValue] = React.useState<ComboboxOption | undefined>(options[0]);

    return (
      <div className="max-w-xl">
        <Combobox label="Model" options={options} value={value} onChange={setValue} />
      </div>
    );
  },
};

