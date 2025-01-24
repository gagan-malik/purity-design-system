import React, { useState } from "react";
import crossIcon from "../../assets/icons/close-sm.svg";
import { ButtonV2 } from "../ButtonV2";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Checkbox } from "../Checkbox";
import { MetricItem } from "../MetricItem/MetricItem";
import Card from "./Card";
import Badge from "../Badge";
import {Icons} from "../Icons/Icons";

interface IFeedCardProps {
  type: "getting started" | "report" | "default" | "suggestion";
  title?: string | React.JSX.Element;
  closeClickHandler?: () => void;
  showCloseButton?: boolean;
  iconLeft?: string | React.JSX.Element;
  progress?: number;
  cardStyle ?:string;
  steps?: {
    step_name: string;
    id: string | number;
    isCompleted: boolean;
  }[];
  reportItems?: {
    title: string;
    data: number;
    percentageChange: number;
  }[];
  defaultItems?: {
    icon?: React.JSX.Element;
    title: string | React.JSX.Element;
    date?: string;
    dateType?: "default" | "overdue";
    children?: React.JSX.Element;
    onClickHandler?: () => void;
  }[];
  viewAllClickHandler?: () => void;
}
export const FeedCard: React.FC<IFeedCardProps> = ({
  iconLeft,
  title,
  type,
  closeClickHandler,
  showCloseButton = false,
  progress = 0,
  steps = [],
  reportItems = [],
  viewAllClickHandler,
  defaultItems = [],
  cardStyle = "h-[360px] w-xxs"
}) => {
  

  const getRightDiv = (item: any) => {

    let rightDiv = item?.children;
    
    if(item?.date && item?.dateType == "overdue") {
      rightDiv = <Badge color="custom"
      variant="filled"
      size="xs"
      customClass={{ filled: "bg-utility-error-50 text-utility-error-700" }}
      border={false}>
        <div className="flex flex-row gap-1 items-center">
          <Icons name="clock-stopwatch" size="xxs" color="text-utility-error-700" />
          <div>
            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </Badge>
    }else if(item?.date && item?.dateType == "default") {
      rightDiv = <Badge color="custom"
      variant="filled"
      size="xs"
      customClass={{ filled: "bg-utility-gray-50 text-utility-gray-700" }}
      border={false}>
        <div className="flex flex-row gap-1 items-center">
          <Icons name="clock-stopwatch" size="xxs" color="text-utility-gray-700" />
          <div>
            {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </Badge>
    }

    return rightDiv;
  }

    return (
      <div className={`flex flex-col p-6 bg-bg-primary_alt rounded-5xl gap-2 ${cardStyle}`}>
      <div className="flex flex-row justify-between items-center h-8">
        <div className="text-md font-semibold text-text-secondary">{title}</div>
        {showCloseButton && (
          <ButtonV2
            hierarchy="tertiary"
            size="xs"
            shape="rounded"
            iconTrailingSrc={crossIcon}
            iconOnly={true}
            onClick={closeClickHandler}
          />
        )}
      </div>
      {
          type === "getting started" && (
          (steps && steps.length > 0) ? <div className="flex flex-col gap-2">
            <div className="py-2">
              <ProgressBar progress={progress} size="sm" showLabel={true} />
            </div>
            {steps.map((step) => (
              <div key={step.id} className="flex flex-row gap-2 items-center px-4 py-2 rounded-5xl hover:bg-bg-secondary_hover">
                <Checkbox id={step.id.toString()} checked={step.isCompleted ? "basic" : "unchecked"} />
                <div className="text-text-secondary text-sm font-medium">{step.step_name}</div>
              </div>
            ))}
            </div>: <div className="flex h-full items-center justify-center gap-2">
            <div className="text-text-secondary text-sm font-semibold">No items found</div>
          </div>
        )
      }
      {
        type === "report" && (
          (reportItems && reportItems.length > 0) ? <div className="flex flex-col gap-2">
              {reportItems.map((item) => (
                <MetricItem data={item.data} title={item.title} percentageChange={item.percentageChange} size="sm" />
              ))}
            </div> : <div className="flex h-full items-center justify-center gap-2">
            <div className="text-text-secondary text-sm font-medium">No items found</div>
          </div>
        )
      }

    {
        type === "default" && (
          (defaultItems && defaultItems.length > 0) ? <div className="flex flex-col gap-2">
            {defaultItems.map((item) => (
              <Card title={item.title} size="sm" icon={item.icon} children={getRightDiv(item)} onClickHandler={item.onClickHandler} />
            ))}
          </div> : <div className="flex h-full items-center justify-center gap-2">
            <div className="text-text-secondary text-sm font-medium">No items found</div>
          </div>
        )
      }

      


      {/* View All */}

      {
        viewAllClickHandler && (
          <div className="flex justify-end">
            <ButtonV2  shape="rounded" hierarchy="tertiary" children="View All" onClick={viewAllClickHandler} />
          </div>
        )
      }
    </div>
  );
};

export default FeedCard;
