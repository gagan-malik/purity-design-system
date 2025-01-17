import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ReactPopover, PopoverPlacement } from "../MenuPopover/Popover";
import classNames from "classnames";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface IdateValue {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}

const getNextDays = (currentDate = new Date(), daysToAdd = 0) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};

function yyyymmdd(date: Date) {
  function twoDigit(n: number) {
    return (n < 10 ? "0" : "") + n;
  }

  return (
    date.getFullYear() +
    "-" +
    twoDigit(date.getMonth() + 1) +
    "-" +
    twoDigit(date.getDate())
  );
}

const manipulate = (year: number, month: number, date: Date): IdateValue[] => {
  const dateArray: IdateValue[] = [];
  // Get the first day of the month
  const currentDate = yyyymmdd(new Date());

  // Get the last date of the month
  let last = new Date(year, month + 1, 0);
  let lastdate = last.getDate();

  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();

  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0);

  // Loop to add the last dates of the previous month
  let count = 0;
  let i = monthlastdate.getDay();
  while (i !== 0) {
    const nextDate = getNextDays(monthlastdate, count);
    i = nextDate.getDay();
    if (i === 0) {
      break;
    }
    dateArray.splice(0, 0, {
      date: yyyymmdd(nextDate),
    });
    count -= 1;
  }

  count = 1;
  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    const nextDate = getNextDays(monthlastdate, count);
    const nextDateString = yyyymmdd(nextDate);

    // Check if the current date is today
    let isToday = nextDateString === currentDate;

    dateArray.push({
      date: nextDateString,
      isCurrentMonth: true,
      isToday: isToday,
    });
    count += 1;
  }

  count = 1;
  // Loop to add the first dates of the next month
  for (let i = dayend; i !== 0; ) {
    const nextDay = getNextDays(last, count);
    dateArray.push({
      date: yyyymmdd(nextDay),
    });
    count += 1;
    i = nextDay.getDay();
  }

  return dateArray;
};

function clsNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const addZeroPrefix = (currentMinutes: string | number) => {
  if (currentMinutes.toString().length == 1) {
    currentMinutes = "0" + currentMinutes;
  }
  return currentMinutes;
};

