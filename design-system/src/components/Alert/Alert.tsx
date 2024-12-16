import React from "react";
import CloseIcon from "../../assets/icons/close.svg";

interface IAlertProps {
  message: string;
  onClose: () => void;
  actionDiv?: React.ReactNode;
  alertType: "error" | "warning" | "info" | "success" | "transparent" | "primary" | "custom";
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
  showCloseButton = true
}) => {

  const alertBackground = {
    error: "bg-utility-error-50",
    warning: "bg-utility-warning-50",
    info: "bg-bg-brand-primary",
    success: "bg-utility-success-50",
    transparent: "",
    primary: "bg-bg-brand-solid",
    custom: backgroundColor
  }
  const alertMessageColor = {
    error: "text-text-secondary",
    warning: "text-text-warning-primary",
    info: "text-text-brand-secondary",
    success: "text-text-success-primary",
    transparent: "text-text-primary",
    primary: "text-white",
    custom: messageColor
  }

  const alertMessageText = {
    error: "text-sm  font-semibold",
    warning: "text-sm  font-semibold",
    info: "text-sm  font-semibold",
    success: "text-sm  font-semibold",
    transparent: "text-sm  font-semibold",
    primary: "text-sm  font-semibold",
    custom: messageText
  }

  return (
    <>
    <div className={`flex justify-between items-center px-20 h-11 w-full ${alertBackground[alertType]}`}>
      <span className={`${alertMessageText[alertType]} ${alertMessageColor[alertType]}`}>{message}</span>
      <div className="flex items-center gap-2">
      {actionDiv}
      {showCloseButton && <img className="cursor-pointer w-5 h-5 dark:invert" src={CloseIcon} alt="Close" onClick={onClose} />}
      </div>
    </div>
    </>
  );
};

export default Alert;
