import classNames from "classnames";
import React, { useState } from "react";

interface IPropsButtonGroup {
  children: JSX.Element[];
  variant?: "gap" | "stick";
}
const ButtonGroup = (props: IPropsButtonGroup) => {
  const { children, variant = "gap" } = props;

  const btnGroupClass = classNames(
    {
      "bg-bg-tertiary flex items-center justify-center gap-md rounded-lg p-1":
        variant === "gap",
    },
    { "shadow-xs flex items-center justify-start": variant === "stick" }
  );

  return <div className={btnGroupClass}>{children}</div>;
};

export default ButtonGroup;
