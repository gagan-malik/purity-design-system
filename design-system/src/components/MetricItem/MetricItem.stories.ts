import type { Meta, StoryObj } from "@storybook/react";
import MetricItem from "./MetricItem";

const meta: Meta<typeof MetricItem> = {
  component: MetricItem,
  title: "designsystem/MetricItem",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    data: 18,
  },
};

export default meta;
type Story = StoryObj<typeof MetricItem>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc

export const MetricItemPositive: Story = {
  args: {
    data: 30,
    title: "Total Users",
    percentageChange: 45,
  },
};

export const MetricItemNegative: Story = {
  args: {
    data: 30,
    title: "Total Users",
    percentageChange: -45,
  },
};

export const MetricItemWithoutKPI: Story = {
  args: {
    data: 30,
    title: "Total Users",
    percentageChange: null,
  },
};
