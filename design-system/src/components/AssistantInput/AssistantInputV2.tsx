import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import Icons from '../Icons/Icons';
import { Button } from '../Button';
import { ButtonV2 } from '../ButtonV2/ButtonV2';


export interface AssistantInputV2Props {
  // Text Input Controls
  placeholderText?: string;
  onSend?: (text: string) => void;
  isSendDisabled?: boolean;
  value?: string;
  defaultValue?: string;
  onInputChange?: (text: string) => void;
  maxHeight?: number;

  // Button Click Handlers
  onAttachClick?: () => void;
  onFilterClick?: () => void;
  onCreditsClick?: () => void;
  onAgentClick?: () => void;

  // Attachment Controls
  showAttachmentIcon?: boolean;
  handleAttachment?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInfoDiv?: React.ReactNode;

  // Voice Recording Controls
  showVoiceRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  onCancelRecording?: () => void;
  isRecording?: boolean;
  isProcessing?: boolean;

  // Display Values (read-only for display)
  webSearchEnabled?: boolean;
  reasoningEnabled?: boolean;
  selectedModel?: string;
  usedCredits?: number;
  availableCredits?: number;
  selectedAgent?: { name: string; handle: string };

  // Upgrade Controls
  showUpgradeButton?: boolean;
  upgradeMessage?: string;
  onShowUsage?: () => void;
  onUpgrade?: () => void;
  upgradeClick?: () => void;

