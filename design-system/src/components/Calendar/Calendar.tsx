import React, { useState, useEffect } from "react";
import { ButtonV2 } from "../ButtonV2/ButtonV2";
import { Icons } from "../Icons/Icons";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
interface CalendarEvent {
  id: string;
  title: string; // This will be the action name
  date: Date;
  avatar?: React.ReactNode; // Single avatar URL instead of users array
  time?: string;
  onClick?: () => void;
}

interface CalendarProps {
  events?: CalendarEvent[];
  view?: "month" | "week";
  onViewChange?: (view: "month" | "week") => void;
  onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  view = "month",
  onViewChange,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<"month" | "week">(view);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showMoreDate, setShowMoreDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const handleViewChange = (newView: "month" | "week") => {
    setSelectedView(newView);
    onViewChange?.(newView);
  };

  const handlePrevious = () => {
    if (selectedView === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      );
    } else {
      // Week view - go back 7 days
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (selectedView === "month") {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      );
    } else {
      // Week view - go forward 7 days
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the day click
    e.preventDefault(); // Prevent any default behavior
    console.log("Event clicked:", event.title); // Add debug logging

    if (event.onClick) {
      event.onClick();
    }
  };

  const handleShowMore = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the day click
    setShowMoreDate(date);
  };

  const closeShowMore = () => {
    setShowMoreDate(null);
  };

  const renderEventItem = (event: CalendarEvent, isInPopup = false) => {
    return (
      <div
        key={event.id}
        className={`flex items-center gap-2 ${
          isInPopup
            ? "p-2 rounded-full hover:bg-bg-secondary_hover"
            : "mb-1 p-1 rounded-full bg-bg-secondary"
        } cursor-pointer`}
        onClick={(e) => handleEventClick(event, e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleEventClick(event, e as unknown as React.MouseEvent);
          }
        }}
      >
        {event.avatar}
        <div className="flex-auto truncate font-medium text-text-tertiary text-xs">
          {event.title}
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    const monthNames = [
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

    // Format the header title based on the view
    let headerTitle;
    if (selectedView === "month") {
      headerTitle = `${
        monthNames[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`;
    } else {
      // For week view, show the week range
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      // Format: "Jan 1 - Jan 7, 2023" or "Jan 30 - Feb 5, 2023"
      const startMonth = monthNames[weekStart.getMonth()].substring(0, 3);
      const endMonth = monthNames[weekEnd.getMonth()].substring(0, 3);
      const startDay = weekStart.getDate();
      const endDay = weekEnd.getDate();
      const year = weekEnd.getFullYear();

      headerTitle =
        startMonth === endMonth
          ? `${startMonth} ${startDay} - ${endDay}, ${year}`
          : `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }

    return (
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="relative flex items-center  md:items-stretch gap-2">
            <ButtonV2
              hierarchy="secondary"
              size="sm"
              shape="rounded"
              onClick={handlePrevious}
              iconOnly
              iconLeadingSrc={
                <Icons
                  name="chevron-left"
                  size="sm"
                  color="text-text-secondary"
                />
              }
            />
            <ButtonV2
              hierarchy="secondary"
              size="sm"
              shape="rounded"
              children="Today"
              onClick={handleTodayClick}
            />
            <ButtonV2
              hierarchy="secondary"
              size="sm"
              shape="rounded"
              onClick={handleNext}
              iconOnly
              iconLeadingSrc={
                <Icons
                  name="chevron-right"
                  size="sm"
                  color="text-text-secondary"
                />
              }
            />
          </div>
          <h1 className="text-lg font-semibold text-text-secondary">
            <time
              dateTime={`${currentDate.getFullYear()}-${
                currentDate.getMonth() + 1
              }`}
            >
              {headerTitle}
            </time>
          </h1>
        </div>
        <div className="flex items-center">
          <Dropdown
            dropdownPlaceholder={
              <div className="flex items-center justify-between bg-bg-primary hover:bg-bg-secondary_hover px-4 py-2 rounded-full border border-border-secondary">
                <span className="text-text-secondary text-base font-medium">
                  {selectedView === "month" ? "Month" : "Week"}
                </span>
                <Icons
                  name="chevron-down"
                  size="sm"
                  color="text-text-secondary"
                />
              </div>
            }
            selectWidth="full"
            data={[
              {
                id: "month",
                render: () => (
                  <div
                    className="flex items-center w-full text-text-secondary font-medium px-4 py-2 text-left text-base cursor-pointer"
                    onClick={() => handleViewChange("month")}
                  >
                    <span>Month</span>
                  </div>
                ),
              },
              {
                id: "week",
                render: () => (
                  <div
                    className="flex items-center w-full text-text-secondary font-medium px-4 py-2 text-left text-base cursor-pointer"
                    onClick={() => handleViewChange("week")}
                  >
                    <span>Week</span>
                  </div>
                ),
              },
            ]}
            type="check"
            variant="ghost"
            customDropdownClass="absolute min-w-[170px] z-10 mt-2 max-h-56 w-full origin-top-right bg-bg-primary border-2 border-border-secondary rounded-3xl overflow-y-auto right-0"
          />
        </div>
      </header>
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDay) return false;
    return (
      date.getDate() === selectedDay.getDate() &&
      date.getMonth() === selectedDay.getMonth() &&
      date.getFullYear() === selectedDay.getFullYear()
    );
  };

  const renderDayCell = (
    date: Date | null,
    dayEvents: CalendarEvent[] = []
  ) => {
    if (!date) return <div className="h-32 bg-bg-secondary"></div>;

    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const today = isToday(date);
    const selected = isSelected(date);

    const handleDayClick = () => {
      setSelectedDay(date);
      onDateSelect?.(date);
    };

    // Show all events in week view, but limit to 2 in month view
    const eventsToShow = selectedView === 'week' ? dayEvents : dayEvents.slice(0, 2);
    const hasMoreEvents = selectedView === 'month' && dayEvents.length > 2;

    return (
      <div
        className={classNames(
          isCurrentMonth
            ? "bg-bg-primary hover:bg-bg-primary_hover"
            : selectedView === "week" ? "bg-bg-primary hover:bg-bg-primary_hover" : "bg-bg-primary_alt text-text-secondary",
          selectedView === "week" ? "h-full" : "h-32",
          "relative px-3 py-2"
        )}
        // onClick={handleDayClick}
      >
        <time
          dateTime={date.toISOString().split("T")[0]}
          className={classNames(
            today
              ? "flex size-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
              : "",
            selected && !today
              ? "flex size-6 items-center justify-center rounded-full bg-gray-900 font-semibold text-white"
              : "",
            !today && !selected ? "font-medium text-sm" : "",
            !isCurrentMonth ? "text-gray-400" : ""
          )}
        >
          {date.getDate()}
        </time>

        <div className="mt-2 space-y-1">
          {eventsToShow.map((event) => renderEventItem(event))}

          {hasMoreEvents && (
            <button
              className="text-xs text-text-tertiary hover:text-text-secondary font-medium flex items-center"
              onClick={(e) => handleShowMore(date, e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Show more
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Get last month's days that should appear in current view
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const lastMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth(),
        lastMonthDays - i
      );
      days.push(date);
    }

    // Add cells for each day of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Add days from next month to fill the remaining cells
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42 total cells
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push(date);
    }

    return (
      <div className="flex flex-auto flex-col rounded-lg overflow-auto border border-border-secondary">
        <div className="grid grid-cols-7 gap-px border-b border-border-secondary bg-border-secondary text-center text-md font-semibold text-text-tertiary">
          {weekDays.map((day) => (
            <div key={day} className="bg-bg-secondary py-2">
              {day.charAt(0)}
              <span className="sr-only sm:not-sr-only">{day.substring(1)}</span>
            </div>
          ))}
        </div>
        <div className="flex bg-border-secondary text-xs text-text-secondary flex-auto">
          <div className="grid grid-cols-7 grid-rows-6 gap-px w-full">
            {days.map((date, index) => {
              const dayEvents = events.filter((event) =>
                isSameDay(event.date, date)
              );

              return (
                <div key={index} className="bg-bg-primary">
                  {renderDayCell(date, dayEvents)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push(date);
    }

    return (
      <div className="flex flex-auto flex-col rounded-lg overflow-auto border border-border-secondary">

      <div className="bg-bg-primary rounded-lg shadow overflow-auto h-full">
        <div className="grid grid-cols-7 gap-px border-b border-border-secondary bg-border-secondary text-center text-md font-semibold text-text-tertiary">
          {days.map((date) => (
            <div
              key={date.toString()}
              className="bg-bg-secondary p-1 text-sm font-medium text-center"
            >
              {date.toLocaleDateString("en-US", { weekday: "short" })}
              <div className="text-xs text-gray-500">
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-border-secondary text-text-secondary h-full">
          {days.map((date) => {
            const dayEvents = events.filter((event) =>
              isSameDay(event.date, date)
            );

            return (
              <div key={date.toString()} className="bg-bg-primary">
                {renderDayCell(date, dayEvents)}
              </div>
            );
          })}
        </div>
      </div>
      </div>
    );
  };

  // Render the "Show More" popup
  const renderShowMorePopup = () => {
    if (!showMoreDate) return null;

    const popupEvents = events.filter((event) =>
      isSameDay(event.date, showMoreDate)
    );

    const formattedDate = showMoreDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Modal
        onClose={closeShowMore}
        widthVariant="default"
        headerTitle={formattedDate}
        header={""}
        footer={<></>}
      >
        <div className="px-4 py-3 w-full rounded-full">
          {popupEvents.length === 0 ? (
            <p className="text-text-tertiary text-center py-4">
              No events for this day
            </p>
          ) : (
            <div className="">
              {popupEvents.map((event) => renderEventItem(event, true))}
            </div>
          )}
        </div>
      </Modal>
    );
  };

  // Helper function to properly compare dates
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Debug function to check if events are being filtered correctly
  useEffect(() => {
    console.log("Current date:", currentDate);
    console.log("Total events:", events.length);

    // Check how many events match the current month
    const currentMonthEvents = events.filter(
      (event) =>
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
    console.log("Events in current month:", currentMonthEvents.length);

    // Check if today has any events
    const today = new Date();
    const todayEvents = events.filter((event) => isSameDay(event.date, today));
    console.log("Events today:", todayEvents.length);
  }, [events, currentDate]);

  return (
    <div className="w-full lg:flex lg:h-full lg:flex-col rounded-lg overflow-hidden p-4">
      {renderHeader()}
      {selectedView === "month" ? renderMonthView() : renderWeekView()}
      {renderShowMorePopup()}
    </div>
  );
};

export default Calendar;
