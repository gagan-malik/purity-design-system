import React from "react";
import CommentCard, { INotificationCard } from "./CommentCard";

interface IPropsNotification {
  data: INotificationCard[];
  theme : String;
}
const Comments: React.FC<IPropsNotification> = ({ data,theme }) => {
  return (
    <>
      <div>
        {data.map((d, ind) => (
          <CommentCard
            data={d}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
