import React from "react";
import IssueCard from "./IssueCard/IssueCard";
import { useDrop } from "react-dnd";
import {
  attachments,
  OnCardClickFunctionType,
  OnDropFunctionType,
} from "./DragAndDrop";
import { IIssueData } from "./interfaces";
import { Button, Loader } from "../index";


interface ISection {
  title: string;
  issues: any;
  setIssues: any;
  statusColor: string;
  onDrop: OnDropFunctionType;
  onCardClick: OnCardClickFunctionType;
  attachments?: attachments[];
  isLoading?: boolean;
  onButtonClick?: () => void;
}
const Section = (props: ISection) => {
  const {
    isLoading,
    title,
    issues,
    statusColor,
    onCardClick,
    onDrop,
    attachments,
    onButtonClick,
  } = props;

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "IssueCard",
    drop: (issue: any) => onDrop(issue, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop}
      className={`${
        !isOver ? "bg-bg-secondary" : "bg-bg-tertiary"
      } rounded-4xl pt-4 pb-10 px-4 w-[350px] min-w-[350px] relative flex items-start flex-col justify-start gap-4 flex-grow duration-300`}
    >
      <p className="text-xl font-semibold text-text-primary">
        {/* Show Title As is */}
        {title} 
        
      </p>
      {isLoading ? (
        <div className="w-full flex items-start justify-center h-full">
          <Loader size="sm" />
        </div>
      ) : (
        <>
          {issues.length === 0 && (
            <div className="flex items-center justify-center w-full">
              {onButtonClick ? (<Button color="secondary" shape="circle" variant="outlined" onClick={onButtonClick}>
              + Create Issue
                </Button>
              ) : (
                <p>
                  No {title} issues found
                </p>
              )}
            </div>
          )}
          {issues.map((issue: IIssueData) => {
            return (
              <IssueCard
                key={issue.id}
                issue={issue}
                status={title}
                statusColor={statusColor}
                onCardClick={onCardClick}
                attachments={attachments}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Section;
