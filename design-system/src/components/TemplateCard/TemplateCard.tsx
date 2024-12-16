import React from "react";
import Loader from "../Loader";
import Avatar from "../Avatar";
import { timeAgo } from "../Comments/utils";
import workspaceImage from "../../assets/icons/companyAvatar.svg";

interface ITemplateCardProps {
  title?: string;
  subtitle?: string;
  userAvatar?: string | null;
  coverImage?: string;
  firstName?: string;
  lastName?: string;
  flag?: React.JSX.Element;
  onCardClick: () => void;
  isDisabled: boolean;
}

const TemplateCard: React.FC<ITemplateCardProps> = ({
  title,
  subtitle,
  userAvatar,
  coverImage,
  firstName,
  lastName,
  onCardClick,
  flag,
  isDisabled,
}) => {
  let cursorStyle = isDisabled ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <div
      className={`bg-gray-100 flex h-[232px] rounded-2xl dark:bg-slate-600 flex-col shadow-boxShadowBlack ${cursorStyle}`}
      onClick={() => !isDisabled && onCardClick()}
    >
      <div className="h-[100px] rounded-t-2xl w-full bg-gray-200 ">
        {coverImage && (
          <img
            className="object-cover w-full rounded-t-2xl h-[100px]"
            src={coverImage}
            alt=""
          />
        )}
      </div>
      <div className="h-[132px] flex flex-col px-6 py-2 justify-around">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-secondary-700">
            {title}
          </span>
          <span className="text-tert-600 text-sm font-regular py-0.5">
            {subtitle}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Avatar
              imageUrl={userAvatar}
              firstName={firstName ?? ""}
              lastName={lastName ?? ""}
            />
            <span className="font-medium text-tert-600 px-3 text-xs">
              {firstName} {lastName}
            </span>
          </div>
          <div className="flex items-center">{flag}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
