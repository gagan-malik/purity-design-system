import type { Meta, StoryObj } from "@storybook/react-webpack5";
import CardDashboard from "./DashboardCard";
import PieChart from "../../PieChart";
import React from "react";
import InfoChart from "../../InfoChart";
import { Stackchart } from "../../Stackchart";
import { AreaChart } from "../../AreaChart";
import { DashboardCards } from "../..";

const dataPieChart = [
  { label: "Type 1", value: 200, color: "#0E9384" },
  { label: "Type 2", value: 300, color: "#4A1FB8" },
  { label: "Type 3", value: 400, color: "#06B6D4" },
  { label: "Type 4", value: 500, color: "#194185" },
  { label: "others", value: 250, color: "#7A5AF8" },
];

const areaChartData = [
  {
    amt: 2400,
    gap: 100,
    name: "Page A",
    pv: 2400,
    uv: 4000,
  },
  {
    amt: 2210,
    gap: 100,
    name: "Page B",
    pv: 1398,
    uv: 3000,
  },
  {
    amt: 2290,
    gap: 100,
    name: "Page C",
    pv: 9800,
    uv: 2000,
  },
  {
    amt: 2000,
    gap: 100,
    name: "Page D",
    pv: 3908,
    uv: 2780,
  },
  {
    amt: 2181,
    gap: 100,
    name: "Page E",
    pv: 4800,
    uv: 1890,
  },
  {
    amt: 2500,
    gap: 100,
    name: "Page F",
    pv: 3800,
    uv: 2390,
  },
  {
    amt: 2100,
    gap: 100,
    name: "Page G",
    pv: 4300,
    uv: 3490,
  },
];
const areaDataKeys = ["uv", "pv"];
const areaGradientColors = [
  "#00C49F",
  "#84caff",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
];
const areaLineColors = [
  "#00C49F",
  "#175cd3",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
];

const keysBarChart = ["uv", "pv"];
const colorsBarChart = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "red",
  "pink",
];
const dataBarChart = [
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

const meta: Meta<typeof CardDashboard> = {
  component: CardDashboard,
  title: "designsystem/DashboardCard",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Incidents",
    subTitle: "ZAMIL GROUP",
  },
};

export default meta;
type Story = StoryObj<typeof CardDashboard>;
// type StoryBasicCard = StoryObj<typeof BasicCard>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const CardWithPieChart: Story = {
  args: {
    gap: "sm",
    children: <PieChart isDonutChart data={dataPieChart} />,
  },
};

export const CardWithPieChartWithoutData: Story = {
  args: {
    title: "Incidents with big title",
    subTitle: "ZAMIL GROUP",
    children: <PieChart isDonutChart data={[]} />,
  },
};

export const CardWithPieChartWithLoadingData: Story = {
  args: {
    title: "Incidents with big title",
    subTitle: "ZAMIL GROUP",
    children: <PieChart isDonutChart data={[]} isDataLoading={true} />,
  },
};

export const CardWithBarChart: Story = {
  args: {
    children: (
      <Stackchart
        data={dataBarChart}
        dataKeys={keysBarChart}
        colors={colorsBarChart}
        hideAxis={false}
      />
    ),
  },
};
export const CardWithBarChartWithoutData: Story = {
  args: {
    children: (
      <Stackchart data={[]} dataKeys={keysBarChart} colors={colorsBarChart} />
    ),
  },
};
export const CardWithBarChartWithLoadingData: Story = {
  args: {
    children: (
      <Stackchart
        isDataLoading={true}
        data={[]}
        dataKeys={keysBarChart}
        colors={colorsBarChart}
      />
    ),
  },
};

export const CardWithKPI: Story = {
  args: {
    children: (
      <InfoChart
        data={18}
        percentageChange={30}
        trendDescription="Compared to previous months"
      />
    ),
  },
};

export const CardKPILoadingData: Story = {
  args: {
    children: (
      <InfoChart
        isDataLaoding={true}
        data={18}
        percentageChange={30}
        trendDescription="Compared to previous months"
      />
    ),
  },
};

export const CardWithoutKPI: Story = {
  args: {
    children: <InfoChart data={18} />,
  },
};

