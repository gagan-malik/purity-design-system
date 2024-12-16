import React from "react";
import { IPieChartProps } from "./PieChart";

const Identifiers = (props: IPieChartProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {props.data.map((data) => {
        return (
          <div className="flex items-center justify-start gap-2">
            <div
              style={{ backgroundColor: data.color }}
              className={`h-2 min-h-[8px] w-2 rounded-[40px]`}
            ></div>
            <span className="text-text-tertiary text-sm font-normal">
              {data.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Identifiers;
