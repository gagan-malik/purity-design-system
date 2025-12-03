import React from "react";
import classNames from "classnames";
import { MobileSheet } from "../MobileSheet";

export interface ActionSheetItem {
  /** Label for the action */
  label: string;
  /** Optional icon */
  icon?: string | React.ReactNode;
  /** Whether this is a destructive action */
  destructive?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Callback when item is clicked */
  onAction: () => void;
}

export interface ActionSheetProps {
  /** Whether the action sheet is open */
  open: boolean;
  /** Callback when sheet should close */
  onClose: () => void;
  /** Action items to display */
  actions: ActionSheetItem[];
  /** Cancel button label */
  cancelLabel?: string;
  /** Title of the action sheet */
  title?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ActionSheet - Native mobile action sheet pattern
 * Displays actions in a bottom sheet with cancel option
 */
export const ActionSheet: React.FC<ActionSheetProps> = ({
  open,
  onClose,
  actions,
  cancelLabel = "Cancel",
  title,
  testId = "action-sheet",
}) => {
  const handleAction = (action: ActionSheetItem) => {
    if (action.disabled) return;
    action.onAction();
    onClose();
  };

  return (
    <MobileSheet
      open={open}
      onClose={onClose}
      snapPoints={[0.5]}
      dismissible={true}
      testId={testId}
    >
      <div className="pb-4">
        {title && (
          <div className="px-4 py-3 border-b border-border-secondary">
            <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          </div>
        )}

        <div className="py-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              disabled={action.disabled}
              className={classNames(
                "w-full px-4 py-3 text-left flex items-center gap-3",
                "transition-colors",
                action.destructive
                  ? "text-error-600 hover:bg-error-50"
                  : "text-text-primary hover:bg-bg-secondary",
                action.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {action.icon && (
                <span className="flex-shrink-0">
                  {typeof action.icon === "string" ? (
                    <img src={action.icon} alt="" className="w-5 h-5" />
                  ) : (
                    action.icon
                  )}
                </span>
              )}
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="px-4 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 text-center font-semibold text-text-primary bg-bg-secondary rounded-lg hover:bg-bg-secondary_hover transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </MobileSheet>
  );
};

export default ActionSheet;

