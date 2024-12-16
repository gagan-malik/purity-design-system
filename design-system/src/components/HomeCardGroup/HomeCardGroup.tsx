import React from "react";
import Loader from "../Loader";
import Avatar from "../Avatar";
import { timeAgo } from "../Comments/utils";
import workspaceImage from "../../assets/icons/companyAvatar.svg";
import { IHomeCardProps } from "../HomeCard/HomeCard";
import HomeCard from "../HomeCard/HomeCard";
import DotsDrag from "../../assets/icons/dots-drag.svg";

interface IHomeCardGroupProps {
  heading?: string;
  isDraggable?: boolean;
  data?: IHomeCardProps[];
}

const HomeCardGroup: React.FC<IHomeCardGroupProps> = ({
  heading,
  isDraggable,
  data,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4 min-w-[720px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-text-primary font-inter text-lg font-semibold leading-7 tracking-[0.18px]">
            {heading}
          </h1>
          {/* {isDraggable && <img className="h-[20px] cursor-pointer" src={DotsDrag} alt="dots-drag" />} */}
        </div>
        <div className="grid grid-cols-3 gap-4 w-full">
          {data?.map((item, index) => (
            <div key={index} className="w-full">
              <HomeCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeCardGroup;
