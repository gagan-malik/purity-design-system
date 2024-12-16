import React from "react";
import {timeAgo} from "../Comments/utils"
import {Table} from "../Table/Table"
import { Avatar } from "../../index";
import { Button } from "../Button/Button";

export interface IMarketplaceCardProps {
id?: string;
  icon?: string | React.JSX.Element;
  title: string | React.JSX.Element;
  description?: string | React.JSX.Element;
  timestamp: string;
  user?: IFileUserProps;
  onClickHandler?: () => void;
  optionsDiv?:  React.JSX.Element;
  coverImage?: string;
  titleImage?: string | React.JSX.Element;
  isDisabled?: boolean;
  button?: string | React.JSX.Element;
  onClickButton?: () => void;
}
export interface IFileUserProps {
  avatar?: string | null;
  fullname?: string;
}


const MarketplaceCard: React.FC<IMarketplaceCardProps> = ({
  id,
  icon,
  title,
  description,
  timestamp,
  user,
  onClickHandler,
  optionsDiv,
  button,
  onClickButton,
  isDisabled
}) => {
  return (
    <>
      <div
              key={id}
              className={`bg-bg-secondary hover:bg-bg-secondary_hover border-border-secondary border w-full p-4 min-w-[250px] min-h-[84px] rounded-3xl shadow-boxShadowBlack flex flex-col justify-between gap-1 ${onClickHandler ? "cursor-pointer" : (isDisabled ? "cursor-not-allowed" : "cursor-default")}`}
              onClick={()=>{onClickHandler && onClickHandler()}}
            >
              <div className="flex justify-between">
                <div className="flex gap-2 justify-center items-center">
                  {typeof icon === "string" ? <img className="h-[20px]" src={icon} alt="" /> : icon}
                  <div className="flex flex-col gap-1">
                  <span className="text-base font-bold text-text-secondary">{title}</span>
                  {description && <span className="text-base font-regular text-text-tertiary">{description}</span>}
                  </div>
                </div>
                {optionsDiv && optionsDiv}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-normal text-text-tertiary flex gap-2 items-center"> {user?.avatar && <Avatar size="sm" imageUrl={user?.avatar} />} {user?.fullname}</div>
                {typeof button === "string" ?  <Button size="sm" color="primary" shape="circle"><div className="px-3" onClick={()=>{onClickButton && onClickButton()}}>{button}</div></Button> : button}
              </div>
            </div>
    </>
  );
};

export default MarketplaceCard;
