import React from "react";
import Loader from "../Loader";
import Avatar from "../Avatar";
import { timeAgo } from "../Comments/utils";
import workspaceImage from "../../assets/icons/companyAvatar.svg";

export interface IHomeCardProps {
  title?: string | React.JSX.Element;
  subtitle?: string;
  userAvatar?: string | null;
  DateCreated?: string;
  coverImage?: string;
  timestamp: string;
  firstName?: string;
  lastName?: string;
  titleImage?: string | null | React.ReactNode;
  fullName?: string;
  optionsDiv?: React.ReactNode;
  onCardClick: () => void;
}

const HomeCard: React.FC<IHomeCardProps> = ({
  title,
  subtitle,
  userAvatar,
  DateCreated,
  coverImage,
  timestamp,
  firstName,
  lastName,
  titleImage,
  fullName,
  optionsDiv,
  onCardClick,
}) => {
  return (
    <div
      className={`bg-bg-secondary flex rounded-[24px] flex-col cursor-pointer border border-border-secondary overflow-hidden`}
      onClick={() => onCardClick()}
    >
      <div className="h-[100px] rounded-t-2xl w-full bg-utility-gray-200 ">
        {coverImage && (
          <img
            className="object-cover w-full rounded-t-2xl h-[100px]"
            src={coverImage}
            alt=""
          />
        )}
      </div>
      <div className="h-0 right-[-20px] relative	top-[-22px]">
        {typeof titleImage === "string" ? <Avatar imageUrl={titleImage} /> : titleImage }
      </div>
      <div className=" flex flex-col pl-6 pr-2 py-2.5 justify-around">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-text-secondary pt-4 line-clamp-1 pr-4">
            {title}
          </span>
          {subtitle && (
            <span className="text-bg-brand-solid text-sm font-semibold pt-1.5 pb-1">
              {subtitle}
            </span>
          )}
        </div>
        <div className="flex flex-row justify-between">
        <div className="flex items-center pt-2.5 pb-2">
          <Avatar imageUrl={userAvatar} fullName={fullName ?? ""} size="xs" />
          <span className="font-normal text-text-tertiary px-3 text-sm">
            {timeAgo(new Date(timestamp))}
          </span>
        </div>
        {optionsDiv && optionsDiv}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