export function DatePicker({
  startFrom,
  onDateSelection,
  defaultSelectDate,
  onlyShow = "date",
  placement = PopoverPlacement.bottom,
  width,
  label,
  labelBold = true,
  required = false,
  title,
}: {
  startFrom?: Date;
  onDateSelection?: Function;
  defaultSelectDate: Date;
  onlyShow?: "date" | "time" | "datetime";
  placement?: PopoverPlacement;
  width?: { timeWidth?: string; dateWidth?: string };
  label?: string;
  labelBold?: boolean;
  required?: boolean;
  title?: string;
}) {
  const [currentDate, setCurrentDate] = useState(startFrom ?? new Date());
  const [dateArray, setDateArray] = useState([] as IdateValue[]);

  const [selectedDate, setSelectedDate] = useState(
    defaultSelectDate ?? undefined
  ) as [Date, React.Dispatch<React.SetStateAction<Date>>];

  const [hidePopover, setHidePopover] = useState(false);

  const [time, setTime] = useState(
    defaultSelectDate
      ? `${addZeroPrefix(defaultSelectDate?.getHours())}:${addZeroPrefix(
          defaultSelectDate?.getMinutes()
        )}`
      : undefined
  );

  useEffect(() => {
    if (onlyShow === "date" && selectedDate) {
      onDateSelection && onDateSelection(selectedDate);
    }
    if (onlyShow === "time" && time) {
      onDateSelection && onDateSelection(time);
    }
    if (onlyShow === "datetime" && selectedDate && time) {
      onDateSelection &&
        onDateSelection(new Date(`${yyyymmdd(selectedDate)}T${time}:00`));
    }
  }, [selectedDate, time]);

  // Focus on input when clicked
  const inputDate = document.getElementById("inputId");
  inputDate?.addEventListener("focus", function (evt) {
    if (this && this.getAttribute("type") === "time") {
      try {
        (this as any)?.showPicker();
        // A date picker is shown.
      } catch (error) {
        // Use external library when this fails.
      }
    }
  });

  // Onchange of time
  const handleChange = (event: any) => {
    setTime(event.target.value);
  };

  // changes dates from calendar on forward and previous click
  useEffect(() => {
    if (!currentDate) {
      return;
    }
    setDateArray(
      manipulate(currentDate.getFullYear(), currentDate.getMonth(), currentDate)
    );
  }, [currentDate]);

  // modifies the array for selected date
  useEffect(() => {
    if (!selectedDate || !dateArray.length) {
      return;
    }

    const selectedDateString = yyyymmdd(selectedDate);
    setDateArray(
      dateArray.map((date) => {
        if (date.date === selectedDateString) {
          return { ...date, isSelected: true };
        }
        return { ...date, isSelected: false };
      })
    );
  }, [selectedDate, JSON.stringify(dateArray)]);

  const onPrevMonthClick = () => {
    if (currentDate.getMonth() <= 0) {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 11, 1));
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
    }
  };

  const onNextMonthClick = () => {
    if (currentDate.getMonth() === 11) {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
    } else {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
    }
  };

  const onDateClick = (day: IdateValue) => {
    setSelectedDate(new Date(day.date));
    setHidePopover(true);
  };

  const dateInputClassname =
    onlyShow !== "date"
      ? "flex gap-2 flex-row bg-bg-primary group-hover:bg-bg-primary_hover border border-border-primary px-4 py-2 rounded-l-full overflow-hidden"
      : "flex items-center gap-2 bg-bg-primary group-hover:bg-bg-primary_hover px-4 py-2 rounded-full border border-border-secondary shadow-xs";

  const timeInputClassname =
    onlyShow !== "time"
      ? "flex flex-row text-text-secondary font-semibold text-text-secondary text-sm bg-bg-primary group-hover:bg-bg-primary_hover border border-border-primary px-4 py-0 rounded-r-full overflow-hidden"
      : "flex items-center gap-2  font-semibold text-text-secondary text-sm text-text-secondary bg-bg-primary group-hover:bg-bg-primary_hover px-4py-0rounded-full border border-border-secondary shadow-xs";
  return (
    <div className="flex flex-col items-start justify-center gap-1 w-full">
      {label && (
        <p
          className={classNames(
            "text-sm",
            { "font-semibold text-text-primary": labelBold },
            { "font-medium text-text-secondary": !labelBold }
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <div className="flex flex-row w-full group">
        {(onlyShow === "datetime" || onlyShow === "date") && (
          <ReactPopover
            placement={placement}
            transform={{ left: 100 }}
            noSizeFit
            zIndexToShow={1}
            stopAutoClose={true}
            hidePopover={hidePopover}
            content={
              <div className="md:divide-x md:divide-gray-200 p-5 bg-bg-secondary">
                <div>
                  <div className="flex items-center justify-center text-center">
                    <button
                      type="button"
                      className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-text-tertiary hover:text-text-tertiary_hover"
                    >
                      <span className="sr-only">Previous month</span>
                      <ChevronLeftIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={onPrevMonthClick}
                      />
                    </button>
                    <h2 className="flex-auto text-sm font-semibold text-text-primary">
                      {`${
                        months[currentDate.getMonth()]
                      } ${currentDate.getFullYear()}`}
                    </h2>
                    <button
                      type="button"
                      className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-text-tertiary hover:text-text-tertiary_hove"
                    >
                      <span className="sr-only">Next month</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={onNextMonthClick}
                      />
                    </button>
                  </div>
                  <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-text-tertiary">
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sat</div>
                    <div>Su</div>
                  </div>
                  <div className="mt-2 grid grid-cols-7 text-sm">
                    {dateArray.map((day, dayIdx) => (
                      <div
                        key={day.date}
                        className={clsNames(
                          dayIdx > 6 && "border-t border-border-secondary",
                          "py-2"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => onDateClick(day)}
                          className={clsNames(
                            day.isSelected && "text-white",
                            !day.isSelected && day.isToday && "text-indigo-600",
                            !day.isSelected &&
                              !day.isToday &&
                              day.isCurrentMonth &&
                              "text-text-primary",
                            !day.isSelected &&
                              !day.isToday &&
                              !day.isCurrentMonth &&
                              "text-text-tertiary",
                            day.isSelected && day.isToday && "bg-brand-700",
                            day.isSelected && !day.isToday && "bg-brand-700",
                            !day.isSelected && "hover:bg-gray-200",
                            (day.isSelected || day.isToday) && "font-semibold",
                            "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                          )}
                        >
                          <time dateTime={day.date}>
                            {day.date.split("-").pop()?.replace(/^0/, "")}
                          </time>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
            contentWidth={width?.dateWidth}
          >
            <div className="justify-end	flex" title={title}>
              <div
                className={dateInputClassname}
                style={{
                  width: onlyShow === "datetime" ? "100%" : width?.dateWidth,
                }}
              >
                <div className="flex items-center pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 8.33335H2.5M13.3333 1.66669V5.00002M6.66667 1.66669V5.00002M6.5 18.3334H13.5C14.9001 18.3334 15.6002 18.3334 16.135 18.0609C16.6054 17.8212 16.9878 17.4387 17.2275 16.9683C17.5 16.4336 17.5 15.7335 17.5 14.3334V7.33335C17.5 5.93322 17.5 5.23316 17.2275 4.69838C16.9878 4.22797 16.6054 3.84552 16.135 3.60584C15.6002 3.33335 14.9001 3.33335 13.5 3.33335H6.5C5.09987 3.33335 4.3998 3.33335 3.86502 3.60584C3.39462 3.84552 3.01217 4.22797 2.77248 4.69838C2.5 5.23316 2.5 5.93322 2.5 7.33335V14.3334C2.5 15.7335 2.5 16.4336 2.77248 16.9683C3.01217 17.4387 3.39462 17.8212 3.86502 18.0609C4.3998 18.3334 5.09987 18.3334 6.5 18.3334Z"
                      stroke="#57606A"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Select date"
                  className="border-none w-full block font-semibold text-text-secondary text-sm focus:ring-0 bg-transparent group-hover:bg-transparent p-0"
                  onClick={() => setHidePopover(false)}
                  value={
                    selectedDate
                      ? `${months[selectedDate.getMonth()].slice(
                          0,
                          3
                        )} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
                      : ""
                  }
                />
              </div>
            </div>
          </ReactPopover>
        )}
        {(onlyShow === "datetime" || onlyShow === "time") && (
          <input
            type="time"
            value={time}
            id="inputId"
            style={{ width: width?.timeWidth }}
            onChange={handleChange}
            className={timeInputClassname}
          />
        )}
      </div>
    </div>
  );
}


export default DatePicker;