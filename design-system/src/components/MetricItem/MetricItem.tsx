import React from "react";
import Badge from "../Badge"; 

interface IPropsMetricItem {
  data: number | string;
  percentageChange?: number | null;
  title: string;
  isLoading?: boolean;
}

export const MetricItem: React.FC<IPropsMetricItem> = ({
  data,
  percentageChange,
  title,
  isLoading,
}) => {
  let kpiValue = percentageChange ? percentageChange > 0 ? "+"+percentageChange+"%" :  percentageChange+"%" : "-";
  let badgeColor =  percentageChange ? percentageChange > 0 ? "success" :  "counter" : "default";
  return (
    <div className="flex flex-col items-start gap-4 rounded-6xl p-6 min-w-80 bg-bg-secondary hover:bg-bg-secondary_hover">
      <span className="text-base font-semibold text-text-primary">{title}</span>
      <div className="flex w-full justify-between items-center">
        <span className="text-3xl font-medium text-text-primary">{data}</span>
        <div><Badge color={badgeColor as "success" | "counter" | "default"} variant="filled" border={false}>
          {kpiValue}
        </Badge></div>
      </div>
    </div>
  );
};

export default MetricItem;
