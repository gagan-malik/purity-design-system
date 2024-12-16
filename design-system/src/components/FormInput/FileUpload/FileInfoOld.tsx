import React from "react";
import deleteIcon from "../../../assets/icons/delete.svg";
import fileIcon from "../../../assets/icons/file.svg";
import LoadingBar from "./LoadingBar";
import Spinner from "./Spinner";
export interface IfileInfo {
  id?: number;
  mediaURL?: string;
  media_name: string;
  ticket_id?: number;
  uploaded_by?: number;
  size?: number;
  created_at?: string;
  archived?: number;
  archived_at?: string | null;
  type?: "spinner" | "progress";
  progress?: number;
}

interface IdataFileInfo {
  data: IfileInfo;
  handleDelete?: (file: any) => void;
  showLoadingBar?:boolean;
}
type Extension = "pdf" | "docx" | "jpg" | "jpeg" | "png" | "unknown";

const FileInfo: React.FC<IdataFileInfo> = ({ data, handleDelete, showLoadingBar}) => {
  const extension = (
    data.media_name ? data.media_name.split(".").pop() : "unknown"
  ) as Extension;
  const extensionColor: { [key in Extension]: string } = {
    pdf: "bg-error-600",
    docx: "bg-blue-600",
    jpg: "bg-blue-600",
    jpeg: "bg-blue-600",
    png: "bg-blue-600",
    unknown: "bg-blue-600",
  };

  return (
    <div className="py-2 px-4 border border-solid border-border-secondary bg-bg-primary rounded-2xl text-sm font-medium text-secondary-700 flex items-center justify-start gap-3 w-full">
      {extension === "jpg" || extension === "jpeg" || extension === "png" ?  
      <img src={data.mediaURL} alt={data.media_name} className="w-10 h-12 rounded-md" />  :
      
      <div className="flex items-center justify-center">
        <img className="cursor-pointer" src={fileIcon} alt="" />
        <div className="relative bottom-[-0.325rem] right-10">
          <div
            className={`${extensionColor[extension]} inline-flex items-center justify-center text-center rounded-[2px] py-0.5 px-[3px]`}
          >
            <p className="text-surface-white text-[10px] leading-3">
              {extension}
            </p>
          </div>
        </div>
      </div>}
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
          <span>{data.media_name}</span>
          <p className="font-normal text-secondary-600">
          {data.size ? (data.size / 1048576).toFixed(2) + " MB" : ""}
        </p>
          </div>
          <div className="flex items-center gap-3">
          {showLoadingBar && data.type === "spinner" && <div className="flex items-center justify-between gap-3">
          <Spinner/>
        </div>}
          {handleDelete && <img
            className="cursor-pointer"
            src={deleteIcon}
            alt=""
            onClick={() => handleDelete(data)}
          />}
          </div>
        </div>


       {showLoadingBar && data.type === "progress" && <div className="flex items-center justify-between gap-3">
          <LoadingBar />
          <p>100%</p>
        </div>}

      </div>
    </div>
  );
};

export default FileInfo;
