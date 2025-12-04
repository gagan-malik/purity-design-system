import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AreaChart } from "../../index";

const keys = ["uv", "pv"];
const gradientColors = [
  "#00C49F",
  "#84caff",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
];
const lineColors = ["#00C49F", "#175cd3", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    gap: 100,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    gap: 100,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    gap: 100,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    gap: 100,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    gap: 100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
    gap: 100,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    gap: 100,
  },
];

const meta: Meta<typeof AreaChart> = {
  component: AreaChart,
  title: "designsystem/AreaChart",
  tags: ["autodocs"],
  args: {
    height: 200,
    data,
    dataKeys: keys,
    gradientColors,
    lineColors,
  },
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Base: Story = {
  args: { hideAxis: false },
};
export const StackchartWithLoadingData: Story = {
  args: { hideAxis: false, isDataLoading: true },
};
export const WithoutAxis: Story = {
  args: { height: 400 },
};
