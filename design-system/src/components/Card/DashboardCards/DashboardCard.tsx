import React from "react";
import CardHeader from "../common/CardHeader";
import NewCardHeader from "../common/NewCardHeader";

export interface ICardProps {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  onDeleteClick?: () => void;
  onRefreshClick?: () => void;
  gap?: "sm" | "md" | "lg";
  trendData?: {
    data: string | number;
    percentageChange: number;
    trendDescription: string;
  };
}

const DashboardCard = (props: ICardProps) => {
  const {
    title,
    subTitle,
    onDeleteClick,
    onRefreshClick,
    children,
    gap = "md",
    trendData,
  } = props;

  const gapClass = {
    sm: "gap-5",
    md: "gap-6",
    lg: "gap-7",
  };

  return (
    <div
      className={`border border-border-secondary bg-bg-primary flex flex-col items-start justify-between rounded-2xl ${gapClass[gap]} p-6 shadow-xs`}
    >
      {/* <CardHeader
        title={title}
        subTitle={subTitle}
        onDeleteClick={onDeleteClick}
        onRefreshClick={onRefreshClick}
      /> */}
      <NewCardHeader trendData={trendData} title={title} />
      {children}
    </div>
  );
};

export default DashboardCard;
