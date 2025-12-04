import type { Meta, StoryObj } from "@storybook/react-webpack5";
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
    size: "sm"
  },
};

export const MetricItemWithoutKPI: Story = {
  args: {
    data: 30,
    title: "Total Users",
    percentageChange: null,
  },
};

export const MetricItemSm: Story = {
  args: {
    data: 30,
    title: "Total Users",
    percentageChange: 45,
    size: "sm"
  },
};
