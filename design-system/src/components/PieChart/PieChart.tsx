import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from "recharts";
import Identifiers from "./Identifiers";
import { Loader } from "../../index";

// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5
//   const x = cx + radius * Math.cos(-midAngle * RADIAN)
//   const y = cy + radius * Math.sin(-midAngle * RADIAN)

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   )
// }
type chartData = {
  label: string;
  value: number;
  color: string;
};
export interface IPieChartProps {
  data: chartData[];
  isDataLoading?: boolean;
  isDonutChart?: boolean;
}

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  const color = payload[0]?.payload?.color;

  if (active) {
    return (
      <div className="custom-tooltip rounded-md border border-solid border-borderPrimary bg-white p-1.5">
        <label>
          <span style={{ color }}>{payload[0].name}</span>
          {` : ${payload[0].value}%`}
        </label>
      </div>
    );
  }
  return null;
};

const PieChart = (props: IPieChartProps) => {
  const { data, isDataLoading, isDonutChart } = props;

  let COLORS: string[] = [];
  data.forEach((data) => {
    COLORS.push(data.color);
  });

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 rounded-2xl py-2">
      <div className="flex w-full items-center gap-4">
        {isDataLoading ? (
          <Loader />
        ) : (
          <>
            {data.length > 0 ? (
              <RechartsPieChart width={130} height={130}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  // label={renderCustomizedLabel}
                  outerRadius={65}
                  innerRadius={isDonutChart ? 50 : 0}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            ) : (
              <p className="text-5xl font-bold text-baseBlack">No Data</p>
            )}
            <Identifiers data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default PieChart;
