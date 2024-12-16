import React from "react";
import {
  AreaChart as AreaChartRecharts,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader } from "../..";

export interface IAreaChartProps {
  height?: number;
  data: { [key in string]: number | string }[];
  dataKeys: string[];
  gradientColors: string[];
  lineColors: string[];
  hideAxis?: boolean;
  isDataLoading?: boolean;
}
export const AreaChart = ({
  height,
  data,
  dataKeys,
  gradientColors,
  lineColors,
  hideAxis = true,
  isDataLoading,
}: IAreaChartProps) => {
  return isDataLoading ? (
    <div className="flex items-end h-full">
      <Loader />
    </div>
  ) : (
    <ResponsiveContainer width={"99%"} height={height}>
      {data.length > 0 ? (
        <AreaChartRecharts
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {dataKeys.map((datakey, index) => (
              <linearGradient id={datakey} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={gradientColors[index]}
                  stopOpacity={0.7}
                />
                <stop
                  offset="80%"
                  stopColor={gradientColors[index]}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="name" hide={hideAxis} />
          <YAxis hide={hideAxis} />
          <Tooltip />
          {dataKeys.map((datakey, index) => (
            <Area
              type="monotone"
              dataKey={datakey}
              stroke={lineColors[index]}
              fillOpacity={1}
              fill={`url(#${datakey})`}
              strokeWidth={1.5}
            />
          ))}
        </AreaChartRecharts>
      ) : (
        <div className="flex items-end h-full">
          <p className="text-5xl font-bold text-baseBlack">No Data</p>
        </div>
      )}
    </ResponsiveContainer>
  );
};
