import React from "react";
import CardKPI from "../Card/common/CardKPI";
import classNames from "classnames";
import { Loader } from "../../index";

interface IPropsInfoChart {
  data: number | string;
  percentageChange?: number;
  trendDescription?: string;
  isDataLaoding?: boolean;
  isPercentageChangeLoading?: boolean;
}

const InfoChart = (props: IPropsInfoChart) => {
  const {
    data,
    percentageChange,
    trendDescription,
    isDataLaoding,
    isPercentageChangeLoading,
  } = props;
  return (
    <div className="flex flex-col w-full items-start gap-4">
      {isDataLaoding ? (
        <Loader />
      ) : (
        <p
          className={`font-semibold text-text-primary ${
            data && (data as number) <= 1000 ? "text-4xl" : "text-3xl"
          }`}
        >
          {data ?? "No Data"}
        </p>
      )}
      {isPercentageChangeLoading ? (
        <Loader size="sm" />
      ) : (
        <>
          {percentageChange !== null && percentageChange !== undefined && (
            <CardKPI
              percentageChange={percentageChange}
              description={trendDescription}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InfoChart;
