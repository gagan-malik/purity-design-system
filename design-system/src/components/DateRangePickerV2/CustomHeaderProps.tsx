import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { ButtonV2 } from "../ButtonV2";

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
  setOpen: (open: boolean) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  setDateRange,
  setOpen,
}) => {
  return (
    <div className="bg-bg-primary rounded-4xl">
      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer p-2 rounded-full hover:bg-bg-primary_hover"
          onClick={decreaseMonth}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" color="#1570ef"/>
        </div>
        <div
          className="font-medium text-fg-secondary"
          style={{ fontSize: "16px" }}
        >
          {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>

        <div
          className="cursor-pointer p-2 rounded-full hover:bg-bg-primary_hover"
          onClick={increaseMonth}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" color="#1570ef"/>
        </div>
      </div>
      <div className="flex justify-between items-center pb-1">
        <ButtonV2 hierarchy="tertiary" textColor="text-button-tertiaryColorFg" onClick={() => { 
          setDateRange([dayjs().subtract(1, 'week').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Week
        </ButtonV2>
        <ButtonV2 hierarchy="tertiary" textColor="text-button-tertiaryColorFg" onClick={() => {
          setDateRange([dayjs().subtract(1, 'month').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Month
        </ButtonV2>
        <ButtonV2 hierarchy="tertiary" textColor="text-button-tertiaryColorFg" onClick={() => {
          setDateRange([dayjs().subtract(1, 'year').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Year
        </ButtonV2>
      </div>
    </div>
  );
};

export default CustomHeader;
