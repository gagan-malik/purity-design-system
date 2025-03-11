import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePickerV2.css"; // Your custom CSS
import DateInputShowComponent from "./DateInputShowComponent";
import CustomHeader from "./CustomHeaderProps";

interface CustomDateInputProps extends React.HTMLProps<HTMLButtonElement> {
  value?: string;
}

interface DateRangePickerV2Props {
  onDateRangeChange: (dateRange: [Date | null, Date | null]) => void;
  defaultDateRange: [Date | null, Date | null];
  showShortcuts: boolean;
}

export const DateRangePickerV2: React.FC<DateRangePickerV2Props> = ({ onDateRangeChange, defaultDateRange, showShortcuts }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(defaultDateRange);
  const [startDate, setStartDate] = useState<Date | undefined>(defaultDateRange[0] || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultDateRange[1] || undefined);
  const [open, setOpen] = useState(false);
  const clearDate = () => {
    setDateRange([null, null]);
    onDateRangeChange([null, null]);
  };

  const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
    ({ value, onClick }, ref) => (
      <DateInputShowComponent
        id="date-picker"
        placeholder={value || "Date"}
        onClick={onClick}
        ref={ref as React.Ref<HTMLDivElement>}
        clearDate={clearDate}
        setOpen={setOpen}
      />
    )
  );

  useEffect(() => {
    if (dateRange[0]) {
      setStartDate(dateRange[0]);
    } else {
      setStartDate(undefined);
    }

    if (dateRange[1]) {
      setEndDate(dateRange[1]);
    } else {
      setEndDate(undefined);
    }
  }, [dateRange]); 


  const handleDateRangeChange = (dateRange: [Date | null, Date | null]) => {
    setDateRange(dateRange);
    if (dateRange[0]) {
      setStartDate(dateRange[0]);
    } else {
      setStartDate(undefined);
    }
    if (dateRange[1]) {
      setEndDate(dateRange[1]);
    } else {
      setEndDate(undefined);
    }
    onDateRangeChange(dateRange);
  };

  return (
    <div  className=" relative z-99">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          handleDateRangeChange(update);
        }}
        calendarStartDay={1}
        customInput={<CustomDateInput />}
        open={open}
        onCalendarOpen={() => setOpen(true)}
        onCalendarClose={() => setOpen(false)}
        renderCustomHeader={(props) => {
          return (
            <CustomHeader
              date={props.date}
              decreaseMonth={props.decreaseMonth}
              increaseMonth={props.increaseMonth}
              setDateRange={handleDateRangeChange}
              setOpen={setOpen}
              showShortcuts={showShortcuts}
            />
          );
        }}
      />
    </div>
  );
};

export default DateRangePickerV2;
