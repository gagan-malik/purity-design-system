import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { Loader } from "../..";

export interface IStackchartProps {
  height?: number;
  barSize?: number;
  data: { [key in string]: number | string }[];
  strokeWidth?: number;
  dataKeys: string[];
  colors: string[];
  chartBackgroundColor?: string;
  hideAxis?: boolean;
  isDataLoading?: boolean;
}
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload?.length) {
    const activeDataKey = payload[0]?.dataKey; // get name of hovered over
    const filteredPayload = payload.filter(
      (item) => item.dataKey === activeDataKey // filter out active line
    );

    // show tooltip info using filtered payload
    return (
      <div className="bg-primary-50">
        <p>{label}</p>
        {filteredPayload.map((item, index) => (
          <p key={index}>{`${item.name} : ${item.value}`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export const Stackchart = ({
  height = 200,
  barSize = 15,
  chartBackgroundColor = "#fff",
  data,
  strokeWidth = 5,
  dataKeys,
  colors,
  hideAxis = true,
  isDataLoading,
}: IStackchartProps) => {
  return (
    <>
      {isDataLoading ? (
        <div className="flex items-end h-full">
          <Loader />
        </div>
      ) : (
        <ResponsiveContainer width={"99%"} height={height}>
          {data.length > 0 ? (
            <BarChart
              barSize={barSize}
              data={data}
              // style={{ stroke: chartBackgroundColor, strokeWidth }}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" hide={hideAxis} />
              <YAxis hide={hideAxis} />
              <Tooltip
                content={<CustomTooltip />}
                shared={false}
                cursor={{ fill: "transparent" }}
              />
              {dataKeys.map((key: string, index: number): any => {
                const bars = [];
                bars.push(
                  <Bar
                    dataKey={key}
                    stackId="singleId"
                    fill={colors[index]}
                    radius={[10, 10, 10, 10]}
                    style={{ transform: `translateY(-${2 * (index + 1)}px)` }}
                  />
                );
                // To add spacing between 2 bars, there are 2 ways -
                // 1) Use stroke with matching backgroud color
                // 2) Add a dummy bar between 2 bars as shown in commented code below
                /* Add a bar just for the gap after each bar */
                // bars.push(<Bar dataKey="gap" stackId="a" fill="transparent" />);
                return bars;
              })}
            </BarChart>
          ) : (
            <div className="flex items-end h-full">
              <p className="text-5xl font-bold text-baseBlack">No Data</p>
            </div>
          )}
        </ResponsiveContainer>
      )}
    </>
  );
};
