import React from "react";
import CardKPI from "../common/CardKPI";
import Loader from "../../Loader";

interface IBasicCardProps {
  title?: string;
  data?: any;
  percentageChange?: number;
  trendDescription?: string;
  isDataLoading?: boolean;
  isPercentageLoading?: boolean;
}

const OverviewCard = (props: IBasicCardProps) => {
  const {
    title,
    data,
    percentageChange = 0,
    trendDescription,
    isDataLoading,
    isPercentageLoading,
  } = props;
  return (
    <div
      className={`bg-cardbg flex h-[162px] flex-col justify-between rounded-2xl px-6 py-8 dark:bg-slate-600`}
    >
      <p className="text-base font-semibold leading-6 dark:text-white">
        {title}
      </p>
      <div className="flex items-end justify-between">
        {isDataLoading ? (
          <div style={{ paddingLeft: "15px" }}>
            <Loader />
          </div>
        ) : (
          <p className=" text-4xl font-bold dark:text-slate-300">{data}</p>
        )}
        {isPercentageLoading ? (
          <></>
        ) : (
          <CardKPI
            percentageChange={percentageChange}
            description={trendDescription}
          />
        )}
      </div>
    </div>
  );
};

export default OverviewCard;
