import React from "react";
import { Icons } from "../Icons/Icons";
interface IAlertProps {
  message: string;
  onClose: () => void;
  actionDiv?: React.ReactNode;
  alertType:
    | "error"
    | "warning"
    | "info"
    | "success"
    | "transparent"
    | "primary"
    | "default"
    | "custom";
  messageColor?: string;
  backgroundColor?: string;
  messageText?: string;
  closeButton?: React.ReactNode;
  showCloseButton?: boolean;
}

export const Alert: React.FC<IAlertProps> = ({
  message,
  onClose,
  actionDiv,
  alertType,
  messageColor,
  backgroundColor,
  messageText,
  showCloseButton = true,
}) => {
  const alertBackground = {
    error: "bg-button-tertiaryErrorFg",
    warning: "bg-bg-warning-solid",
    info: "bg-bg-brand-solid",
    success: "bg-bg-success-solid",
    transparent: "",
    primary: "bg-bg-brand-solid",
    default: "bg-bg-primary-solid",
    custom: backgroundColor,
  };
  const alertMessageColor = {
    error: "text-white",
    warning: "text-white",
    info: "text-white",
    success: "text-white",
    transparent: "text-text-primary",
    primary: "text-white",
    default: "text-white",
    custom: messageColor,
  };

  const alertMessageText = {
    error: "text-sm  font-semibold",
    warning: "text-sm  font-semibold",
    info: "text-sm  font-semibold",
    success: "text-sm  font-semibold",
    transparent: "text-sm  font-semibold",
    primary: "text-sm  font-semibold",
    default: "text-sm  font-semibold",
    custom: messageText,
  };

  return (
    <>
      <div
        className={`flex w-full  h-11  justify-center items-center ${alertBackground[alertType]}`}
      >
        <div className="flex w-2xl justify-between items-center">
          <span
            className={`${alertMessageText[alertType]} ${alertMessageColor[alertType]}`}
          >
            {message}
          </span>
          <div className="flex items-center gap-2">
            {actionDiv}
            {showCloseButton && (
              <div className="cursor-pointer" onClick={onClose}>
                <Icons name="close" size="xs" color="text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
