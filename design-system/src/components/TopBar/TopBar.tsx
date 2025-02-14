import React from "react";
import { Icons } from "../Icons/Icons";
import { ButtonV2 } from "../ButtonV2";
export interface ITopBarBreadcrumb {
  label: string;
  onClick?: () => void;
}

export interface ITopBarCreditCounter {
  totalCredits: number;
  remainingCredits: number;
  onCreditCounterClick?: () => void;
  suffix?: string;
}

export interface ITopBarProps {
  showBackButton?: boolean;
  showBreadcrumb?: boolean;
  showCreditCounter?: boolean;
  showTitle?: boolean;
  actionsOnRight?: React.ReactNode;
  actionsOnLeft?: React.ReactNode;
  onBackButtonClick?: () => void;
  breadcrumbs?: ITopBarBreadcrumb[];
  creditCounter?: ITopBarCreditCounter;
  title?: React.ReactNode;
}

export const TopBar: React.FC<ITopBarProps> = ({
  showBackButton,
  showBreadcrumb,
  showCreditCounter,
  actionsOnRight,
  actionsOnLeft,
  onBackButtonClick,
  breadcrumbs,
  creditCounter,
  title,
  showTitle,
}) => {
  return (
    <div className="flex h-16 w-full bg-bg-primary_alt p-[var(--spacing-lg,12px)_var(--container-padding-desktop,32px)] items-center self-stretch">
      <div className="flex flex-row gap-4 justify-start items-center w-full">
      {showBackButton && (
        <ButtonV2
          hierarchy="tertiary"
          onClick={onBackButtonClick}
          iconLeadingSrc={<Icons name="chevron-left" size="sm" />}
          size="sm"
        >
          Back
        </ButtonV2>
      )}
    {actionsOnLeft}
      {showBreadcrumb && (
        <div className="flex flex-row">
          {breadcrumbs?.map((breadcrumb, index) => (
            <div key={index} className="flex flex-row items-center">
              <div
                className={`text-button-tertiaryFg flex flex-row items-center text-sm hover:bg-button-tertiaryBgHover rounded-full px-2 py-1 ${
                  index < breadcrumbs.length - 1
                    ? "font-medium"
                    : "font-semibold"
                }
                ${breadcrumb.onClick ? "cursor-pointer" : ""}
                `}
              >
                {breadcrumb.label}
              </div>
              {index < breadcrumbs.length - 1 && (
                <Icons
                  name="chevron-right"
                  size="xs"
                  color="text-button-tertiaryFg"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {showTitle && (
        <div className="flex-1 text-lg font-semibold text-text-primary">
          {title}
        </div>
      )}
      </div>

      <div className="flex flex-row gap-4 justify-end items-center w-full">
        {showCreditCounter && (
          <div className="flex flex-row items-center text-sm text-text-secondary font-medium">
            {creditCounter?.remainingCredits} of {creditCounter?.totalCredits} {creditCounter?.suffix || "daily AI credits left"}
          </div>
        )}
        {actionsOnRight}
      </div>
    </div>
  );
};
