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
        {ticketAttachments.length > 0 && (
          <div className="w-full overflow-hidden flex items-center justify-start">
            <img
              style={{ width: "100%" }}
              src={getAttachmentUrl(issue.id) ?? ""}
              alt=""
            />
          </div>
        )}

        <p className="text-md font-semibold text-text-primary line-clamp-2 pr-16">
          {issue.text}{" "}
        </p>
        <section className="flex items-center justify-between w-full py-3 uppercase">
          {issue.issue_type && (
            <Avatar imageUrl={issue.issue_type_icon} fullName={issue.issue_type} border = "none" />
          )}
          {issue.priority && <Badge color="important">{issue.priority}</Badge>}
        </section>
        <section className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold text-text-brand-secondary cursor-pointer pl-1">
            {issue.ticket_number}
          </p>
          {
            <ToolTip
              text={
                issue.assignee?.fullname
                  ? "Assigned to: " +
                    issue.assignee.fullname
                  : "unassigned"
              }
            >
              <img
                className="flex items-center justify-center rounded-full"
                style={{ width: "24px", height: "24px" }}
                src={issue.assignee?.avatar ?? unassigned}
                alt=""
              />
            </ToolTip>
          }
        </section>
      </div>
    </>
  );
};

export default IssueCard;
