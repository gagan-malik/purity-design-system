import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rating } from "./Rating";

const meta: Meta<typeof Rating> = {
  title: "Atoms/Rating",
  component: Rating,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(3);
    return <Rating label="Quality" value={value} onChange={setValue} />;
  },
};

