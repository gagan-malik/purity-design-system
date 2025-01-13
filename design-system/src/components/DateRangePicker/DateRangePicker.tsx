import React, { useState } from "react";
import  CalendarIcon  from "../../assets/icons/calIcon.svg";
import "./DateRangePicker.css"; // Your custom CSS
import Datepicker from "react-tailwindcss-datepicker";


const DateRangePicker: React.FC = () => {

  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null
});

return (
    <div className="w-[310px] bg-bg-primary rounded-full flex items-center *hover:bg-bg-primary_hover ">
      <div className="bg-bg-primary rounded-l-full py-[10px] pl-2" >
        <img src={CalendarIcon} alt="calendar" className="w-5 h-5"></img>
      </div>
      <Datepicker 
        value={value} 
        onChange={(newValue: any) => setValue(newValue)}
        showShortcuts={true}
        inputClassName=" w-[260px] focus:ring-0 border-none font-semibold bg-bg-primary text-text-secondary rounded-r-full"
        toggleClassName="opacity-0 w-0"
        showFooter={true}
        configs={{
          shortcuts: {
              today: "Today",
              yesterday: "Yesterday",
              past: period => "Last " + period + " Days",
              currentMonth: "Current Month",
              pastMonth: "Past Month"
          },
          footer: {
              cancel: "Cancel",
              apply: "Apply"
          }
      }}
      /> 
    </div>
    
);
};

export default DateRangePicker
