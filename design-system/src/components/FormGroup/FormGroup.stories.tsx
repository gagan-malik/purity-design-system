import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FormGroup as FGroup, Input } from "../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof FGroup> = {
  component: FGroup,
  title: "designsystem/FormGroup",
  tags: ["autodocs"],
  argTypes: {
    children: { control: "input" },
  },
  args: {
    children: [
      <Input
        label="Name"
        required={true}
        onChange={(e) => console.log(e.target.value)}
        placeholder="Enter your name"
      />,
      <Input
        label="Email"
        required={true}
        onChange={(e) => console.log(e.target.value)}
        placeholder="Enter your email"
      />,
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const FormGroup: Story = {
  args: {},
};
