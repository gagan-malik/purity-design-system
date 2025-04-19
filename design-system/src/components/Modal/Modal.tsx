import React, { useRef } from "react";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import classNames from "classnames";
import { Button, ButtonColor, ButtonVariant } from "../Button";
import closeIcon from "../../assets/icons/alert/close.svg";

interface IModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  header: string | React.ReactNode;
  footer: React.ReactNode;
  widthVariant?: "small" | "default" | "large" | "full" | "reportmodal";
  customClass?: string;
  headerTitle?: string;
  headerDescription?: string;
  useDefaultFooter?: boolean;
  closeActionLabel?: string;
  actionLabel?: string;
  onShown?: () => void;
  highlightDescription?: boolean;
  disableAction?: boolean;
  cancelButtonVariant?: ButtonVariant;
  actionButtonVariant?: ButtonVariant;
  cancelButtonColor?: ButtonColor;
  actionButtonColor?: ButtonColor;
  headerIconUrl?: string | React.ReactNode;
  showCrossIcon?: boolean;
}

const Modal = (props: IModalProps) => {
  const {
    onClose,
    header,
    footer,
    children,
    widthVariant = "default",
    headerTitle,
    headerDescription,
    useDefaultFooter = false,
    closeActionLabel,
    actionLabel,
    onShown,
    highlightDescription = false,
    disableAction,
    cancelButtonVariant = "outlined",
    actionButtonVariant = "filled",
    cancelButtonColor = "secondary",
    actionButtonColor = "primary",
    headerIconUrl,
    customClass,
    showCrossIcon = true,
  } = props;
  const modalRef = useRef(null);

  const closeModal = (e: any) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const widthVariantClasses = {
    small: "md:w-[400px]",
    default: "md:w-[500px]",
    large: "md:w-[800px]",
    full: "",
    reportmodal: "md:w-[480px] md:h-[496px]",
  };

  const modalClass = classNames(
    "items-start df:w-full justify-center transition duration-500 ease-in-out p-6 flex flex-col rounded-[24px] bg-bg-primary m-5 shadow-3xl",
    widthVariantClasses[widthVariant],
    {
      "gap-4": widthVariant !== "reportmodal",
      "gap-0.5": widthVariant === "reportmodal",
    },
    customClass
  );

  return (
    <>
      <div
        ref={modalRef}
        onClick={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]"
      >
        <div className={modalClass}>
          {header ? (
            header
          ) : headerTitle ? (
            <ModalHeader
              headerIconUrl={headerIconUrl}
              title={headerTitle}
              description={headerDescription}
              highlightDescription={highlightDescription}
              onCancel={onClose}
              showCrossIcon={showCrossIcon}
            />
          ) : showCrossIcon ? (
            <div className="flex w-full items-end justify-end">
              <Button
                variant="outlined"
                color="label"
                shape="circle"
                size="mini"
                imgSrc={closeIcon}
                onClick={onClose}
              ></Button>
            </div>
          ) : (
            <></>
          )}
          {children}
          {footer ? (
            footer
          ) : useDefaultFooter ? (
            <ModalFooter
              onCancel={onClose}
              closeActionLabel={closeActionLabel}
              actionLabel={actionLabel}
              onShown={onShown}
              disableAction={disableAction}
              actionButtonVariant={actionButtonVariant}
              actionButtonColor={actionButtonColor}
              cancelButtonColor={cancelButtonColor}
              cancelButtonVariant={cancelButtonVariant}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
