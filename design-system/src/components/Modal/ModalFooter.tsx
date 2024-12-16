import React from "react";
import { Button, ButtonColor, ButtonVariant, ButtonShape } from "../Button";

interface IPropsModalFooter {
  onCancel: () => void;
  onShown?: () => void;
  closeActionLabel?: string;
  actionLabel?: string;
  disableAction?: boolean;
  cancelButtonVariant?: ButtonVariant;
  actionButtonVariant?: ButtonVariant;
  cancelButtonColor?: ButtonColor;
  actionButtonColor?: ButtonColor;
  cancelButtonShape?: ButtonShape;
  actionButtonShape?: ButtonShape;
}
const ModalFooter = (props: IPropsModalFooter) => {
  const {
    onCancel,
    onShown,
    closeActionLabel = "Cancel",
    actionLabel = "Save",
    disableAction,
    actionButtonVariant,
    actionButtonColor,
    actionButtonShape = "circle",
    cancelButtonVariant="outlined",
    cancelButtonColor = "secondary",
    cancelButtonShape = "circle",
  } = props;

  return (
    <div className="grid grid-cols-2 gap-x-4 w-full items-center justify-between mt-4">
      <Button
        variant={cancelButtonVariant}
        color={cancelButtonColor}
        onClick={onCancel}
        shape={cancelButtonShape}
      >
        {closeActionLabel}
      </Button>

      {onShown && (
        <Button
          variant={actionButtonVariant}
          color={actionButtonColor}
          disabled={disableAction}
          onClick={onShown}
          shape={actionButtonShape}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default ModalFooter;
