import React, { useEffect, useRef } from "react";
import { Popover, PositionTransform } from "react-tiny-popover";

export enum PopoverPlacement {
  right = "right",
  left = "left",
  bottom = "bottom",
  top = "top",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
  topRight = "topRight",
}
export interface PopoverProps {
  children: React.JSX.Element;
  content: React.JSX.Element;
  trigger?: "click" | "hover";
  width?: string;
  placement?: PopoverPlacement;
  onClick?: Function;
  transform?: PositionTransform;
  hidePopover?: boolean;
  contentWidth?: string;
  noSizeFit?: boolean;
  zIndexToShow?: number;
  stopAutoClose?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ReactPopover({
  children,
  content,
  trigger = "click",
  width = "360px",
  placement = PopoverPlacement.bottomLeft,
  onClick,
  transform,
  hidePopover,
  contentWidth,
  noSizeFit,
  zIndexToShow,
  stopAutoClose = false,
  isOpen,
  setIsOpen,
}: PopoverProps) {
  const [internalShow, setInternalShow] = React.useState(false);
  const show = isOpen !== undefined ? isOpen : internalShow;
  const setShow = setIsOpen || setInternalShow;
  const wrapperRef = useRef(null);

  const handleMouseOver = () => {
    if (trigger === "hover") {
      setShow(true);
      onClick && onClick(true);
    }
  };

  useEffect(() => {
    hidePopover && setShow(!hidePopover);
  }, [hidePopover]);

  let tooltipPlacement = [] as string[];
  if (placement === PopoverPlacement.bottomLeft) {
    tooltipPlacement = ["bottom", "left"];
  }
  if (placement === PopoverPlacement.bottomRight) {
    tooltipPlacement = ["bottom", "right"];
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseOver}
      className={`relative  ${noSizeFit ? "" : "size-fit"}`}
      style={{
        display: "flex",
        zIndex: zIndexToShow || 50,
        width: contentWidth,
      }}
    >
      <Popover
        isOpen={show}
        ref={wrapperRef}
        transform={transform}
        transformMode={"relative"}
        containerStyle={{ zIndex: "1000" }}
        positions={
          tooltipPlacement.length ? tooltipPlacement : (placement as any)
        } // if you'd like, you can limit the positions
        padding={10} // adjust padding here!
        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setShow(false)} // handle click events outside of the popover/target here!
        content={(
          { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
        ) => (
          <div
            className="rounded-[24px] bg-bg-primary border-border-primary border mb-[10px] z-[1000] overflow-hidden"
            style={{ width: width }}
            onClick={() =>
              setTimeout(() => {
                !stopAutoClose && setShow(!show);
              }, 100)
            }
          >
            {content}
          </div>
        )}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShow(!show);
            onClick && onClick(!show);
          }}
          className="flex-1"
        >
          {children}
        </div>
      </Popover>
    </div>
  );
}
