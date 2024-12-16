import React from "react";
import closeIcon from "../../../assets/icons/close.svg";
import refreshIcon from "../../../assets/icons/refresh.svg";
import HeaderIcon from "./DashboardHeaderIcon";

interface ICardHeaderProps {
  title: string;
  subTitle: string;
  onDeleteClick?: () => void;
  onRefreshClick?: () => void;
}

const CardHeader = (props: ICardHeaderProps) => {
  const { title, subTitle, onRefreshClick, onDeleteClick } = props;
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <div className="flex w-full items-center justify-between">
        <div className="text-xl font-semibold text-textDefault">{title}</div>
        <div className="flex gap-1 items-center justify-end">
          {!!onRefreshClick && (
            <HeaderIcon onClick={onRefreshClick} imgPath={refreshIcon} />
          )}
          {!!onDeleteClick && (
            <HeaderIcon onClick={onDeleteClick} imgPath={closeIcon} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center rounded-xs bg-neutral-40 px-1 text-center">
        <span className="text-xs font-bold text-neutral-500">{subTitle}</span>
      </div>
    </div>
  );
};

export default CardHeader;
