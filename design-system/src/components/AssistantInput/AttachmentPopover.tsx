import React, { FunctionComponent } from 'react';
import Icons from '../Icons/Icons';

export interface AttachmentPopoverProps {
  onClose?: () => void;
  onTakePicture?: () => void;
  onChooseImage?: () => void;
  onUploadFile?: () => void;
  onSelectDocument?: () => void;
  onAddFromDrive?: () => void;
  onAddIntegrations?: () => void;
}

export const AttachmentPopover: FunctionComponent<AttachmentPopoverProps> = ({
  onClose,
  onTakePicture,
  onChooseImage,
  onUploadFile,
  onSelectDocument,
  onAddFromDrive,
  onAddIntegrations
}) => {
  return (
    <div className="w-[302px] relative shadow-lg rounded-[24px] bg-bg-primary overflow-hidden flex flex-col items-start justify-start py-4 px-0 box-border text-left text-sm">
      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="w-full flex flex-col items-start justify-start gap-4">
            {/* Header */}
            <div className="self-stretch flex flex-col items-start justify-start py-0 px-8">
              <div className="self-stretch text-text-primary leading-5 font-semibold">Attach</div>
            </div>

            {/* Options List */}
            <div className="w-full flex flex-col items-start justify-start py-0 px-4 box-border">
              {/* Take Picture */}
              <button 
                onClick={onTakePicture}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex items-center gap-2 w-full">
                  <Icons name="video-recorder" size="sm" color="text-text-secondary" />
                  <span className="text-text-primary font-medium">Take a picture</span>
                </div>
              </button>

              {/* Choose Image */}
              <button 
                onClick={onChooseImage}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex items-center gap-2 w-full">
                  <Icons name="image-01" size="sm" color="text-text-secondary" />
                  <span className="text-text-primary font-medium">Choose image</span>
                </div>
              </button>

              {/* Upload File */}
              <button 
                onClick={onUploadFile}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-2">
                    <Icons name="paperclip" size="sm" color="text-text-secondary" />
                    <span className="text-text-primary font-medium">Upload a file</span>
                  </div>
                  <div className="pl-6 text-text-tertiary text-sm">
                    Attach PDF files up to 5MB
                  </div>
                </div>
              </button>

              {/* Select Document */}
              <button 
                onClick={onSelectDocument}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Icons name="bullet-list" size="sm" color="text-text-secondary" />
                    <span className="text-text-primary font-medium">Select a document</span>
                  </div>
                  <Icons name="chevron-right" size="sm" color="text-text-tertiary" />
                </div>
              </button>

              {/* Add from Drive */}
              <button 
                onClick={onAddFromDrive}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className="w-8 h-8 rounded-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url("/drive-icon.png")' }} />
                  <span className="text-text-primary font-medium">Add from Drive</span>
                </div>
              </button>

              {/* Add Integrations */}
              <button 
                onClick={onAddIntegrations}
                className="w-full h-[46px] flex items-center px-4 hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Icons name="Integrations" size="sm" color="text-text-secondary" />
                    <span className="text-text-primary font-medium">Add integrations</span>
                  </div>
                  <Icons name="chevron-right" size="sm" color="text-text-tertiary" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentPopover; 