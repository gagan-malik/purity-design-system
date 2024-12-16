import type { Meta, StoryObj } from "@storybook/react";
import { Stackchart } from "../../index";

const keys = ["uv", "pv"];
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

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

const meta: Meta<typeof Stackchart> = {
  component: Stackchart,
  title: "designsystem/Stackchart",
  tags: ["autodocs"],
  args: {
    height: 200,
    barSize: 15,
    data,
    strokeWidth: 5,
    dataKeys: keys,
    colors,
  },
};

export default meta;
type Story = StoryObj<typeof Stackchart>;

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
export const BroadSize: Story = {
  args: { barSize: 30 },
};

// Add comment here about Primary to show on doc
// export const Primary:Story={
//   args={message:"Hello"}
//   render:(args)=> <Alert {...args}/>
// }
