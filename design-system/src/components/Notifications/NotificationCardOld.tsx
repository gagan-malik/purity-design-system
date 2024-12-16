import React from "react";
import notificationAvatar from "../../assets/icons/notificationAvatar.svg";
import unknown from "../../assets/icons/unassigned.svg";
import classNames from "classnames";
import { Avatar } from "../../index";
import { timeAgo } from "./utils";

export interface INotificationCard {
  user_id?: number;
  avatar: string | null;
  first_name?: string;
  last_name?: string;
  id?: number;
  description?: string | React.JSX.Element;
  assignee_id?: number | null;
  lane_id?: number;
  ticket_id?: number;
  issue_id?: number | null;
  created_at: string;
  archived?: number;
  archived_at?: string | null;
  text?: string;
  content?: string | React.JSX.Element;
  notification_read?:number|boolean| null;
}

interface IPropsNotificationCard {
  data: INotificationCard;
  separator?: boolean;
}

const NotificationCard: React.FC<IPropsNotificationCard> = ({ data, separator }) => {
  return (
    <div>
      <div className="flex items-center justify-between	">
    <div
      className={classNames(
        "flex items-center justify-start gap-3 py-4"
      )}
    >
      <div>
        <Avatar
          imageUrl={data.avatar}
          firstName={data.first_name ?? ""}
          lastName={data.last_name ?? ""}
        />
      </div>
      <div className="text-sm text-tert-600 font-normal flex flex-col items-start justify-center gap-1">
        <p className="flex items-center justify-start gap-2">
          <span className="text-secondary-700 font-medium">
            {data.first_name + " " + data.last_name}
          </span>
          <span>{timeAgo(new Date(data.created_at))}</span>
        </p>
        {data.description}
      </div>
    </div>
    {data.notification_read && <div className="pr-10">
          <div className="h-2.5 w-2.5 bg-error-600	rounded-lg"></div>
    </div>}
    </div>
    {data.content && <div className="pl-10 pr-20 pb-4">{data.content}</div>}
    </div>
  );
};

export default NotificationCard;
