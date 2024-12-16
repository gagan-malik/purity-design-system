import React, { useState } from "react";
import AttachmentsClip from "../../assets/icons/attachmentsClip.svg";
import { Button } from "../Button";

interface IAssistantInputProps {
  showAttachmentIcon?: boolean;
  placeholderText?: string;
  onSend?: (text: string) => void;
  handleAttachment?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  scopeDropdown?: React.ReactNode;
  fileInfoDiv?: React.ReactNode;
  isSendDisabled?: boolean;
  showUpgradeButton?: boolean;
  upgradeMessage?: string;
  upgradeClick?: () => void
}

export const AssistantInput: React.FC<IAssistantInputProps> = ({
  showAttachmentIcon = true,
  placeholderText = "Ask or search for anything...",
  onSend,
  handleAttachment,
  scopeDropdown,
  fileInfoDiv,
  isSendDisabled = false,
  showUpgradeButton = false,
  upgradeMessage = "You are out of free daily assistant credits. Please wait 24 hours before trying again or consider upgrading for unlimited AI access.",
  upgradeClick
}) => {
  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleImageAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(e.target.files?.[0] || null);
    handleAttachment?.(e);
  }

  const handleSend = () => {
    if (onSend) {
      onSend(inputText);
    }
    setInputText("");
  };

  return (
    <>
      {showUpgradeButton ? (
        <div className="w-full mx-auto flex flex-col items-center border border-border-primary bg-bg-disabled rounded-3xl pl-2.5 px-3 py-3">
          <div className="p-2 text-text-primary">{upgradeMessage}</div>
          <div className="flex items-center w-full justify-end">
          <Button color="gradient" shape="circle" onClick={upgradeClick}>Get unlimited AI</Button>
          </div>
          
        </div>
      ) : (
        <div className="w-full mx-auto flex flex-col items-center border border-border-primary bg-bg-primary rounded-3xl pl-2.5 px-3 py-3">
          <textarea
            className="w-full flex-grow p-2 outline-none border-0 rounded-xl focus:outline-none focus:ring-0 text-base bg-bg-primary text-text-primary overflow-auto"
            placeholder={placeholderText}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                isSendDisabled ? null : handleSend();
              }
            }}
            rows={1}
            style={{ resize: "none", overflow: "hidden" }}
          />

          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              {showAttachmentIcon && !attachment && (
                <label
                  htmlFor="file-upload"
                  className="mr-1 cursor-pointer rounded-full p-1.5"
                >
                  <img
                    src={AttachmentsClip}
                    alt="Attachments clip"
                    className="w-6 object-cover"
                  />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageAttachment}
                  />
                </label>
              )}
              {attachment && (
                <div className="flex items-center">{fileInfoDiv}</div>
              )}
            </div>
            <div className="flex items-center">
              {scopeDropdown}
              <div className="pl-2 cursor-pointer">
                <div
                  className={`assistant-send-icon ${
                    isSendDisabled ? "disabled" : ""
                  }`}
                  role="img"
                  aria-label="Send AI Prompt Icon"
                  onClick={isSendDisabled ? undefined : handleSend}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistantInput;
