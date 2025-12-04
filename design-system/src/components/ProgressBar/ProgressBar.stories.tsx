import { Meta, StoryObj } from "@storybook/react-webpack5";
import { ProgressBar } from "./ProgressBar";
  
import React from "react";
const meta: Meta<typeof ProgressBar> = {
  title: "designsystem/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Base: Story = {
  args: {
    progress: 50,
  },
};

export const WithLabel: Story = {
  args: {
    progress: 50,
    showLabel: true,
  },
};