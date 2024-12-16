import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Checkbox } from "../Checkbox/Checkbox";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface IDropdownData {
  render: Function;
  id?: string | number;
  selected?: boolean;
  isDisabled?: boolean;
}

const Dropdown = ({
  dropdownPlaceholder,
  data,
  type = "none",
  selected,
  onChange,
  variant = "outlined",
  placement = "bottom-right",
  customDropdownClass,
  customMenuClass,
  selectWidth = null,
}: {
  dropdownPlaceholder: string | React.JSX.Element;
  data: IDropdownData[];
  selected?: IDropdownData;
  type?: "none" | "check" | "multiselect";
  onChange?: Function;
  variant?: "outlined" | "ghost";
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  customDropdownClass?: string;
  customMenuClass?:string;
  selectWidth?: "full" | "auto" | null;
}) => {
  const [selectedItem, setSelectedItem] = useState(
    selected ? data.find((d) => d.id === selected.id) : undefined
  );

  const [multiSelectedItems, setMultiSelectedItems] = useState(data);

  const borderVariant = {
    outlined: "border border-border-primary focus:border-border-brand",
    ghost: "border border-transparent focus:border-border-brand",
  };
  const dropdownPillClassname = `inline-flex w-full justify-center gap-x-1.5 rounded-[9999px] bg-bg-primary px-3 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-bg-primary_hover ${borderVariant[variant]} ${selectWidth === "full" ? "w-full" : ""}`;
  const placementClass = {
    "top-left": "bottom-12 right-0",
    "top-right": "bottom-12 left-0",
    "bottom-left": "right-0",
    "bottom-right": "left-0",
  };

  const dropDownClass = `absolute z-10 mt-2 max-h-56 w-56 origin-top-right bg-bg-primary border-2 border-border-secondary rounded-3xl overflow-y-auto scrollbar-thin scrollbar-corner-bg-quaternary scrollbar-thumb-bg-quaternary scrollbar-track-bg-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full ${placementClass[placement]}`;

  const handleMultiSelect = (r: IDropdownData) => {
    if (r.isDisabled) return;
    const updatedItems = multiSelectedItems.map(item => 
      item.id === r?.id ? { ...item, selected: !item.selected } : item
    );
    setMultiSelectedItems(updatedItems);
  }
  return (
    <Menu as="div" className={`${customMenuClass ? customMenuClass : "relative inline-block text-left"} ${selectWidth === "full" ? "w-full" : ""}`}>
      <div>
        {dropdownPlaceholder && typeof dropdownPlaceholder === "string" ?( <Menu.Button className={dropdownPillClassname}>
          {dropdownPlaceholder}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
              />
            </Menu.Button>
          ) : (
            <Menu.Button className={`${selectWidth === "full" ? "w-full" : ""}`}>
            {dropdownPlaceholder}
            </Menu.Button>
        )}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={customDropdownClass || dropDownClass}>
          <div className="px-4 py-1">
            {multiSelectedItems.map((r) => (
              (type === "multiselect" ? <div key={r?.id}>
                <div className={`flex flex-row w-full justify-between align-center hover:bg-bg-primary_hover rounded-full items-center cursor-pointer ${r.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => {
                  if (!r.isDisabled) {
                    handleMultiSelect(r);
                    onChange && onChange(r);
                  }
                }}>
                <span
                  className={classNames(
                    " inset-y-0 left-0 flex items-center pl-4 text-text-primary"
                  )}
                >
                  <Checkbox
                    id={"" + r?.id}
                    checked={multiSelectedItems.find((item) => item.id === r?.id)?.selected ? "medium" : "unchecked"}
                    disabled={r.isDisabled}
                  />
                </span>
                <div className="rounded-full w-full overflow-hidden">{r.render()}</div>
                </div>
              </div> : <Menu.Item>
              <div
                onClick={() => {
                  if (!r.isDisabled) {
                    setSelectedItem(r);
                    onChange && onChange(r);
                  }
                }}
                className={`flex flex-row w-full justify-between align-center hover:bg-bg-primary_hover rounded-full items-center ${r.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="rounded-full w-full overflow-hidden">{r.render()}</div>
                <div>
                  {type === "check" && selectedItem?.id === r?.id && (
                    <div className="pr-2">
                      <CheckIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        color="#1570ef"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Menu.Item>)
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
