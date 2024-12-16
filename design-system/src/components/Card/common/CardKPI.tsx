import React, { useState } from "react";
import greenArrowUp from "../../../assets/icons/greenArrowUp.svg";
import redArrowDown from "../../../assets/icons/redArrowDown.svg";

interface IPropsCardKPI {
  percentageChange?: number;
  description?: string;
}

const CardKPI = (props: IPropsCardKPI) => {
  const { percentageChange = 0, description } = props;

  // const [showTooltip, setShowTooltip] = useState(false);

  // const handleMouseEnter = () => {
  //   setShowTooltip(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowTooltip(false);
  // };

  return (
    <>
      <div className="flex gap-1 w-full">
        {percentageChange > 0 && <img src={greenArrowUp} alt="" />}
        {percentageChange < 0 && <img src={redArrowDown} alt="" />}

        <div className="flex gap-2 text-sm font-medium">
          <p
            className={`${
              percentageChange > 0 && "text-text-success-primary"
            } ${percentageChange < 0 && "text-text-error-primary"}
              ${percentageChange === 0 && "text-text-primary"}`}
          >
            {percentageChange === 0
              ? "No change"
              : Math.abs(percentageChange) + "%"}{" "}
          </p>
          <p className="text-text-tertiary">{description}</p>
        </div>
      </div>
    </>
  );
};

export default CardKPI;
