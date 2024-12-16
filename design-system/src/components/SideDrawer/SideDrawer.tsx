import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import {Button} from "../Button/Button";


interface ISideDrawerProps {
  heading?: string | React.JSX.Element;
  children?: React.JSX.Element;
  showCloseIcon?: boolean;
  onCloseClick : () => void;
}
const SideDrawer:React.FC<ISideDrawerProps> = ({heading, children, showCloseIcon, onCloseClick}) => {

  return (
    <div className="flex flex-col h-full p-4 w-[384px] border-l" >
      <div className="flex justify-between items-center">
      {heading && <div className="text-xl font-semibold text-text-primary">{heading}</div>}
      {showCloseIcon && 
      <Button
      variant="outlined"
      color="label"
      shape="circle"
      size="mini"
      imgSrc = {closeIcon}
      onClick={onCloseClick} 
    >
    </Button> } 

      </div>
      {children}
    </div>
  );
};

export default SideDrawer;
