import React from "react";
import classNames from "classnames";
import { Callout } from "../Callout";

export interface TeachingBubbleProps {
  trigger: React.ReactNode;
  title: string;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  testId?: string;
}

export const TeachingBubble: React.FC<TeachingBubbleProps> = ({
  trigger,
  title,
  description,
  actions,
  placement = "bottom",
  open,
  defaultOpen,
  onOpenChange,
  className,
  testId = "teaching-bubble",
}) => {
  return (
    <Callout
      trigger={trigger}
      placement={placement}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      testId={testId}
      content={
        <div className={classNames("w-[360px] max-w-[80vw] space-y-2", className)}>
          <div className="text-sm font-semibold text-text-primary">{title}</div>
          {description && (
            <div className="text-sm text-text-secondary">
              {typeof description === "string" ? <span className="whitespace-pre-wrap">{description}</span> : description}
            </div>
          )}
          {actions && <div className="pt-2">{actions}</div>}
        </div>
      }
    />
  );
};

export default TeachingBubble;

