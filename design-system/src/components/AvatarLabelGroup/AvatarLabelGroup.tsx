import React from "react";
import Avatar, { AvatarProps } from "../Avatar/Avatar";

export interface IAvatarLabelGroup extends Omit<AvatarProps, "size"> {
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
}
const AvatarLabelGroup: React.FC<IAvatarLabelGroup> = ({
  title,
  description,
  size = "sm",
  ...props
}) => {
  const titleClass = {
    sm: "text-sm font-semibold",
    md: "text-sm font-semibold",
    lg: "text-base font-semibold",
    xl: "text-lg font-semibold",
  };
  const descriptionClass = {
    sm: "text-xs font-normal",
    md: "text-sm font-normal",
    lg: "text-base font-normal",
    xl: "text-base font-normal",
  };
  return (
    <div className="flex items-center justify-start gap-2.5 bg-bg-primary">
      <Avatar size={size} {...props} />
      <div className="flex flex-col items-start">
        <p className={`${titleClass[size]} text-text-primary`}>{title}</p>
        <p className={`${descriptionClass[size]} text-text-tertiary`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default AvatarLabelGroup;
