import React from "react";
import  CalendarIcon  from "../../assets/icons/calIcon.svg";
import crossIcon from "../../assets/icons/close-sm.svg";
import downIcon from "../../assets/icons/newSideNav/chevronDown.svg"

type DateInputShowComponentProps = {
  id: string;
  placeholder: string;
  onClick: React.MouseEventHandler<HTMLElement> | undefined;
  ref: React.Ref<HTMLDivElement>;
  clearDate: () => void;
  setOpen: (open: boolean) => void;
};

const DateInputShowComponent: React.FC<DateInputShowComponentProps> = ({
  id,
  placeholder,
  onClick,
  ref,
  clearDate,
  setOpen,
}) => {
  const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    onClick && onClick(event);
  };
  return (
    <div className={`bg-bg-primary rounded-full flex items-center group cursor-pointer`}>
      <div className="bg-bg-primary rounded-l-full py-[8px] pl-2 group-hover:bg-bg-primary_hover " >
        <img src={CalendarIcon} alt="calendar" className="w-5 h-5"></img>
      </div>
      <input
      id={id}
      value={placeholder}
      onClick={(e) => {
        onClickHandler(e);
        setOpen(true);
      }}
      ref={ref as React.Ref<HTMLInputElement>}
      className={`focus:ring-0 border-none font-semibold bg-bg-primary text-sm  text-text-secondary cursor-pointer  group-hover:bg-bg-primary_hover`}
      style={{width: `200px`}}
      onChange={(e) => {
        console.log(e.target.value);
      }}
    />
    {placeholder!=="Date" ? (
      <div className="bg-bg-primary rounded-r-full py-3 pr-2 cursor-pointer group-hover:bg-bg-primary_hover" onClick={clearDate} >
        <img src={crossIcon} alt="calendar" className="w-3 h-3"></img>
      </div>
    ):
    (
      <div className="bg-bg-primary rounded-r-full py-2 pr-1 cursor-pointer group-hover:bg-bg-primary_hover" >
        <img src={downIcon} alt="calendar" className="w-5 h-5"></img>
      </div>
    )}
    </div>

    
  );

};

export default DateInputShowComponent;