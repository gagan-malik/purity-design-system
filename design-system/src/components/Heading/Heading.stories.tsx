import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Heading } from "../../index";

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: "designsystem/Heading",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heading>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const heading: Story = {
  args: {
    heading: "My Heading",
    action: <button>Some Button</button>,
    breadCrumb: <div>Home {">"} Heading</div>,
    subHeading: "Sub Heading",
    type: "default",
  },
};

export const subHeaing: Story = {
  args: { subHeading: "Sub Heading" },
};

export const smallHeading: Story = {
  args: {
    heading: "Small Heading",
    action: <button>Some Button</button>,
    subHeading: "Sub Heading",
    type: "small",
  },
};

export const largeHeading: Story = {
  args: {
    heading: "Small Heading",
    action: <button>Some Button</button>,
    subHeading: "Sub Heading",
    type: "large",
  },
};