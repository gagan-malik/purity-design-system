import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "designsystem/ColorPicker",
  component: ColorPicker,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("#1570ef");
    return (
      <div className="max-w-xl">
        <ColorPicker label="Accent color" value={value} onChange={setValue} />
      </div>
    );
  },
};

