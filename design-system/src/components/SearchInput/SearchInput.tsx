import React,{useState} from "react";
import Badge from "../Badge";
import { Input } from "../../index";
import searchIcon from "../../assets/icons/searchIcon-sm.svg";
import filterLines from "../../assets/icons/filterLines.svg"
import closeIcon from "../../assets/icons/close-sm.svg"


interface ISearchInputProps {
  placeholder: string;
  value:string;
  onSearchInput: (val: string) => void;
  showActionButton: boolean;
  onActionButtonClick: () => void;
  onClearButtonClick: () => void;
  containerDiv ?: React.JSX.Element;
  showRoundedBottom?: boolean;
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  placeholder,onSearchInput,showActionButton,onActionButtonClick,containerDiv,showRoundedBottom,value,onClearButtonClick,...props
}) => {
  return (
    <div className="w-full">
      <form  className={`flex bg-bg-primary text-text-primary items-center shadow-boxShadowBlack px-4	${showRoundedBottom ? "rounded-3xl" : "rounded-t-3xl"} h-[72px]`}>
        <div className="">
        <img src={searchIcon} alt="searchIcon"/>
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="text-base w-full py-2 bg-transparent border-0 focus:outline-none focus:ring-0"
          {...props}
        />
         {value && <button
          type="button"
          className="rounded-full hover:bg-bg-primary_hover focus:outline-none focus:ring-2 focus:ring-gray-300 p-3"
          onClick={onClearButtonClick}
        >
          <img src={closeIcon} alt="closeIcon"></img>
        </button>}
        {showActionButton && <button
          type="button"
          className="rounded-full hover:bg-bg-primary_hover focus:outline-none focus:ring-2 focus:ring-gray-300 p-3"
          onClick={onActionButtonClick}
          
        >
          <img className="h-[20px]" src={filterLines} alt="filterLines"></img>
        </button>}
      </form>
      {containerDiv}
    </div>
  );
};
