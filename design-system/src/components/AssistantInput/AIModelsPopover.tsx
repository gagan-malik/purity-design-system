import React, { FunctionComponent } from 'react';
import Icons from '../Icons/Icons';

export interface AIModelsPopoverProps {
  onClose?: () => void;
  reasoningEnabled: boolean;
  onReasoningToggle: () => void;
  selectedModel?: string;
  onModelSelect: (model: string) => void;
}

export const AIModelsPopover: FunctionComponent<AIModelsPopoverProps> = ({
  onClose,
  reasoningEnabled,
  onReasoningToggle,
  selectedModel = 'auto',
  onModelSelect
}) => {
  return (
    <div className="w-[302px] relative shadow-lg rounded-[24px] bg-bg-primary overflow-hidden flex flex-col items-start justify-start py-4 px-0 box-border text-left text-sm">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start gap-4 w-full">
            {/* Header */}
            <div className="w-full flex flex-col items-start justify-start py-0 px-8">
              <div className="self-stretch text-text-primary leading-5 font-semibold">AI Models</div>
            </div>

            {/* Options List */}
            <div className="w-full flex flex-col items-start justify-start">
              {/* Reasoning Toggle */}
              <div className="w-full flex flex-row items-center justify-start py-0 px-4 box-border">
                <div className="flex-1 rounded-[24px] flex flex-col items-center justify-start py-[9px] px-4">
                  <div className="self-stretch flex flex-row items-center justify-start gap-2">
                    <Icons name="chart-breakout-square" size="sm" color="text-text-secondary" />
                    <div className="self-stretch flex-1 flex flex-col items-start justify-center">
                      <div className="text-text-primary leading-5 font-medium">Enable Reasoning</div>
                    </div>
                    <button 
                      onClick={onReasoningToggle}
                      className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                        reasoningEnabled ? 'bg-button-primaryBg' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                          reasoningEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`} 
                      />
                    </button>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start py-0 pl-6 pr-0">
                    <div className="flex-1 text-text-tertiary leading-5">Handles complex tasks with higher accuracy</div>
                  </div>
                </div>
              </div>

              {/* Auto-select Option */}
              <div className="w-full flex flex-row items-center justify-start py-0 px-4 box-border">
                <button 
                  onClick={() => onModelSelect('auto')}
                  className={`flex-1 rounded-[24px] flex flex-row items-center justify-start py-2.5 px-4 gap-2 hover:bg-bg-hover transition-colors ${
                    selectedModel === 'auto' ? 'bg-bg-hover' : ''
                  }`}
                >
                  <div className="flex-1 flex flex-row items-center justify-start">
                    <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                      <div className="text-text-primary leading-5 font-medium">Auto-select</div>
                      <div className="text-text-tertiary leading-5">Best model for each query</div>
                    </div>
                  </div>
                  {selectedModel === 'auto' && (
                    <Icons name="check-done-01" size="sm" color="text-text-secondary" />
                  )}
                </button>
              </div>

              {/* Model Options */}
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div key={index} className="w-full flex flex-row items-center justify-start py-0 px-4 box-border">
                  <button 
                    onClick={() => onModelSelect(`model-${index}`)}
                    className={`flex-1 rounded-[24px] flex flex-col items-start justify-start py-2.5 px-4 hover:bg-bg-hover transition-colors ${
                      selectedModel === `model-${index}` ? 'bg-bg-hover' : ''
                    }`}
                  >
                    <div className="self-stretch flex flex-row items-center justify-start">
                      <div className="self-stretch flex-1 flex flex-col items-start justify-start">
                        <div className="text-text-primary leading-5 font-medium">Model name</div>
                        <div className="text-text-tertiary leading-5">Company name's latest model</div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelsPopover; 