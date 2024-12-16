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
  description?: string | React.ReactNode;
  assignee_id?: number | null;
  lane_id?: number;
  ticket_id?: number;
  issue_id?: number | null;
  created_at: string;
  archived?: number;
  archived_at?: string | null;
  text?: string;
}

interface IPropsNotificationCard {
  data: INotificationCard;
  separator?: boolean;
}

const CommentCard: React.FC<IPropsNotificationCard> = ({ data, separator }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-start gap-3 py-4",
        separator && " border-y border-solid border-gray-200 "
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
        <p>
          {data.description ? data.description : data.text ? data.text : ""}{" "}
          <span className="text-secondary-700 font-medium">
            {data.lane_id ? data.lane_id : data.issue_id ? data.issue_id : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
