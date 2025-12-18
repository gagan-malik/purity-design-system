import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { Button } from "../Button";

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  setDateRange: (dateRange: [Date | null, Date | null]) => void;
  setOpen: (open: boolean) => void;
  showShortcuts: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  setDateRange,
  setOpen,
  showShortcuts,
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
     {showShortcuts && <div className="flex justify-between items-center pb-1">
        <Button tone="neutral" variant="ghost" onClick={() => { 
          setDateRange([dayjs().subtract(1, 'week').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Week
        </Button>
        <Button tone="neutral" variant="ghost" onClick={() => {
          setDateRange([dayjs().subtract(1, 'month').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Month
        </Button>
        <Button tone="neutral" variant="ghost" onClick={() => {
          setDateRange([dayjs().subtract(1, 'year').toDate(), dayjs().toDate()]);
          setOpen(false);
        }}>
          Last Year
        </Button>
      </div>}
    </div>
  );
};

export default CustomHeader;
