import React from "react";
import NotificationCard, { INotificationCard } from "./NotificationCard";

interface IPropsNotification {
  data: INotificationCard[];
  theme ?: String
}

const Notifications: React.FC<IPropsNotification> = ({ data ,theme}) => {
  return (
    <>
      <div className={`${theme}`}>
        {data.map((d, ind) => (
          <NotificationCard
            data={d}
          />
        ))}
      </div>
    </>
  );
};

export default Notifications;
