import React from "react";

import Spinner from "./Spinner";
import closeIcon from "../../../assets/icons/close-sm.svg";
import fileIcon from "../../../assets/icons/file.svg";
import errorReloadIcon from "../../../assets/icons/errorReload.svg";
import picture from "../../../assets/icons/picture.svg"
import docLines from "../../../assets/icons/docLines.svg"
export interface IfileInfo {
  id?: string | number;
  mediaURL?: string;
  mediaName?: string;
  size?: number;
  progress?: number;
  fileSizeLimit?: number;
  uploadError?: boolean;
  handleDelete?: (file: any) => void;
  showLoader?: boolean;
}

interface IdataFileInfo {
  data: IfileInfo;
}
type Extension = "pdf" | "doc" | "docx" | "jpg" | "jpeg" | "png" | "unknown";

const FileInfo: React.FC<IdataFileInfo> = ({ data}) => {
  const extension = (
    data.mediaName ? data.mediaName.split(".").pop() : "unknown"
  ) as Extension;

  const showIcon = (type:string) => {
  switch (type) {
    case "pdf":
    case "doc":
    case "docx":
      return <img className="w-4 h-4" src={docLines} alt="file" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <img className="w-4 h-4" src={picture} alt="picture" />;
    default:
      return <img className="w-4 h-4" src={docLines} alt="file" />;
  }
  }
  const getSize = (size:number) => {
    if (!size) return "";
    const sizeInKB = size / 1024;
    const sizeInMB = size / 1048576;
    const sizeInGB = size / 1073741824;

    if (sizeInGB >= 1) {
      return sizeInGB.toFixed(2) + " GB";
    } else if (sizeInMB >= 1) {
      return sizeInMB.toFixed(2) + " MB";
    } else {
      return sizeInKB.toFixed(2) + " KB";
    }
  }

  return (
    <div className={`p-3 border border-solid rounded-2xl w-full flex gap-4 hover:bg-bg-primary_hover justify-between ${data.uploadError ? "border-border-error bg-bg-primary " : "border-border-secondary bg-bg-primary"}`}>
      <div className="flex gap-4" >
      <div>
        <img className="w-9 h-9 dark:filter dark:brightness-50" src={fileIcon} alt="file" />
        <div className="relative bottom-[22px] left-[10px] h-0">
        {showIcon(extension)}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-text-secondary">{data.mediaName}</span>
        <span className="text-sm font-normal text-text-tertiary">{data.size ? getSize(data.size) : ""}</span>
      </div>
      </div>
      <div>
        {data.uploadError ? <img src={errorReloadIcon} className="cursor-pointer" alt="error" /> : 
        (data.progress == 100 ?  (data.handleDelete && <div className="cursor-pointer p-2 rounded-full bg-bg-secondary" onClick={()=>data.handleDelete && data.handleDelete(data)}><img src={closeIcon} alt="delete" /></div>) : ((data.showLoader) &&  <Spinner/> ))}
      </div>
      
    </div>
  );
};

export default FileInfo;
