import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { FloatingToolbar } from "./FloatingToolbar";

const meta: Meta<typeof FloatingToolbar> = {
  component: FloatingToolbar,
  title: "designsystem/FloatingToolbar",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Base: Story = {
  args: {
    children: <div>Hello</div>, 
    action: <div>Action</div>,
    onBackClickHandler: () => {alert("Back")},
    onCloseClickHandler: () => {alert("Close")},
    showBackButton: true,
    showCloseButton: true,
  },
};

export const Base2: Story = {
    args: {
      children: <div>Hello</div>, 
      action: <div>Action</div>,

      onCloseClickHandler: () => {alert("Close")},
      showBackButton: false,
      showCloseButton: true,
    },
  };
  