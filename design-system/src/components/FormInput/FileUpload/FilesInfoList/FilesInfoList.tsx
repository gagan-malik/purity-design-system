import React, { useState } from "react";
import FileInfo, { IfileInfo } from "../FileInfo";

interface IFilesInfoList {
  files: IfileInfo[];
  grid?: number;
}

const FilesInfoList: React.FC<IFilesInfoList> = ({
  files = [],
  grid = 1,
}) => {
  const [allFiles] = useState<IfileInfo[]>(files);

  return (
    <>
      <div className={`grid grid-cols-${grid} gap-3 w-full`}>
        {allFiles.map((data) => {
          return <FileInfo data={data}/>;
        })}
      </div>
    </>
  );
};

export default FilesInfoList;
