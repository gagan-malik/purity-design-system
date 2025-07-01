import React, { FunctionComponent } from 'react';
import Icons from '../Icons/Icons';
import { ButtonV2 } from '../ButtonV2/ButtonV2';

export interface AICreditsPopoverProps {
  onClose?: () => void;
  usedCredits: number;
  availableCredits: number;
  onShowUsage: () => void;
  onUpgrade: () => void;
}

export const AICreditsPopover: FunctionComponent<AICreditsPopoverProps> = ({
  onClose,
  usedCredits,
  availableCredits,
  onShowUsage,
  onUpgrade
}) => {
  return (
    <div className="w-[302px] relative shadow-lg rounded-[24px] bg-bg-primary overflow-hidden flex flex-col items-start justify-start py-4 px-0 box-border text-left text-sm">
      <div className="self-stretch flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-start justify-start gap-4 w-full">
            {/* Header */}
            <div className="w-full flex flex-col items-start justify-start py-0 px-8">
              <div className="self-stretch text-text-primary leading-5 font-semibold">AI Credits</div>
            </div>

            {/* Credits Info */}
            <div className="self-stretch flex flex-col items-center justify-start py-0 px-4">
              {/* Used Credits */}
              <div className="self-stretch flex flex-row items-center justify-between">
                <div className="h-[52px] flex flex-col items-start justify-center py-0 px-4">
                  <div className="self-stretch text-text-primary leading-5 font-semibold">Used</div>
                </div>
                <div className="h-[52px] flex flex-col items-end justify-center py-0 px-8">
                  <div className="self-stretch text-text-primary leading-5 font-semibold">{usedCredits}</div>
                </div>
              </div>

              {/* Available Credits */}
              <div className="self-stretch flex flex-row items-center justify-between">
                <div className="h-[52px] flex flex-col items-start justify-center py-0 px-4">
                  <div className="self-stretch text-text-primary leading-5 font-semibold">Available</div>
                </div>
                <div className="h-[52px] flex flex-col items-end justify-center py-0 px-8">
                  <div className="self-stretch text-text-primary leading-5 font-semibold">{availableCredits}</div>
                </div>
              </div>

              {/* Show Usage Button */}
              <button 
                onClick={onShowUsage}
                className="self-stretch h-[42px] flex flex-row items-center justify-start py-px px-0 box-border hover:bg-bg-hover rounded-[24px] transition-colors"
              >
                <div className="flex-1 flex flex-col items-center justify-start py-[9px] px-4">
                  <div className="self-stretch flex flex-row items-center justify-start gap-2">
                    <Icons name="chart-breakout-square" size="sm" color="text-text-secondary" />
                    <div className="flex-1 h-6 flex flex-col items-start justify-center">
                      <div className="text-text-primary leading-5 font-medium">Show Usage</div>
                    </div>
                    <Icons name="chevron-right" size="sm" color="text-text-tertiary" />
                  </div>
                </div>
              </button>
            </div>

            {/* Upgrade Button */}
            <div className="self-stretch flex flex-col items-center justify-start px-4">
              <ButtonV2
                hierarchy="primary"
                size="xs"
                shape="rounded"
                onClick={onUpgrade}
                className="w-[276px] text-sm font-semibold"
              >
                Upgrade
              </ButtonV2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICreditsPopover; 