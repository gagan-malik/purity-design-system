import React from "react";
import { DropdownDataProps } from "./MenuPopover";
import { CheckIcon } from "@heroicons/react/20/solid";

const DropdownItem = ({ data ,key}: { data: DropdownDataProps ,key: string }) => {
  const titleStyle = {
    list: "text-text-primary text-sm font-medium",
    menu: "text-text-primary text-base font-medium",
  };
  const descriptionStyle = {
    list: "text-text-secondary text-sm font-normal",
    menu: "text-text-secondary text-sm font-normal",
  };
  return (
    <div className={`flex items-center px-4 py-2 justify-between bg-bg-primary hover:bg-bg-primary_hover rounded-4xl ${data.state === "disabled" ? "cursor-not-allowed" : "cursor-pointer"}`}
     onClick={data.onClick} key={key}>
      <div className={`flex items-center gap-2 ${data.state === "disabled" && "opacity-50"}`}>
        {(data.type === "icon" || data.type === "avatar") ? (
          <div>
            {typeof data.icon === "string" ? (
              <img className={data.customClass?.icon || "w-4 h-4"} src={data.icon} alt={data.title} />
            ) : (
              data.icon
            )}
          </div>
        ) : null}
        <div className="flex flex-col">
          <span
            className={
                data.customClass?.title || titleStyle[data?.category as DropdownDataProps["category"]] 
            }
          >
            {data.title}
          </span>
          <span
            className={
              data.customClass?.description || descriptionStyle[data?.category as DropdownDataProps["category"]]
            }
          >
            {data.description}
          </span>
        </div>
      </div>
      {data.category === "list" ? data?.badge : <div className="h-5 w-5">
        <CheckIcon
          className="h-5 w-5"
          aria-hidden="true"
          color="#1570ef"
        />
      </div>}
    </div>
  );
};
export default DropdownItem;
