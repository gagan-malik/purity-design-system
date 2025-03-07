import React, { useState } from 'react';
import { ButtonV2 } from '../ButtonV2/ButtonV2';
import Avatar from '../Avatar/Avatar';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  users?: Array<{
    id: string;
    imageUrl?: string;
    name: string;
  }>;
}

interface CalendarProps {
  events?: CalendarEvent[];
  view?: 'month' | 'week';
  onViewChange?: (view: 'month' | 'week') => void;
  onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  view = 'month',
  onViewChange,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week'>(view);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const handleViewChange = (newView: 'month' | 'week') => {
    setSelectedView(newView);
    onViewChange?.(newView);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderHeader = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-2">
          <ButtonV2
            hierarchy="secondary"
            size="sm"
            onClick={() => handleViewChange('month')}
            className={selectedView === 'month' ? 'bg-blue-100' : ''}
          >
            Month
          </ButtonV2>
          <ButtonV2
            hierarchy="secondary"
            size="sm"
            onClick={() => handleViewChange('week')}
            className={selectedView === 'week' ? 'bg-blue-100' : ''}
          >
            Week
          </ButtonV2>
        </div>
        <div className="flex items-center gap-4">
          <ButtonV2 hierarchy="secondary" size="sm" onClick={handlePrevMonth}>
            Previous
          </ButtonV2>
          <span className="text-lg font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <ButtonV2 hierarchy="secondary" size="sm" onClick={handleNextMonth}>
            Next
          </ButtonV2>
        </div>
      </div>
    );
  };

  const renderDayCell = (date: Date | null, events: CalendarEvent[] = []) => {
    if (!date) return <div className="h-32 bg-gray-50"></div>;

    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    
    const dayEvents = events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );

    return (
      <div 
        className={`h-32 border border-gray-200 p-2 hover:bg-gray-50 cursor-pointer ${
          !isCurrentMonth ? 'opacity-50' : ''
        }`}
        onClick={() => onDateSelect?.(date)}
      >
        <div className={`font-medium text-sm mb-1 ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
          {date.getDate()}
        </div>
        <div className="space-y-1">
          {dayEvents.map(event => (
            <div key={event.id} className="flex items-center gap-1">
              {event.users?.slice(0, 3).map(user => (
                <Avatar
                  key={user.id}
                  size="xs"
                  imageUrl={user.imageUrl}
                  firstName={user.name.split(' ')[0]}
                  lastName={user.name.split(' ')[1]}
                />
              ))}
              {event.users && event.users.length > 3 && (
                <span className="text-xs text-gray-500">+{event.users.length - 3}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
    const days = [];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Get last month's days that should appear in current view
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      const date = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), lastMonthDays - i);
      days.push(date);
    }

    // Add cells for each day of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Add days from next month to fill the remaining cells
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42 total cells
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
      days.push(date);
    }

    return (
      <div className="bg-bg-primary rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map(day => (
            <div key={day} className="bg-bg-primary p-2 text-md font-medium text-center text-text-tertiary border border-border-primary">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((date, index) => (
            <div key={index} className="bg-bg-primary">
              {renderDayCell(date, events)}
            </div>
          ))}
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
      <div className="bg-bg-primary rounded-lg shadow">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map(date => (
            <div key={date.toString()} className="bg-bg-primary p-2 text-sm font-medium text-center">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
              <div className="text-xs text-gray-500">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map(date => (
            <div key={date.toString()} className="bg-bg-primary">
              {renderDayCell(date, events)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {renderHeader()}
      {selectedView === 'month' ? renderMonthView() : renderWeekView()}
    </div>
  );
};

export default Calendar; 