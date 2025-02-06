import React from "react";
import {timeAgo} from "../Comments/utils"
import {Table} from "../Table/Table"
import { Avatar } from "../../index";
import File from "./File";
import { IFileProps } from "./File";
import { IMarketplaceCardProps } from "./MarketplaceCard";
import HomeCard from "../HomeCard/HomeCard";
import MarketplaceCard from "./MarketplaceCard";
export interface IFileManagerProps {
  grid?: Number;
  heading?: string | React.JSX.Element;
  view?: "list" | "gallery";
  data: IFileProps[] | IMarketplaceCardProps[];
  varient: "default" | "large" | "small";
  fileType?: "folder" | "document" | "marketplace";
  showAction?: boolean;
}

export interface IFileUserProps {
  avatar?: string | null;
  fullname?: string;
}

const columns = [
  {
    key: "name",
    title: "Name",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-primary",
  },
  {
    key: "owner",
    title: "Owner",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-tertiary",
  },
  {
    key: "last_modified",
    title: "Last Modified",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-tertiary",
  },
  {
    key: "action",
    title: "Action",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-tertiary",
  },
]

const formatDataForTable = (data: IFileProps[]) => {
  return data.map((item) => ({
    name: <div className="flex items-center gap-2">{item.icon}{item.title}</div>,
    owner: item.user?.fullname && <div className="flex items-center gap-2"><Avatar size="xs" imageUrl={item.user?.avatar} fullName={item.user?.fullname} /><span className="text-text-primary">{item.user?.fullname}</span> </div>,
    last_modified: timeAgo(new Date(item.timestamp ?? "")),
    action: item.optionsDiv,
  }));
};

const formatDataForDocument = (item: IFileProps) => {
  let obj = {    
    title: item.title,
    userAvatar : item.user?.avatar,
    timestamp:item.timestamp,
    fullName:item.user?.fullname,
    coverImage : item?.coverImage,
    titleImage:item?.titleImage,
    onCardClick: () => {item.onClickHandler && item.onClickHandler()},
    optionsDiv: item.optionsDiv
  }
  return obj
};

const FileManager: React.FC<IFileManagerProps> = ({
  data,
  grid = 3,
  heading,
  view = "gallery",
  varient = "default",
  fileType = "folder",
  showAction = true,
}) => {
  return (
    <>
      { view == "gallery" && <div className="flex flex-col gap-4 min-w-[720px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-text-primary font-inter text-lg font-semibold leading-7 tracking-[0.18px]">
            {heading}
          </h1>
        </div>
        <div className={`grid grid-cols-${grid} gap-4 w-full`}>
          {data?.map((item, index) => (
            fileType == "folder" ? <File {...item} key={index}></File> : fileType == "document" ? <HomeCard {...formatDataForDocument(item)}></HomeCard> : <MarketplaceCard {...item}></MarketplaceCard>
          ))}
        </div>
      </div>}
      {view == "list" && <div className="flex flex-col gap-4 min-w-[720px]">
        <Table
        data={formatDataForTable(data)}
        paginationEnabled={false}
        showTopSection={false}
        multiSelect={false}
        columns={columns.filter((column) => showAction ? true : column.key !== "action")}
        TableTitle={""}
      />
      </div>}
    </>
  );
};

export default FileManager;
