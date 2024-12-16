import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InfoContainer } from "../../index";
import homeIcon from "../../assets/icons/home.svg"
import Badge from "../Badge";
import star from "../../assets/icons/star.svg";
import { PagginationDotGroup } from ".";

const meta: Meta<typeof PagginationDotGroup> = {
  component: PagginationDotGroup,
  title: "designsystem/PagginationDotGroup",
  tags: ["autodocs"],
  args: {
  },
};

export default meta;
type Story = StoryObj<typeof PagginationDotGroup>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc

export const PagginationDotGroupDot: Story = {
  args: {
    type: "dot",
    size: "medium",
    activeIndex: 2,
    totalSteps: 5,
    variant: "transparent",
  },
};

export const PagginationDotGroupLine: Story = {
  args: {
    type: "line",
    size: "medium",
    activeIndex: 2,
    totalSteps: 5,
    variant: "filled",
  },
};