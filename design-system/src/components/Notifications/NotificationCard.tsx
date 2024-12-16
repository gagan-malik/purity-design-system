import React from "react";
import notificationAvatar from "../../assets/icons/notificationAvatar.svg";
import unknown from "../../assets/icons/unassigned.svg";
import classNames from "classnames";
import { Avatar } from "../../index";
import { timeAgo } from "./utils";

export interface INotificationCard {
  variant?: "v1" | "v2";
  notificationId: string;
  notificationTitle: string | React.JSX.Element;
  notificationDescription?: string | React.JSX.Element;
  notificationRead?: number | boolean | null;
  notificationIcon?: string | null | React.JSX.Element;
  createdAt: string;
  content?: string | React.JSX.Element;
  onClickHandler?: () => void;
}

interface IPropsNotificationCard {
  data: INotificationCard;
}

const NotificationCard: React.FC<IPropsNotificationCard> = ({ data }) => {
  return (
    <div className={`rounded-3xl	p-4	hover:bg-bg-primary_hover ${data.onClickHandler ?  'cursor-pointer' : '' }`}>
      <div className= {`flex items-center justify-between `} onClick={data.onClickHandler}>
        <div
          className={classNames("flex justify-start gap-3")}
        >
          <div>
            {data.notificationIcon}
          </div>
          <div className="text-sm text-tert-600 font-normal flex flex-col items-start">
            <div className="flex">
              <span className="flex justify-start gap-2 font-semibold text-sm">{data.notificationTitle}</span>
              <span className="flex items-center font-normal text-text-tertiary px-3 text-xs">
              {timeAgo(new Date(data.createdAt))}
          </span>
            </div>
            {data.notificationDescription}
          </div>
        </div>
        {!data.notificationRead && (
          <div className="pr-2">
            <div className="h-2.5 w-2.5 bg-error-600	rounded-lg"></div>
          </div>
        )}
      </div>
      {data.content && <div className="pl-10 pr-20 py-2">{data.content}</div>}
    </div>
  );
};

export default NotificationCard;
