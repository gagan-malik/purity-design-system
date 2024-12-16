import React, { useCallback, useEffect, useRef, useState } from "react";
import upload from "../../../assets/icons/upload.svg";
import { useDropzone } from "react-dropzone";
import FileInfo, { IfileInfo } from "./FileInfo";
import Avatar from "../../Avatar";

interface IPropsFileUpload {
  labelHighlight?: string;
  label?: string;
  description?: string;
  uploadedFiles?: IfileInfo[];
  grid?: number;
  customGridClass?: string;
  onFileUpload?: (files: any) => void;
}

const FileUpload: React.FC<IPropsFileUpload> = ({
  labelHighlight,
  label,
  description,
  uploadedFiles,
  grid = 1,
  customGridClass,  
  onFileUpload
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const [preview, setPreview] = useState<ArrayBuffer | string | null>(null);
  const [fileUploaing, setFileUploaing] = useState(false);
  const [files, setFiles] = useState<IfileInfo[] | undefined>(uploadedFiles);

  useEffect(() => {
    setFiles(uploadedFiles);
  }, [uploadedFiles]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFileUploaing(true);

    if (acceptedFiles.length && onFileUpload) {
      onFileUpload(acceptedFiles);
      setFileUploaing(false);
    }

    // **-- Code for show file preview **--
    // const file = new FileReader();
    // file.onload = () => {
    //   setPreview(file.result);
    //   setFileUploaing(false);
    // };
    // file.readAsDataURL(allUploadedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    setFileUploaing(true);
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    const filesUploaded = target.files;

    if (filesUploaded.length && onFileUpload) {
      onFileUpload(filesUploaded);
      setFileUploaing(false);
    }

    // **-- Code for show file preview **--
    // const file = new FileReader();
    // file.onload = () => {
    //   setPreview(file.result);
    // };
    // file.readAsDataURL(fileUploaded);
  };

  const onOuterDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        {...getInputProps()}
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileUpload}
      />

      <div className="flex flex-col gap-4 items-center justify-center h-full">
        {/* upload section  */}
        <div
          {...getRootProps()}
          onClick={onOuterDivClick}
          className="rounded-2xl bg-bg-primary border border-solid border-border-secondary py-4 px-6 flex flex-col items-center justify-center gap-3 cursor-pointer w-full h-full"
        >
          <div>

            <Avatar border="none" size="lg" icon={upload} />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 text-sm text-tert-600 font-normal">
            <p>
              {labelHighlight && (
                <span className="text-blue-700 text-sm font-semibold">
                  {fileUploaing
                    ? "Uploading..."
                    : isDragActive
                    ? "Drop the files here ..."
                    : labelHighlight}{" "}
                </span>
              )}

              {!isDragActive && !fileUploaing && label}
            </p>
            <p>{description}</p>
          </div>
        </div>

        {/* display uploaded files  */}
        {files && (
          <div className={`grid grid-cols-${grid} gap-3 w-full ${customGridClass}` }>
            {files.map((data) => {
              return <FileInfo data={data}/>;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FileUpload;
