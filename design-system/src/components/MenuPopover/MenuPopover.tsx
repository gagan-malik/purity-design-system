import React from "react";
import { ReactPopover, PopoverPlacement } from "./Popover";
import { PositionTransform } from "react-tiny-popover";
import DropdownItem from "./DropdownItem";

export interface MenuPopoverData {
  heading?: string;
  title?: string;
  img?: string;
  subHeading?: string;
  badge?: string | React.JSX.Element;
  underline?: boolean;
  onClick?: Function;
  imgSize?: string;
  noSizeFit?: boolean;
  borderTop?: boolean;
  hover?: boolean; 
  customClass?: {title?: string, heading?: string, subHeading?: string, img?: string, badge?: string, container?: string};
}

export interface DropdownDataProps {
  title: string;
  description?: string;
  onClick?: () => void; 
  selected?: boolean;
  type: "default" | "icon" | "avatar" ;
  state: "default" | "focus" | "disabled";
  category: "list" | "menu" ;
  badge?: string | React.JSX.Element;
  icon?: string | React.JSX.Element | undefined;
  customClass?: {title?: string, description?: string, icon?: string};
}

export const MenuPopover = ({
  datas,
  children,
  placement,
  onClick,
  width,
  transform,
  noSizeFit,
  containerClass,
  dropdownData,
  isOpen,
  setIsOpen,
  addEventProp
}: {
  datas?: MenuPopoverData[][];
  children: React.JSX.Element;
  placement?: PopoverPlacement;
  onClick?: Function;
  width?: string;
  transform?: PositionTransform;
  noSizeFit?: boolean;
  containerClass?: string;
  dropdownData?: DropdownDataProps[];
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  addEventProp?: boolean;
}) => {
  const [show, setShow] = React.useState(false);
  const popoverIsOpen = isOpen !== undefined ? isOpen : show;
  const setPopoverIsOpen = setIsOpen || setShow;
  console.log(dropdownData, "dropdownData");
  return (
    <ReactPopover
      placement={placement}
      onClick={onClick}
      transform={transform}
      width={width}
      noSizeFit={noSizeFit}
      isOpen={popoverIsOpen}
      setIsOpen={setPopoverIsOpen}
      addEventProp={addEventProp}
      content={
        <div>
          {datas && datas?.map((data, dataIndex) => (
            <React.Fragment key={dataIndex}>
              <ul
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  width: width,
                  padding: "0.5rem",
                }}
                className={`${containerClass || ""}`}
              >
                {data.map((menuItem, index) => (
                  <li key={menuItem.title || index}>
                    {menuItem.borderTop && (
                      <div className="border-t-2 border-border-secondary"></div>
                    )}
                    <div
                      className={`${menuItem.customClass?.container || "flex items-center px-3 py-2 justify-between rounded-full"} ${
                        menuItem.onClick ? "cursor-pointer" : ""
                      } ${
                        menuItem.hover
                          ? "hover:bg-bg-active rounded-full cursor-pointer" 
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        menuItem.onClick && menuItem.onClick(menuItem);
                        setPopoverIsOpen(false); // Close the popover after clicking an item
                      }}
                    >
                      <div className="flex items-center">
                        {menuItem.img && (
                          <img
                            src={menuItem.img}
                            alt="default-avatar"
                            className={`${menuItem.customClass?.img || "w-8 h-8 rounded-full "}`}
                            width={menuItem.imgSize ? menuItem.imgSize : "32"}
                            height={menuItem.imgSize ? menuItem.imgSize : "32"}
                          />
                        )}
                        {menuItem.heading && (
                          <p className={`${menuItem.customClass?.heading || "text-text-secondary text-sm font-medium"}`}>
                            {menuItem.heading}
                          </p>
                        )}
                        {menuItem.title && (
                          <div className="ml-3">
                            <p className={`${menuItem.customClass?.title || "text-md font-semibold text-text-secondary"}`}>
                              {menuItem.title}
                            </p>
                            {menuItem.subHeading && (
                              <p className={`${menuItem.customClass?.subHeading || "text-sm font-medium text-text-tertiary"}`}>
                                {menuItem.subHeading}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      {menuItem.badge &&
                        (typeof menuItem.badge === "string" ? (
                          <img
                            src={menuItem.badge}
                            alt="star-avatar"
                            className={`${menuItem.customClass?.badge || "h-6"}`}
                            width="24"
                            height="24"
                          />
                        ) : (
                          menuItem.badge
                        ))}
                    </div>
                    {menuItem.underline && (
                      <div className="border-t-2 border-border-secondary"></div>
                    )}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
          {
            <div className={`m-2 bg-bg-primary ${containerClass}` }>
              {dropdownData && dropdownData?.map((item, index)=>{
                return <DropdownItem data={item} key={index?.toString()} />
              })}
            </div>
          }
        </div>
      }
    >
      {children}
    </ReactPopover>
  );
};
