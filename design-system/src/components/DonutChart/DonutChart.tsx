import React from "react";
import PieChart from "../PieChart";

type chartData = {
  label: string;
  value: number;
  color: string;
};
export interface IDonutChartProps {
  data: chartData[];
  isDataLoading?: boolean;
}

export const DonutChart = ({ data, isDataLoading }: IDonutChartProps) => {
  return (
    <PieChart isDonutChart={true} data={data} isDataLoading={isDataLoading} />
  );
};
