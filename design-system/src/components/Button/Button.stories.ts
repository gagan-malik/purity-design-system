import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../index";

import closeIcon from "../../assets/icons/alert/close.svg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "designsystem/Button",
  tags: ["autodocs"],
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "filled",
    imgSrc: closeIcon,
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    size: "md",
    color: "secondary",
  },
};

export const Label: Story = {
  args: {
    children: "Close",
    size: "md",
    color: "label",
    imgSrc: closeIcon,
  },
};

export const Disabled: Story = {
  args: {
    children: "Button",
    disabled: true,
    disabledReason: "This is the reasons",
    onClick: () => console.log("ck"),
  },
};

export const Mini: Story = {
  args: {
    imgSrc: closeIcon,
    size: "mini",
  },
};

export const CircleIcon: Story = {
  args: {
    imgSrc: closeIcon,
    size: "mini",
    shape: "circle",
  },
};

export const ImageReverse: Story = {
  args: {
    imgSrc: closeIcon,
    children: "Button",
    imagePlacement: "right",
  },
};

export const GradientColor: Story = {
  args: {
    children: "Close",
    size: "md",
    color: "gradient",
    imgSrc: closeIcon,
    shape: "circle",
    variant: "filled",
  },
};

