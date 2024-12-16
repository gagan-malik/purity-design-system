import React,{useState} from "react";


interface IInfoContainerProps {
  icon?: string;
  title?: string | React.JSX.Element;
  subTitle?: string | React.JSX.Element;
  action?: string | React.JSX.Element;
  style?: React.CSSProperties | undefined;
  align?: string;
  isDisabled ?: Boolean;
  flag?:React.JSX.Element;
  box?:Boolean
  onClickHandler?: () => void;
  
}
const InfoContainer:React.FC<IInfoContainerProps> = ({
  icon,
  title,
  subTitle,
  action,
  style,
  align,
  isDisabled,
  flag,
  box,
  onClickHandler
}) => {
  const [showFlag, setShowFlag] = useState(false);

  const handleMouseEnter = () => {
    setShowFlag(true);
  };

  const handleMouseLeave = () => {
    setShowFlag(false);
  };
  
  let alignment = align == 'left'? "items-start" : (align == 'right' ?   "items-end" :  "items-center");
  let cursorStyle = isDisabled ? "cursor-not-allowed" : "cursor-pointer";
  cursorStyle = box ? cursorStyle :  "cursor-default";
  return (
    <div style={style}
    className={`flex p-4 flex-col ${box && "rounded-3xl bg-gray-100 dark:bg-slate-600"} ${cursorStyle} ${alignment}`}
      onClick={()=>{onClickHandler && !isDisabled && onClickHandler()}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      {showFlag && <div className="text-right flex flex-col items-end h-0 w-full relative">
          {flag}
        </div>}

      {icon && <div className="pb-3">
        <img className="h-7 w-7" src={icon} alt="" />
      </div>}
      <div className={`flex flex-col ${alignment}`}>
        <div className="text-xl font-semibold text-text-primary">{title}</div>
        <div className="text-sm font-normal text-tert-600">{subTitle}</div>
      </div>
      <div>{action}</div>
    </div>
  );
};

export default InfoContainer;
