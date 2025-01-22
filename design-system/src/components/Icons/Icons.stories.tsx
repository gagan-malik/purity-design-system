import { Meta, StoryObj } from "@storybook/react";
import { Icons } from "./Icons";
  
import React from "react";
const meta: Meta<typeof Icons> = {
  title: "designsystem/Icons",
  component: Icons,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icons>;

export const Base: Story = {
  args: {
    name: "clock-stopwatch",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    name: "clock-stopwatch",
    size: "md",
    background: "bg-bg-secondary",
  },
};
