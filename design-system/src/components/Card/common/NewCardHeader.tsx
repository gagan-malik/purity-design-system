import React from "react";
import CardKPI from "./CardKPI";

interface INewCardHeader {
  title: string;
  trendData?: {
    data: string | number;
    percentageChange: number;
    trendDescription: string;
  };
}

const NewCardHeader: React.FC<INewCardHeader> = ({ title, trendData }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-base font-semibold text-text-primary">{title}</p>
      </div>
      {trendData && (
        <div className="flex gap-4 w-full items-center">
          <p className="font-semibold text-text-primary text-4xl">
            {trendData?.data}
          </p>
          <CardKPI
            percentageChange={trendData?.percentageChange}
            description={trendData?.trendDescription}
          />
        </div>
      )}
    </div>
  );
};

export default NewCardHeader;
