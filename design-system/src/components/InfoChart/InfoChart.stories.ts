import type { Meta, StoryObj } from "@storybook/react";
import InfoChart from "./InfoChart";

const meta: Meta<typeof InfoChart> = {
  component: InfoChart,
  title: "designsystem/InfoChart",
  tags: ["autodocs"],
  argTypes: {
    data: { contro: "input" },
    percentageChange: { contro: "input" },
  },
  args: {
    data: 18,
  },
};

export default meta;
type Story = StoryObj<typeof InfoChart>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const ChartInfo: Story = {
  args: {
    data: 20,
    percentageChange: 45,
    trendDescription: "Compared to previous months",
  },
};

export const ChartInfoWithoutKPI: Story = {
  args: {
    data: 30,
  },
};

export const ChartInfoWithoutData: Story = {
  args: {
    data: undefined,
    percentageChange: 50,
  },
};
export const ChartInfoWithLoadingData: Story = {
  args: {
    isDataLaoding: true,
    isPercentageChangeLoading: true,
    data: undefined,
    percentageChange: 50,
  },
};
