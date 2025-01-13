import React from "react";
import { useDrag } from "react-dnd";
import unassigned from "../../../assets/icons/unassigned.svg";
import { IIssueData } from "../interfaces";
import { attachments, OnCardClickFunctionType } from "../DragAndDrop";
import { ToolTip } from "../../ToolTip";
import { Badge,Avatar } from "../../..";

interface IPropIsssueCard {
  issue: IIssueData;
  status: string;
  statusColor: string;
  onCardClick: OnCardClickFunctionType;
  attachments?: attachments[];
}

const IssueCard = (props: IPropIsssueCard) => {
  const {
    issue,
    status,
    statusColor,
    onCardClick,
    attachments: ticketAttachments = [],
  } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "IssueCard",
    item: { issue, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getAttachmentUrl = (id: number) => {
    if (ticketAttachments?.length) {
      return ticketAttachments.filter((el) => el.id === id)[0]?.attachments[0]
        ?.mediaURL;
    }
  };

  const grabbingStyle = !isDragging
    ? "opacity-100 cursor-grab transform scale-105"
    : "opacity-50 cursor-grabbing";

  return (
    <>
      <div
        ref={drag}
        onClick={() => onCardClick(issue)}
        className={`p-4 w-full ${grabbingStyle} flex flex-col items-start justify-center gap-2 rounded-4xl bg-bg-primary`}
      >
        {issue?.attachmentURL ? (
          <div className="w-full overflow-hidden flex items-center justify-start">
            <img
              style={{ width: "100%" }}
              src={issue.attachmentURL}
              alt=""
              className="rounded-4xl"
            />
          </div>
        ) : null}

        <p className="text-base font-medium text-text-primary line-clamp-2 pr-16">
          {issue.text}{" "}
        </p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center gap-2">
          {issue.issue_type && (
            <Avatar imageUrl={issue.issue_type_icon} fullName={issue.issue_type} border = "none" size="sm"/>
          )}
          <p className={`text-xs font-semibold text-text-tertiary ${issue?.is_archived ? "line-through" : ""}`}>
            {issue.ticket_number}
          </p>
          </div>
          <div className="flex items-center justify-center gap-2">
          {issue.priority && <Avatar imageUrl={issue.priority_icon} fullName={issue.priority} border = "none" size="sm"/>}
          {issue?.assignee?.fullname && <Avatar imageUrl={issue.assignee.avatar} fullName={issue.assignee.fullname} border = "none" size="sm" showTooltip={true} tooltipText={issue.assignee.fullname} tooltipAlign="left"/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default IssueCard;
