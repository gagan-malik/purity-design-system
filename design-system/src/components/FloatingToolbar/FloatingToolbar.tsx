import React from "react";
import DownArrowIcon from "../../assets/icons/newSideNav/chevronDown.svg";
import CloseIcon from "../../assets/icons/close-sm.svg";
import { Button } from "../Button/Button";
interface IFloatingToolbar {
  variant?: "add" | "permission" | "authentication" | "custom";
  children?: React.ReactNode;
  image?: string | React.ReactNode;
  action?: React.ReactNode;
  onBackClickHandler?: () => void ;
  onCloseClickHandler?: () => void;
  customClass?: string;
  position?: string;
  showBackButton?: boolean;
  showCloseButton?: boolean;
}

const FloatingToolbar = ({
  variant,
  children,
  image,
  action,
  onBackClickHandler,
  onCloseClickHandler,
  customClass = "w-[528px] h-fit",
  position = "bottom-12 left-1/2 transform -translate-x-1/2",
  showBackButton = false,
  showCloseButton = false,
}: IFloatingToolbar) => {

  return (
      <div className={`z-50 fixed ${position} flex gap-2 justify-between bg-bg-secondary rounded-6xl p-4 ${customClass}`}>
        <div className="flex gap-2 items-center">
          {showBackButton && (
            <Button
              onClick={onBackClickHandler}
              imgSrc={DownArrowIcon}
              color="label"
              variant="outlined"
              shape="circle"
              size="mini"
              style={{ transform: "rotate(90deg)" }}
            />
          )}
          {children}
        </div>

        <div className="flex gap-2 items-center">
          {action}
          {showCloseButton && (
            <Button
              onClick={onCloseClickHandler}
              imgSrc={CloseIcon}
              color="label"
              variant="outlined"
              shape="circle"
              size="mini"
            />
          )}
        </div>
      </div>

  );
};

export default FloatingToolbar;
