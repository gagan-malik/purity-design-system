import React, { useEffect, useState } from "react";
import Section from "./Section";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { IIssuesByLane } from "./interfaces";
import { filter, SearchAndFilter } from "../../index";

export type OnDropFunctionType = (issue: any, newStatus: any) => void;

export type OnCardClickFunctionType = (card: any) => void;

export type OnSearchFilterFunctionType = (val: any) => void;

type attachmnet = { mediaURL: string | null; media_name: string | null };

export type attachments = {
  id: number;
  attachments: attachmnet[];
};

type TFilters = {
  search: { isSearching: boolean; searchValue1?: string };
  filter: {
    isFiltering: boolean;
    filter1?: { id: string | number; name: string };
    filter2?: { id: string | number; name: string };
  };
};

interface IPropsDragAndDrop {
  isLoading?: boolean;
  data: IIssuesByLane[];
  attachments?: attachments[];
  onDrop: OnDropFunctionType;
  onCardClick: OnCardClickFunctionType;
  filterOptions?: filter[];
  onButtonClick?: (value: string) => void;
}

const statusColors = ["#FF2D55", "#FF9500", "#30B0C7", "green"];

const DragAndDrop = (props: IPropsDragAndDrop) => {
  const {
    data,
    attachments: ticketAttachments,
    onCardClick,
    onDrop,
    filterOptions,
    isLoading = false,
    onButtonClick,
  } = props;

  const [issues, setIssues] = useState(data);
  const [filteredIssues, setFilteredIssues] = useState(data);
  const [filters, setFilters] = useState<TFilters | null>(null);

  useEffect(() => {
    setIssues(data);
    setFilteredIssues(data);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    const temp: IIssuesByLane[] = JSON.parse(JSON.stringify([...issues]));
    if (!filters) {
      return;
    }

    if (Object.keys(filters.search).length) {
      temp.forEach((issue) => {
        issue.items = issue.items.filter((item) =>
          item.text.toLowerCase().includes(filters.search.searchValue1)
        );
      });
    }

    if (Object.keys(filters.filter).length) {
      if (filters.filter.filter2) {
        temp.forEach((issue) => {
          if (filters.filter.filter2?.name?.trim().toLowerCase() === "all") {
            return;
          }
          issue.items =
            issue.name.trim().toLowerCase() ===
            filters.filter.filter2?.name?.trim().toLowerCase()
              ? issue.items
              : [];
        });
      }
      if (filters.filter.filter1) {
        temp.forEach((issue) => {
          if (filters.filter.filter1?.name?.trim().toLowerCase() === "all") {
            return;
          }
          issue.items = issue.items.filter(
            (el) =>
              el?.issue_type?.toLowerCase() ===
              filters.filter.filter1?.name.toLowerCase()
          );
        });
      }
    }
    setFilteredIssues(temp);
  }, [JSON.stringify(filters)]);

  const handleSearchFilter = (filters: any) => {
    setFilters(filters);
  };

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
        {filterOptions && !isLoading && (
          <SearchAndFilter
            filterOptions={filterOptions}
            onSearchFilter={handleSearchFilter}
          />
        )}
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-row gap-2 overflow-x-auto">
            {filteredIssues.map((issue, index) => {
              return (
                <Section
                  isLoading={isLoading}
                  key={issue.name}
                  title={issue.name}
                  issues={issue.items}
                  setIssues={setIssues}
                  onDrop={onDrop}
                  statusColor={statusColors[index]}
                  onCardClick={onCardClick}
                  attachments={ticketAttachments}
                  onButtonClick={onButtonClick}
                />
              );
            })}
          </div>
        </DndProvider>
      </div>
    </>
  );
};

export default DragAndDrop;