  // Style Customization
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export const AssistantInputV2: FunctionComponent<AssistantInputV2Props> = ({
  // Text Input Controls
  placeholderText = "Write something, or press '@' for helpers, '/' for workflows",
  onSend,
  isSendDisabled = false,
  value,
  defaultValue = "",
  onInputChange = () => {},
  maxHeight = 224,

  // Button Click Handlers
  onAttachClick = () => {},
  onFilterClick = () => {},
  onCreditsClick = () => {},
  onAgentClick = () => {},

  // Attachment Controls
  showAttachmentIcon = true,
  handleAttachment,
  fileInfoDiv,

  // Voice Recording Controls
  showVoiceRecording = true,
  onStartRecording = () => {},
  onStopRecording = () => {},
  onCancelRecording = () => {},
  isRecording,
  isProcessing = false,

  // Display Values
  webSearchEnabled = false,
  reasoningEnabled = false,
  selectedModel = 'auto',
  usedCredits = 90,
  availableCredits = 100,
  selectedAgent,

  // Upgrade Controls
  showUpgradeButton = false,
  upgradeMessage = "You are out of free daily assistant credits. Please wait 24 hours before trying again or consider upgrading for unlimited AI access.",
  onShowUsage = () => {},
  onUpgrade = () => {},
  upgradeClick,

  // Style Customization
  className = "",
  inputClassName = "",
  buttonClassName = ""
}) => {
  const [inputText, setInputText] = useState(value ?? defaultValue);
  const [attachment, setAttachment] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes with internal state
  useEffect(() => {
    if (value !== undefined) {
      setInputText(value);
    }
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
      textarea.style.overflowX = 'hidden';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachment(e.target.files?.[0] || null);
    if (handleAttachment) handleAttachment(e);
  };

  const handleSend = () => {
    if (onSend) onSend(inputText);
    setAttachment(null);
    setInputText("");
  };

  if (showUpgradeButton) {
    return (
      <div className="relative w-full flex flex-col gap-[21px]">
        {/* Main container - overall width 326x49 */}
        <div className="w-full shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-[32px] bg-gray-100 dark:bg-gray-900 flex flex-row items-center justify-start p-4 box-border">
          {/* This p-4 adds 16px padding all around */}
          <div className="self-stretch flex-1 flex flex-col items-start justify-center pt-2 px-0 pb-0 gap-2">
            {/* Input container */}
            <div className="w-full flex flex-col items-start justify-start">
              {/* Textarea - needs padding adjustment to match: left:12px, right:22px, top:8px, bottom:8px */}
              <textarea
                ref={textareaRef}
                className="relative leading-6 w-full min-h-[48px] py-0 bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                value={upgradeMessage}
                readOnly
                rows={1}
              />
            </div>
            <div className="self-stretch flex flex-row items-center justify-between gap-0 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center gap-3 flex-wrap">
                    <button
                      onClick={onAttachClick}
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
                    >
                      <Icons name="plus" size="sm" color="text-gray-600 dark:text-gray-400" />
                      <div className="flex flex-row items-center justify-center py-0 px-0.5 max-sm:hidden">
                        <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">Attach</div>
                      </div>
                    </button>
                    <button
                      onClick={onFilterClick}
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
                    >
                      <Icons name="filter-lines" size="sm" color="text-gray-600 dark:text-gray-400" />
                      <div className="flex flex-row items-center justify-center py-0 px-0.5 max-sm:hidden">
                        <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">Filter</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-2 text-gray-400 dark:text-gray-500">
                <div className="rounded-full h-8 overflow-hidden flex flex-row items-center justify-center py-2 px-3 box-border gap-1">
                  <Icons name="star-01" size="sm" />
                  <div className="flex flex-row items-center justify-center py-0 px-0.5">
                    <div className="relative leading-5 font-semibold">100/100</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start">
                  <ButtonV2
                    onClick={upgradeClick}
                    size="md"
                    hierarchy="primary"
                    shape="rounded"
                  >
                    Upgrade now
                  </ButtonV2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full flex flex-col gap-[21px] ${className}`}>
      {/* Main container - overall width 326x49 */}
      <div className="w-full shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-[32px] bg-gray-100 dark:bg-gray-900 flex flex-row items-center justify-start p-4 box-border">
        {/* This p-4 adds 16px padding all around */}
        <div className="self-stretch flex-1 flex flex-col items-start justify-center pt-2 px-0 pb-0 gap-2">
          {/* Input container */}
          <div className="w-full flex flex-col items-start justify-start">
            {/* Textarea - needs padding adjustment to match: left:12px, right:22px, top:8px, bottom:8px */}
            <textarea
              ref={textareaRef}
              className={`relative leading-6 w-full min-h-[48px] py-0 bg-transparent border-none outline-none focus:outline-none focus-visible:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent ${inputClassName}`}
              placeholder={placeholderText}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                onInputChange(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  isSendDisabled ? null : handleSend();
                }
              }}
              rows={1}
            />
          </div>
          <div className="self-stretch flex flex-row items-center justify-between gap-0 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-row items-center justify-start gap-2">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-3 flex-wrap">
                  {showAttachmentIcon && (
                    <>
                      <button
                        onClick={onAttachClick}
                        className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
                      >
                        <Icons name="plus" size="sm" color="text-gray-600 dark:text-gray-400" />
                        <div className="flex flex-row items-center justify-center py-0 px-0.5 max-sm:hidden">
                          <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">Attach</div>
                        </div>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleImageAttachment}
                        className="hidden"
                        id="file-upload"
                      />
                    </>
                  )}
                  {attachment && fileInfoDiv}
                  <button
                    onClick={onFilterClick}
                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
                  >
                    <Icons name="filter-lines" size="sm" color="text-gray-600 dark:text-gray-400" />
                    <div className="flex flex-row items-center justify-center py-0 px-0.5 max-sm:hidden">
                      <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">Filter</div>
                    </div>
                  </button>
                  <div className="flex flex-row items-center justify-start">
                    <button
                      onClick={onAgentClick}
                      className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
                    >
                      <div className="flex flex-row items-center justify-center py-0 px-0.5">
                        <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">
                          {selectedAgent?.name || "Presto"}
                        </div>
                      </div>
                      <Icons name="chevron-down" size="sm" color="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2">
              <button
                onClick={onCreditsClick}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 overflow-hidden flex flex-row items-center justify-center py-2 px-3 gap-1"
              >
                <Icons name="star-01" size="sm" color="text-gray-600 dark:text-gray-400" />
                <div className="flex flex-row items-center justify-center py-0 px-0.5">
                  <div className="relative leading-5 font-semibold text-gray-600 dark:text-gray-400">{usedCredits}/{availableCredits}</div>
                </div>
              </button>
              <div className="flex flex-row items-center justify-start">
                <ButtonV2
                  onClick={
                    inputText.trim() || attachment 
                      ? handleSend 
                      : isRecording 
                        ? onStopRecording
                        : isProcessing 
                          ? undefined // Don't allow clicks during processing
                          : onStartRecording
                  }
                  size="md"
                  hierarchy="primary"
                  shape="rounded"
                  disabled={isSendDisabled || isProcessing}
                >
                  {inputText.trim() || attachment ? (
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-[-90deg]"
                    >
                      <path 
                        d="M4.16675 9.99996H15.8334M15.8334 9.99996L10.0001 4.16663M15.8334 9.99996L10.0001 15.8333" 
                        stroke="currentColor" 
                        strokeWidth="1.66667" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : isRecording ? (
                    // Recording state - show stop icon
                    <div className="w-2.5 h-2.5 bg-white rounded-none" />
                  ) : isProcessing ? (
                    // Processing state - show spinner
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    // Default state - show microphone
                    <Icons name="microphone-01" size="sm" color="text-white" />
                  )}
                </ButtonV2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 