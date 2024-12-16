import React, { useState } from "react";
import basicIcon from "../../assets/icons/alert/infoCircle.svg";
import primaryIcon from "../../assets/icons/alert/infoCirclePrimary.svg";
import errorIcon from "../../assets/icons/alert/alertCircleError.svg";
import warningIcon from "../../assets/icons/alert/alertCircleWarning.svg";
import successIcon from "../../assets/icons/alert/checkCircle.svg";
import secondaryIcon from "../../assets/icons/alert/secondaryCircle.svg";
import closeIcon from "../../assets/icons/alert/close.svg";
import classNames from "classnames";

// to do: move to some constant file
export type alertVariant =
  | "basic"
  | "primary"
  | "secondary"
  | "success"
  | "warinng"
  | "error";

export interface IAlertProps {
  id: number;
  message: string;
  description?: string;
  variant?: alertVariant;
  showDismiss?: boolean;
  actionLabel?: string;
  onActionClick: () => void;
  onClose: (id: number) => void;
}

export const ToastAlert = (props: IAlertProps) => {
  const {
    message,
    description,
    variant,
    showDismiss = false,
    actionLabel,
    onActionClick,
    onClose,
    id,
  } = props;

  return (
    <div className="flex gap-xl rounded-xl border border-border-primary p-4 shadow-xs bg-bg-primary z-50">
      <div
        className={`flex ${
          variant === "basic"
            ? "h-10 w-10 rounded-md border-1 border-solid border-gray-200 p-md shadow-xs "
            : ""
        } items-start justify-start `}
      >
        {variant === "primary" ? (
          <img className="w-6 h-6" src={primaryIcon} alt="" />
        ) : variant === "success" ? (
          <img className="w-6 h-6" src={successIcon} alt="" />
        ) : variant === "error" ? (
          <img src={errorIcon} alt="" />
        ) : variant === "warinng" ? (
          <img src={warningIcon} alt="" />
        ) : variant === "secondary" ? (
          <img src={secondaryIcon} alt="" />
        ) : (
          <img src={basicIcon} alt="" />
        )}
      </div>
      <div
        className={classNames(
          "flex w-full flex-col items-start justify-center",
          { "gap-lg": description }
        )}
      >
        <div className="w-full">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-text-secondary">
              {message}
            </p>
            <img
              className="cursor-pointer"
              onClick={() => onClose(id)}
              src={closeIcon}
              alt=""
            />
          </div>
          {description && (
            <p className="font-weight: 400; mt-1 text-sm text-text-tertiary">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-start justify-center gap-3 cursor-pointer">
          {showDismiss && (
            <span
              onClick={() => onClose(id)}
              className="text-sm font-semibold text-text-tertiary"
            >
              Dismiss
            </span>
          )}
          {actionLabel && (
            <span
              onClick={onActionClick}
              className="text-sm font-semibold text-blue-700"
            >
              {actionLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
