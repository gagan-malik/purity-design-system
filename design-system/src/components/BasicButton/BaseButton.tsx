import classNames from "classnames";
import React from "react";

interface IBaseButton {
  boder_left?: boolean;
  boder_right?: boolean;
  children: string | React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}
export const BaseButton: React.FC<IBaseButton> = ({
  boder_left,
  boder_right,
  children,
  selected = false,
  onClick,
}) => {
  const borderRadiusClass = boder_left
    ? "rounded-l-lg"
    : boder_right
    ? "rounded-r-lg"
    : "";

  const btnClass = classNames(
    `px-4 w-full py-2 border border-solid border-border-primary flex items-center text-sm font-semibold  text-text-secondary justify-center cursor-pointer ${borderRadiusClass} ${
      selected ? "bg-bg-primary_hover" : "bg-bg-primary"
    }`
  );
  return (
    <div onClick={onClick} className={btnClass}>
      {children}
    </div>
  );
};
