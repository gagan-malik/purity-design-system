import React from "react";
import alertcircle from "../../assets/icons/notification/alertcircle.svg";
import Avatar from "../../assets/icons/notification/Avatar.svg";
import packaged from "../../assets/icons/notification/Packaged.svg";
import uploadcloud from "../../assets/icons/notification/upload.svg";
import closeIcon from "../../assets/icons/alert/close.svg";
import success from "../../assets/icons/notification/success.svg";
import release from "../../assets/icons/notification/release.svg";
import classNames from "classnames";

// To Do: move to some constant file
export type notificationVariant =
  | "alertcircle"
  | "Avatar"
  | "packaged"
  | "uploadcloud"
  | "undo"
  | "release"
  | "UpdateProfile"
  | "success";

export interface INotificationProps {
  id: number;
  message: string;
  description?: string;
  variant?: notificationVariant;
  showDismiss?: boolean | string;
  undoActionClick: () => void;
  actionLabel?: string;
  undoLabel?: string;
  onActionClick: () => void;
  onClose: (id: number) => void;
  isDesktop?: boolean;
  isMobile?: boolean;
}

export const ToastNotification = (props: INotificationProps) => {
  const {
    message,
    description,
    variant,
    showDismiss, // Now can be a boolean or a string
    actionLabel,
    onActionClick,
    onClose,
    id,
    isDesktop,
    isMobile
  } = props;

  return (
<>
    {isDesktop && (
    <div className="flex gap-xl rounded-xl border-2 border-solid border-gray-300 p-4 shadow-xs bg-base-white w-[400px] h-[128px]">

      <div
        className={`flex ${variant === "alertcircle"
          ? "h-10 w-10 rounded-md border-1 border-solid border-gray-200 p-md shadow-xs "
          : ""
          } items-start justify-start `}
      >
        {variant === "alertcircle" ? (
          <img src={alertcircle} alt="Alert Icon" />
        ) : variant === "Avatar" ? (
          <img src={Avatar} alt="Avatar Icon" />
        ) : variant === "packaged" ? (
          <img src={packaged} alt="Packaged Icon" />
        ) : variant === "uploadcloud" ? (
          <img src={uploadcloud} alt="Upload Cloud Icon" />
        ) : variant === "success" ? (
          <img src={success} alt="Success Icon" />
        ) : variant === "release" ? (
          <img src={release} alt="Release Icon" />
        ): variant === "undo" ? (
          <img src={alertcircle} alt="Release Icon" />
        )

          : (
            null)
        }
      </div>
      <div
        className={classNames(
          "flex w-full flex-col items-start justify-center",
          { "gap-lg": description }
        )}
      >
        <div className="w-full">
          <div className="flex items-start justify-between">
            <p className="text-sm font-semibold text-secondary-700">
              {message}
            </p>
            <img
              className="cursor-pointer"
              onClick={() => onClose(id)}
              src={closeIcon}
              alt="Close Icon"
            />
          </div>
          {description && (
            <p className="font-normal mt-1 text-sm text-gray-600">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 cursor-pointer">
          {typeof showDismiss === 'string' ? (
            <span
              onClick={() => onClose(id)}
              className="text-sm font-semibold text-gray-600"
            >
              {showDismiss}
            </span>
          ) : showDismiss ? (
            <span
              onClick={() => onClose(id)}
              className="text-sm font-semibold text-gray-600"
            >
              Dismiss
            </span>
          ) : null}

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
  )}





{isMobile && (
  <div className="flex flex-col gap-xl rounded-xl border-2 border-solid border-gray-300 p-4 shadow-xs bg-base-white w-[400px] h-[184px]">
    {/* First row for the image */}
    <div className="flex justify-between">
    <div
      className={`flex justify-start items-start ${variant === "alertcircle"
        ? "h-10 w-10 rounded-md border-1 border-solid border-gray-200 p-md shadow-xs"
        : ""
        }`}
    >
      {variant === "alertcircle" ? (
        <img src={alertcircle} alt="Alert Icon" />
      ) : variant === "Avatar" ? (
        <img src={Avatar} alt="Avatar Icon" />
      ) : variant === "packaged" ? (
        <img src={packaged} alt="Packaged Icon" />
      ) : variant === "uploadcloud" ? (
        <img src={uploadcloud} alt="Upload Cloud Icon" />
      ) : variant === "success" ? (
        <img src={success} alt="Success Icon" />
      ) : variant === "release" ? (
        <img src={release} alt="Release Icon" />
      ) : variant === "undo" ? (
        <img src={alertcircle} alt="Undo Icon" />
      ) : null}
    </div>
    <img
            className="cursor-pointer"
            onClick={() => onClose(id)}
            src={closeIcon}
            alt="Close Icon"
          />
</div>
    {/* Second row for the content */}
    <div
      className={classNames(
        "flex w-full flex-col items-start justify-center",
        { "gap-lg": description }
      )}
    >
      <div className="w-full">
        <div className="flex items-start justify-between">
          <p className="text-sm font-semibold text-secondary-700">
            {message}
          </p>
         
        </div>
        {description && (
          <p className="font-normal mt-1 text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 cursor-pointer">
        {typeof showDismiss === 'string' ? (
          <span
            onClick={() => onClose(id)}
            className="text-sm font-semibold text-gray-600"
          >
            {showDismiss}
          </span>
        ) : showDismiss ? (
          <span
            onClick={() => onClose(id)}
            className="text-sm font-semibold text-gray-600"
          >
            Dismiss
          </span>
        ) : null}

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
)}

  </>
  );
};
