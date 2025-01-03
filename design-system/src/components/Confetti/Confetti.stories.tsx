import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Confetti from "./Confetti";

const meta: Meta<typeof Confetti> = {
  component: Confetti,
  title: "designsystem/Confetti",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Confetti>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Base: Story = {
  args: {
    size: "sm",
    speed: "slow",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    speed: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    speed: "fast",
    width: 1000,
    height: 1000,
  },
};
