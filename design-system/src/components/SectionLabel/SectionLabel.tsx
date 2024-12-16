import React from "react";
import HelpIcon from "../../assets/icons/helpIcon.svg";
import { ToolTip } from "../ToolTip/ToolTip";

interface ISectionLabelProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  helpIcon?: boolean;
  helpText?: string;
  tooltipAlign?: "left" | "right" | "top" | "bottom";
  actions?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const SectionLabel: React.FC<ISectionLabelProps> = ({
  title,
  description,
  helpIcon = false,
  helpText,
  actions,
  size = "md",
  tooltipAlign
}) => {
    const sizeClass = {
        sm: {
            title: "text-sm font-semibold text-text-secondary",
            description: "text-sm font-regular text-text-tertiary",
        },
        md: {
            title: "text-base font-semibold text-text-secondary",
            description: "text-base font-regular text-text-tertiary"
        },
        lg: {
            title: "text-lg font-semibold text-text-secondary",
            description: "text-lg font-regular text-text-tertiary"
        },
    }
  return (
    <div className="flex flex-col bg-bg-primary">
      <div className="flex items-center gap-2">
        <div className={`${sizeClass[size].title}`}>{title}</div>
        {helpIcon && <ToolTip text={helpText || ""} align={tooltipAlign || "bottom"}><img src={HelpIcon} alt="help" className="w-4 h-4" /></ToolTip>}
      </div>    
      {description && <div className={`${sizeClass[size].description}`}>{description}</div>}
      <div className="mt-2">
        {actions}
      </div>
    </div>
  );
};