export const CardWithAreaChart: Story = {
  args: {
    gap: "sm",
    children: (
      <AreaChart
        data={areaChartData}
        dataKeys={areaDataKeys}
        gradientColors={areaGradientColors}
        hideAxis
        lineColors={areaLineColors}
        height={100}
      />
    ),
  },
};

export const sampleReportsPage: Story = {
  render: () => {
    const kpiCardData = [
      {
        title: "KPI Name",
        data: 10,
        percentageChange: 100,
        trendDescription: "vs last month",
      },
      {
        title: "KPI Name",
        data: 15,
        percentageChange: -100,
        trendDescription: "vs last month",
      },
      {
        title: "KPI Name",
        data: 99,
        percentageChange: 0,
        trendDescription: "vs last month",
      },
    ];

    const pieChartData = [
      {
        title: "KPI Name",
        data: [
          {
            color: "#1570EF",
            label: "Series 1",
            value: 200,
          },
          {
            color: "#2E90FA",
            label: "Series 2",
            value: 300,
          },
          {
            color: "#53B1FD",
            label: "Series 3",
            value: 400,
          },
          {
            color: "#84CAFF",
            label: "Series 4",
            value: 500,
          },
          {
            color: "#EAECF0",
            label: "Series 5",
            value: 250,
          },
        ],
      },
      {
        title: "KPI Name",
        data: [
          {
            color: "#1570EF",
            label: "Series 1",
            value: 200,
          },
          {
            color: "#2E90FA",
            label: "Series 2",
            value: 300,
          },
          {
            color: "#53B1FD",
            label: "Series 3",
            value: 400,
          },
          {
            color: "#84CAFF",
            label: "Series 4",
            value: 500,
          },
          {
            color: "#EAECF0",
            label: "Series 5",
            value: 250,
          },
        ],
      },
      {
        title: "KPI Name",
        data: [
          {
            color: "#1570EF",
            label: "Series 1",
            value: 200,
          },
          {
            color: "#2E90FA",
            label: "Series 2",
            value: 300,
          },
          {
            color: "#53B1FD",
            label: "Series 3",
            value: 400,
          },
          {
            color: "#84CAFF",
            label: "Series 4",
            value: 500,
          },
          {
            color: "#EAECF0",
            label: "Series 5",
            value: 250,
          },
        ],
      },
    ];

    const aChartData = [
      {
        title: "KPI Name",
        trendData: {
          data: 10,
          percentageChange: 100,
          trendDescription: "vs last month",
        },
        data: [
          {
            amt: 0,
            gap: 100,
            name: "Page A",
            pv: 2400,
            uv: 500,
          },
          {
            amt: 2210,
            gap: 100,
            name: "Page B",
            pv: 1398,
            uv: 3000,
          },
          {
            amt: 2290,
            gap: 100,
            name: "Page C",
            pv: 9800,
            uv: 2000,
          },
          {
            amt: 2000,
            gap: 100,
            name: "Page D",
            pv: 3908,
            uv: 2780,
          },
          {
            amt: 2181,
            gap: 100,
            name: "Page E",
            pv: 4800,
            uv: 1890,
          },
          {
            amt: 2500,
            gap: 100,
            name: "Page F",
            pv: 3800,
            uv: 2390,
          },
          {
            amt: 2100,
            gap: 100,
            name: "Page G",
            pv: 4300,
            uv: 3490,
          },
        ],
        dataKeys: ["uv"],
        gradientColors: ["#1570EF"],
        height: 100,
        lineColors: ["#1570EF"],
      },
      {
        title: "KPI Name",
        trendData: {
          data: 15,
          percentageChange: -100,
          trendDescription: "vs last month",
        },
        data: [
          {
            amt: 0,
            gap: 100,
            name: "Page A",
            pv: 2400,
            uv: 500,
          },
          {
            amt: 2210,
            gap: 100,
            name: "Page B",
            pv: 1398,
            uv: 3000,
          },
          {
            amt: 2290,
            gap: 100,
            name: "Page C",
            pv: 9800,
            uv: 2000,
          },
          {
            amt: 2000,
            gap: 100,
            name: "Page D",
            pv: 3908,
            uv: 2780,
          },
          {
            amt: 2181,
            gap: 100,
            name: "Page E",
            pv: 4800,
            uv: 1890,
          },
          {
            amt: 2500,
            gap: 100,
            name: "Page F",
            pv: 3800,
            uv: 2390,
          },
          {
            amt: 2100,
            gap: 100,
            name: "Page G",
            pv: 4300,
            uv: 3490,
          },
        ],
        dataKeys: ["uv"],
        gradientColors: ["#1570EF"],
        height: 100,
        lineColors: ["#1570EF"],
      },
      {
        title: "KPI Name",
        trendData: {
          data: 99,
          percentageChange: 0,
          trendDescription: "vs last month",
        },
        data: [
          {
            amt: 0,
            gap: 100,
            name: "Page A",
            pv: 2400,
            uv: 500,
          },
          {
            amt: 2210,
            gap: 100,
            name: "Page B",
            pv: 1398,
            uv: 3000,
          },
          {
            amt: 2290,
            gap: 100,
            name: "Page C",
            pv: 9800,
            uv: 2000,
          },
          {
            amt: 2000,
            gap: 100,
            name: "Page D",
            pv: 3908,
            uv: 2780,
          },
          {
            amt: 2181,
            gap: 100,
            name: "Page E",
            pv: 4800,
            uv: 1890,
          },
          {
            amt: 2500,
            gap: 100,
            name: "Page F",
            pv: 3800,
            uv: 2390,
          },
          {
            amt: 2100,
            gap: 100,
            name: "Page G",
            pv: 4300,
            uv: 3490,
          },
        ],
        dataKeys: ["uv"],
        gradientColors: ["#1570EF"],
        height: 100,
        lineColors: ["#1570EF"],
      },
    ];

    return (
      <div className="flex flex-col gap-4 bg-bg-primary dark p-4">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-text-primary">KPIs</p>
          <div className="gap-6 grid grid-cols-3">
            {kpiCardData.map((data, ind) => {
              return (
                <DashboardCards
                  key={ind}
                  title={data.title}
                  children={
                    <InfoChart
                      data={data.data}
                      percentageChange={data.percentageChange}
                      trendDescription={data.trendDescription}
                    />
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-text-primary">Trends</p>
          <div className="gap-6 grid grid-cols-3">
            {aChartData.map((data, ind) => {
              return (
                <DashboardCards
                  key={ind}
                  title={data.title}
                  trendData={data.trendData}
                  children={
                    // <AreaChart
                    //   data={data.data}
                    //   dataKeys={data.dataKeys}
                    //   gradientColors={data.gradientColors}
                    //   lineColors={data.lineColors}
                    //   hideAxis={true}
                    // />
                    <AreaChart
                      data={[
                        {
                          amt: 0,
                          gap: 100,
                          name: "Page A",
                          pv: 2400,
                          uv: 500,
                        },
                        {
                          amt: 2210,
                          gap: 100,
                          name: "Page B",
                          pv: 1398,
                          uv: 3000,
                        },
                        {
                          amt: 2290,
                          gap: 100,
                          name: "Page C",
                          pv: 9800,
                          uv: 2000,
                        },
                        {
                          amt: 2000,
                          gap: 100,
                          name: "Page D",
                          pv: 3908,
                          uv: 2780,
                        },
                        {
                          amt: 2181,
                          gap: 100,
                          name: "Page E",
                          pv: 4800,
                          uv: 1890,
                        },
                        {
                          amt: 2500,
                          gap: 100,
                          name: "Page F",
                          pv: 3800,
                          uv: 2390,
                        },
                        {
                          amt: 2100,
                          gap: 100,
                          name: "Page G",
                          pv: 4300,
                          uv: 3490,
                        },
                      ]}
                      dataKeys={["uv"]}
                      gradientColors={["#1570EF"]}
                      height={100}
                      lineColors={["#1570EF"]}
                    />
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-text-primary">Breakdowns</p>
          <div className="gap-6 grid grid-cols-3">
            {pieChartData.map((data, ind) => {
              return (
                <DashboardCards
                  key={ind}
                  title={data.title}
                  children={<PieChart isDonutChart data={data.data} />}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
};
