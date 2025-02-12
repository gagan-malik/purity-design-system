import React from "react";
import {timeAgo} from "../Comments/utils"
import {Table} from "../Table/Table"
import { Avatar } from "../../index";

export interface IFileProps {
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
}
export interface IFileUserProps {
  avatar?: string | null;
  fullname?: string;
}


const File: React.FC<IFileProps> = ({
  id,
  icon,
  title,
  description,
  timestamp,
  user,
  onClickHandler,
  optionsDiv,
}) => {
  return (
    <>
      <div
              key={id}
              className="bg-bg-primary hover:bg-bg-primary_hover border-border-secondary border w-full p-4 cursor-pointer min-w-[250px] min-h-[84px] rounded-3xl shadow-boxShadowBlack flex flex-col justify-between"
              onClick={()=>{onClickHandler && onClickHandler()}}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2 justify-center items-center">
                  {typeof icon === "string" ? <img className="h-[20px]" src={icon} alt="" /> : icon}
                  {title}
                </div>
                {optionsDiv && optionsDiv}
              </div>
              <div className="flex justify-between">
                <div>{description}</div>
                <div className="text-sm font-normal text-text-tertiary pr-5">{timeAgo(new Date(timestamp ?? ""))}</div>
              </div>
            </div>
    </>
  );
};

export default File;
