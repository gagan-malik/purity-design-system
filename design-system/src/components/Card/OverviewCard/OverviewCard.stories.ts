import type { Meta, StoryObj } from "@storybook/react-webpack5";
import OverviewCard from "./OverviewCard";

const meta: Meta<typeof OverviewCard> = {
  component: OverviewCard,
  title: "designsystem/OverviewCard",
  tags: ["autodocs"],
  argTypes: {
    title: { contro: "input" },
    data: { contro: "input" },
    trendDescription: { contro: "input" },
  },
  args: {
    title: "Incidents",
    data: 18,
    percentageChange: 45,
    trendDescription: "Compared to previous months",
  },
};

export default meta;
type Story = StoryObj<typeof OverviewCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const CardOverview: Story = {
  args: {},
};

export const CardOverviewLoading: Story = {
  args: {    title: "Incidents",
    data: 18,
    percentageChange: 45,
    trendDescription: "Compared to previous months",
    isDataLoading: true,
    isPercentageLoading: true,
  }
};

