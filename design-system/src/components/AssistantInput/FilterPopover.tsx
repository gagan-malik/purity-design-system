import React, { FunctionComponent } from 'react';
import Icons from '../Icons/Icons';

export interface FilterPopoverProps {
  onClose?: () => void;
  webSearchEnabled: boolean;
  onWebSearchToggle: () => void;
  reasoningEnabled: boolean;
  onReasoningToggle: () => void;
  onSelectAIModels: () => void;
}

export const FilterPopover: FunctionComponent<FilterPopoverProps> = ({
  onClose,
  webSearchEnabled,
  onWebSearchToggle,
  reasoningEnabled,
  onReasoningToggle,
  onSelectAIModels
}) => {
  return (
    <div className="w-[302px] relative shadow-lg rounded-[24px] bg-bg-primary overflow-hidden flex flex-col items-start justify-start py-4 px-0 box-border text-left text-sm">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start gap-4 w-full">
            {/* Header */}
            <div className="w-full flex flex-col items-start justify-start py-0 px-8">
              <div className="self-stretch text-text-primary leading-5 font-semibold">Filter</div>
            </div>

            {/* Options List */}
            <div className="w-full flex flex-col items-start justify-start py-0 px-4 box-border">
              {/* Web Search Toggle */}
              <div className="w-full flex flex-row items-center justify-start py-0 px-4 box-border">
                <div className="flex-1 rounded-[24px] flex flex-col items-center justify-start py-[9px] px-0">
                  <div className="self-stretch flex flex-row items-center justify-start gap-2">
                    <Icons name="search-lg" size="sm" color="text-text-secondary" />
                    <div className="self-stretch flex-1 flex flex-col items-start justify-center">
                      <div className="text-text-primary leading-5 font-medium">Enable Web search</div>
                    </div>
                    <button 
                      onClick={onWebSearchToggle}
                      className={`w-9 h-5 rounded-full transition-colors duration-200 ease-in-out p-0.5 ${
                        webSearchEnabled ? 'bg-button-primaryBg' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                          webSearchEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`} 
                      />
                    </button>
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start py-0 pl-6 pr-0">
                    <div className="flex-1 text-text-tertiary leading-5">Search across the internet</div>
                  </div>
                </div>
              </div>

              {/* Reasoning Toggle */}
              <div className="w-full flex flex-row items-center justify-start py-0 px-4 box-border">
                <div className="flex-1 rounded-[24px] flex flex-col items-center justify-start py-[9px] px-0">
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

              {/* AI Models Selection */}
              <button 
                onClick={onSelectAIModels}
                className="w-full flex flex-row items-center justify-start py-0 px-4 box-border hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex-1 rounded-[24px] flex flex-col items-center justify-start py-[9px] px-0">
                  <div className="self-stretch flex flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icons name="dataflow-03" size="sm" color="text-text-secondary" />
                      <div className="text-text-primary leading-5 font-medium">Select AI models</div>
                    </div>
                    <Icons name="chevron-right" size="sm" color="text-text-tertiary" />
                  </div>
                  <div className="self-stretch flex flex-row items-center justify-start py-0 pl-6 pr-0">
                    <div className="flex-1 text-text-tertiary leading-5">Choose best AI models</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopover; 