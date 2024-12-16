import React from "react";
import { ReactPopover, PopoverPlacement } from "../MenuPopover/Popover";

export interface IPopup {
  popupText?: string | React.JSX.Element;
  placement?: PopoverPlacement;
  children?: string | React.JSX.Element;
  popoverWidth?: string;
  showPopup?: boolean;
}

export const Popup = ({
  popupText,
  showPopup,
  placement,
  children,
  popoverWidth,
}: IPopup) => {
  return popupText || showPopup ? (
    <ReactPopover
      content={<div>{popupText}</div>}
      trigger="hover"
      placement={placement ?? PopoverPlacement.right}
      width={popoverWidth ?? "200px"}
    >
      <div>{children}</div>
    </ReactPopover>
  ) : (
    <div>{children}</div>
  );
};
