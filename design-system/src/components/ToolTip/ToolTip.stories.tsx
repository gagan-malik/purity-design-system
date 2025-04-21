import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BasicButton, ToolTip as TTip } from "../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TTip> = {
  component: TTip,
  title: "designsystem/ToolTip",
  tags: ["autodocs"],
  argTypes: {
    text: { contro: "input" },
  },
  args: {
    text: "Hover over me",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ToolTip: Story = {
  args: {
    children: <div className="w-40 h-40 m-auto rounded-md bg-bg-primary-solid text-white flex items-center justify-center">Hover Me</div>,
    text: "Hover over me",
  },
};

export const ToolTipWithArrow: Story = {
  args: {
    children: <BasicButton text="Button" />,
    text: "Hover over me",
    showArrow: true,
  },
};

export const ToolTipWithDescription: Story = {
  args: {
    children: <BasicButton text="Button" />,
    text: "Hover over me",
    showArrow: true,
    desc: "This is a description This is a description This is a description This is a description This is a description This is a description This is a description",
  },
};
