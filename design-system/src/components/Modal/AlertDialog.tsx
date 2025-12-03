import React from "react";
import classNames from "classnames";
import { Button, ButtonColor, ButtonVariant } from "../Button";
import { useIsMobile } from "../../hooks";
import { MobileSheet } from "../MobileSheet";

export interface AlertDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog should close */
  onClose: () => void;
  /** Title of the alert dialog */
  title: string;
  /** Description/content of the alert dialog */
  description?: string | React.ReactNode;
  /** Label for the cancel button */
  cancelLabel?: string;
  /** Label for the action button */
  actionLabel: string;
  /** Variant of the action button */
  actionVariant?: ButtonVariant;
  /** Color of the action button */
  actionColor?: ButtonColor;
  /** Whether the action is destructive */
  destructive?: boolean;
  /** Callback when action is confirmed */
  onConfirm: () => void;
  /** Icon to display */
  icon?: string | React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * AlertDialog - A specialized modal for confirmations and alerts
 * Optimized for critical user decisions
 */
export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  cancelLabel = "Cancel",
  actionLabel,
  actionVariant = "filled",
  actionColor = "primary",
  destructive = false,
  onConfirm,
  icon,
  className = "",
  testId = "alert-dialog",
}) => {
  const isMobile = useIsMobile();

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const finalActionColor = destructive ? "destructive" : actionColor;

  const content = (
    <div className={classNames("space-y-4", className)}>
      {/* Icon */}
      {icon && (
        <div className="flex justify-center">
          {typeof icon === "string" ? (
            <img src={icon} alt="" className="w-12 h-12" />
          ) : (
            icon
          )}
        </div>
      )}

      {/* Title */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>

      {/* Description */}
      {description && (
        <div className="text-center">
          {typeof description === "string" ? (
            <p className="text-sm text-text-secondary">{description}</p>
          ) : (
            description
          )}
        </div>
      )}

      {/* Actions */}
      <div
        className={classNames(
          "flex gap-3",
          isMobile ? "flex-col-reverse" : "flex-row justify-end"
        )}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          className={isMobile ? "w-full" : ""}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={actionVariant}
          color={finalActionColor}
          onClick={handleConfirm}
          className={isMobile ? "w-full" : ""}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );

  // Use MobileSheet on mobile for better UX
  if (isMobile) {
    return (
      <MobileSheet
        open={open}
        onClose={onClose}
        dismissible={false}
        snapPoints={[0.4]}
        showBackdrop={true}
      >
        {content}
      </MobileSheet>
    );
  }

  // Desktop modal
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-bg-overlay backdrop-filter backdrop-blur-sm z-[999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      data-testid={testId}
    >
      <div className="w-full max-w-md bg-bg-primary rounded-2xl shadow-3xl p-6 m-4">
        {content}
      </div>
    </div>
  );
};

export default AlertDialog;

