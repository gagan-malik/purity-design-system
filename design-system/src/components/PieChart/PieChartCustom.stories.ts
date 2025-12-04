import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PieChart } from "../../index";

const meta: Meta<typeof PieChart> = {
  component: PieChart,
  title: "designsystem/PieChart",
  tags: ["autodocs"],
  argTypes: {
    data: { control: "array" },
  },
  args: {
    data: [
      { label: "Type 1", value: 200, color: "#0E9384" },
      { label: "Type 2", value: 300, color: "#4A1FB8" },
      { label: "Type 3", value: 400, color: "#06B6D4" },
      { label: "Type 4", value: 500, color: "#194185" },
      { label: "others", value: 250, color: "#7A5AF8" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Base: Story = {
  args: {},
};

export const PieChartWithoutData: Story = {
  args: {
    data: [],
  },
};

export const PieChartWithLoadingData: Story = {
  args: {
    data: [],
    isDataLoading: true,
  },
};
