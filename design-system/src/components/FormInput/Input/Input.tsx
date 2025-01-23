import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import EyeCloseIcon from "../../../assets/icons/eyeClose.svg";
import EyeOpenIcon from "../../../assets/icons/eyeOpen.svg";
import { ToolTip } from "../../ToolTip";

interface IPropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hintText?: string;
  showHelpTooltip?: boolean;
  showCopyButton?: boolean;
  helpText?: string;
  iconUrl?: string;
  rounded?: boolean;
  dropdownOptions?: { value: string; label: string }[];
  onDropdownChange?: (value: string) => void;
  dropdownAlignment?: "left" | "right";
  customClass?: string;
}

const Input: React.FC<IPropsInput> = ({
  iconUrl,
  label,
  hintText,
  showHelpTooltip,
  helpText,
  type = "text",
  showCopyButton = false,
  required = false,
  rounded = true,
  dropdownOptions,
  onDropdownChange,
  dropdownAlignment = "left",
  customClass,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);
  const [dropdownValue, setDropdownValue] = useState(
    dropdownOptions?.[0]?.value || ""
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    type !== inputType && setInputType(type);
  }, [type]);

  const isNotCheckboxOrRadio = type !== "checkbox" && type !== "radio";

  const wrapperClass = classNames("relative inline-flex items-center w-full h-full", {
    "rounded-[9999px]": rounded,
    "rounded-md": !rounded,
  });

  const inputClass = classNames(
    "w-full pl-4 py-2 border-1 border-solid font-normal text-base border-border-primary bg-bg-primary text-text-primary placeholder-text-placeholder",
    {
      "rounded-[9999px]": rounded && isNotCheckboxOrRadio,
      "rounded-md": !rounded && isNotCheckboxOrRadio,
      "pr-12 pl-3": dropdownOptions && dropdownAlignment === "right",
      "pl-[90px] pr-3": dropdownOptions && dropdownAlignment === "left",
      "px-3": !dropdownOptions, // default padding when no dropdown
    }
  );


  const selectClass = classNames(
    "absolute top-1/2 transform -translate-y-1/2 bg-transparent appearance-none cursor-pointer z-10 text-text-primary w-fit p-0 flex items-center border-none",
    {
      "left-4": dropdownAlignment === "left",
      "right-2": dropdownAlignment === "right",
    }
  );

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value);
    onDropdownChange && onDropdownChange(e.target.value);
  };

  const handleCopy = () => {
    if (inputRef.current && inputRef.current.value !== "") {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  return (
    <div className="mb-4 w-full h-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className={`block mb-2 text-text-tertiary font-medium text-sm`}
        >
          {label}
          {required && (
            <span className="text-text-warning-primary ml-1">*</span>
          )}
        </label>
      )}
      {type == "textarea" ? 
        <div className={wrapperClass}>
          <textarea
            className={`px-[14px] py-3 bg-bg-primary border border-border-primary rounded-4xl resize-none text-text-primary ${customClass}`}
            {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        </div>
        : <div className={wrapperClass}>
        <input
          ref={inputRef}
          type={inputType}
          className={inputClass}
          {...props}
        />
        {dropdownOptions && (
          <div className={selectClass}>
            <select
              className={
                "border-none bg-bg-primary text-text-primary ring-0 text-right min-w-fit w-10 px-0"
              }
              value={dropdownValue}
              onChange={handleDropdownChange}
            >
              {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="inline-flex pt-[2px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#AFB8C1"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        )}

        {/* eyeClose and EyeOpenIcon */}
        {type === "password" && (
          <div
            onClick={() => {
              setInputType(inputType === "password" ? "text" : "password");
            }}
            className="absolute right-4 opacity-70 z-[9999]"
          >
            <img
              src={inputType === "password" ? EyeOpenIcon : EyeCloseIcon}
              alt=""
            />
          </div>
        )}

        {/* help tooltip icon */}
        {type !== "password" && showHelpTooltip && (
          <div
            className={`absolute ${
              dropdownAlignment === "right"
                ? "right-16 top-3 pr-2"
                : showCopyButton
                ? "right-28 top-3"
                : "right-4"
            } z-[9999]`}
          >
            <ToolTip text={helpText ? helpText : "Sample Info"}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_13336_71)">
                  <path
                    d="M6.05992 5.99998C6.21665 5.55442 6.52602 5.17872 6.93322 4.9394C7.34042 4.70009 7.81918 4.61261 8.2847 4.69245C8.75022 4.7723 9.17246 5.01433 9.47664 5.37567C9.78081 5.737 9.94729 6.19433 9.94659 6.66665C9.94659 7.99998 7.94659 8.66665 7.94659 8.66665M7.99992 11.3333H8.00659M14.6666 7.99998C14.6666 11.6819 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6819 1.33325 7.99998C1.33325 4.31808 4.31802 1.33331 7.99992 1.33331C11.6818 1.33331 14.6666 4.31808 14.6666 7.99998Z"
                    stroke="#AFB8C1"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13336_71">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </ToolTip>
          </div>
        )}

        {/* copy button */}
        {showCopyButton && dropdownAlignment !== "right" && (
          <div
            onClick={handleCopy}
            className={`absolute flex items-center gap-x-2 right-2 border-l border-l-border-primary py-2.5 px-3 z-[9999] cursor-pointer`}
          >
            {!isCopied && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_13336_25)">
                  <path
                    d="M4.1665 12.5C3.38993 12.5 3.00165 12.5 2.69536 12.3732C2.28698 12.204 1.96253 11.8795 1.79337 11.4712C1.6665 11.1649 1.6665 10.7766 1.6665 10V4.33335C1.6665 3.39993 1.6665 2.93322 1.84816 2.5767C2.00795 2.2631 2.26292 2.00813 2.57652 1.84834C2.93304 1.66669 3.39975 1.66669 4.33317 1.66669H9.99984C10.7764 1.66669 11.1647 1.66669 11.471 1.79355C11.8794 1.96271 12.2038 2.28717 12.373 2.69555C12.4998 3.00183 12.4998 3.39012 12.4998 4.16669M10.1665 18.3334H15.6665C16.5999 18.3334 17.0666 18.3334 17.4232 18.1517C17.7368 17.9919 17.9917 17.7369 18.1515 17.4233C18.3332 17.0668 18.3332 16.6001 18.3332 15.6667V10.1667C18.3332 9.23327 18.3332 8.76656 18.1515 8.41004C17.9917 8.09643 17.7368 7.84147 17.4232 7.68168C17.0666 7.50002 16.5999 7.50002 15.6665 7.50002H10.1665C9.23308 7.50002 8.76637 7.50002 8.40985 7.68168C8.09625 7.84147 7.84128 8.09643 7.68149 8.41004C7.49984 8.76656 7.49984 9.23327 7.49984 10.1667V15.6667C7.49984 16.6001 7.49984 17.0668 7.68149 17.4233C7.84128 17.7369 8.09625 17.9919 8.40985 18.1517C8.76637 18.3334 9.23308 18.3334 10.1665 18.3334Z"
                    stroke="#57606A"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_13336_25">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
            <span className={`text-sm font-semibold text-[#57606A]`}>
              {isCopied ? " Copied..." : "Copy"}
            </span>
          </div>
        )}
      </div>}
      {hintText && (
        <p className="text-text-tertiary font-normal text-sm py-2">
          {hintText}
        </p>
      )}
    </div>
  );
};

export default Input;
