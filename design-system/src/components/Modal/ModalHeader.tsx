import React from "react";
import closeIcon from "../../assets/icons/alert/close.svg";
import {Button} from "../Button/Button";

interface IPropsModalFooter {
  title: string;
  description?: string;
  highlightDescription?: boolean;
  headerIconUrl?: string | React.ReactNode;
  onCancel?: () => void;
  showCrossIcon?: boolean;
}

const ModalHeader = (props: IPropsModalFooter) => {
  const {
    title,
    description,
    highlightDescription = false,
    headerIconUrl,
    onCancel,
    showCrossIcon = false,
  } = props;
  return (
    <div className="w-full">
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col items-start gap-y-2">
          <div className="my-1">
            {headerIconUrl && typeof headerIconUrl === 'string' ? <img src={headerIconUrl} alt="" /> : headerIconUrl}
          </div>
          <p className="text-lg font-semibold text-text-primary">{title}</p>
        </div>

        {showCrossIcon && (
          <Button
            variant="outlined"
            color="label"
            shape="circle"
            size="mini"
            imgSrc = {closeIcon}
            onClick={onCancel} 
          >
          </Button>
        )}
      </div>
      {description && (
        <p className="font-normal text-sm text-[#6E7781] my-1">
          {description}
          {highlightDescription && (
            <span className="text-text-error-primary">*</span>
          )}
        </p>
      )}
    </div>
  );
};

export default ModalHeader;
