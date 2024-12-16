import React, { useState } from "react";
import { Input, Select } from "../../index";
import { OnSearchFilterFunctionType } from "../DragAndDrop/DragAndDrop";
import { ISelectData } from "../../index";

export type filter = {
  label?: string;
  labelBold?: boolean;
  placeholder?: string;
  type: string;
  options?: ISelectData[];
  defaultSelected?: ISelectData;
  value?: string;
  iconUrl?: string;
};

interface ISearchFilterDND {
  onSearchFilter: OnSearchFilterFunctionType;
  filterOptions: filter[];
}

const SearchAndFilter: React.FC<ISearchFilterDND> = ({
  filterOptions,
  onSearchFilter,
}) => {
  const [filters, setFilters] = useState({
    search: {},
    filter: {},
  });

  const handleSearchFilter = (type: string, val: any, index: number = 0) => {
    let temp;
    if (type === "search") {
      temp = {
        ...filters,
        filter: { ...filters.filter },
        search: { [`searchValue${index}`]: val },
      };
    } else {
      temp = {
        ...filters,
        search: { ...filters.search },
        filter: {
          ...filters.filter,
          [`filter${index}`]: val,
        },
      };
    }
    onSearchFilter(temp);
    setFilters(temp);
  };
  return (
    <>
      <div className="bg-bg-secondary p-4 rounded-xl">
        <div className="flex items-center space-x-2 justify-between">
          <div className="-mb-4 w-3/4">
            {filterOptions
              .filter((el) => el.type === "text")
              .map((option, ind) => (
                <Input
                  key={ind}
                  // labelBold={option.labelBold}
                  iconUrl={option.iconUrl}
                  label={option.label}
                  onChange={(e) => {
                    handleSearchFilter("search", e.target.value, ind + 1);
                  }}
                  placeholder={option.placeholder}
                  type={option.type}
                />
              ))}
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            {filterOptions
              .filter((el) => el.type === "select")
              .map((option, ind) => (
                <Select
                  key={ind}
                  labelBold={option.labelBold}
                  placeholder={option.placeholder ?? ""}
                  label={option.label}
                  onClick={(val: any) => {
                    handleSearchFilter("filter", val, ind + 1);
                  }}
                  defaultSelected={option.defaultSelected}
                  options={option.options ? option.options : []}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilter;
