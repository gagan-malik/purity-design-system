import React from "react";
import { Popover } from "../Popover";

export type CalloutPlacement = "top" | "bottom" | "left" | "right";

export interface CalloutProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: CalloutPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  testId?: string;
}

/**
 * Callout
 * Anchored surface for rich, dismissible content.
 *
 * Implemented as a thin wrapper around `Popover` to match agentic UI patterns.
 */
export const Callout: React.FC<CalloutProps> = (props) => {
  return (
    <Popover
      trigger={props.trigger}
      content={props.content}
      placement={props.placement}
      open={props.open}
      defaultOpen={props.defaultOpen}
      onOpenChange={props.onOpenChange}
      className={props.className}
      testId={props.testId || "callout"}
    />
  );
};

export default Callout;

