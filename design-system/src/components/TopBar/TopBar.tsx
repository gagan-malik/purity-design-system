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
  showSideMenu?: boolean;
  onSideMenuClick?: () => void;
  showSearchIcon?: boolean;
  onSearchIconClick?: () => void;
  showProductTour?: boolean;
  onProductTourClick?: () => void;
  showNotificationIcon?: boolean;
  onNotificationIconClick?: () => void;
  showHistoryIcon?: boolean;
  onHistoryIconClick?: () => void;
}

export const TopBar: React.FC<ITopBarProps> = ({
  showBackButton,
  showBreadcrumb,
  showCreditCounter,
  showSearchIcon,
  actionsOnRight,
  actionsOnLeft,
  onBackButtonClick,
  breadcrumbs,
  creditCounter,
  title,
  showTitle,
  showSideMenu,
  onSideMenuClick,
  onSearchIconClick,
  showProductTour,
  onProductTourClick,
  showNotificationIcon,
  onNotificationIconClick,
  showHistoryIcon,
  onHistoryIconClick,
}) => {
  return (
    <div className="flex h-16 w-full bg-bg-primary_alt p-[var(--spacing-lg,12px)_var(--container-padding-desktop,32px)] items-center self-stretch">
      <div className="flex flex-row gap-4 justify-start items-center w-full">
        {showSideMenu && (
          <div
            className="cursor-pointer"
            onClick={() => {
              onSideMenuClick?.();
            }}
          >
            <Icons name="sidebar-left" />
          </div>
        )}
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
                  className={`text-button-tertiaryFg flex flex-row items-center text-sm  rounded-full px-2 py-1 ${
                    index < breadcrumbs.length - 1
                      ? "font-medium"
                      : "font-semibold"
                  }
                ${
                  breadcrumb.onClick
                    ? "cursor-pointer hover:bg-button-tertiaryBgHover"
                    : ""
                }
                `}
                  onClick={breadcrumb.onClick ? breadcrumb?.onClick : undefined}
                >
                  <span className="line-clamp-1">{breadcrumb.label}</span>
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

      <div className="flex flex-row gap-3 justify-end items-center w-full">
        {showProductTour && (
          <ButtonV2
            size="sm"
            hierarchy="tertiary"
            onClick={() => {
              onProductTourClick?.();
            }}
            iconLeadingSrc={
              <Icons
                name="video-recorder"
                size="sm"
                color="text-button-tertiaryColorFg"
              />
            }
            textColor="text-button-tertiaryColorFg"
          >
            Take a tour
          </ButtonV2>
        )}

        {showCreditCounter && (
          <div className="flex gap-1 items-center text-sm text-text-secondary font-medium">
            <Icons name="star-01" size="sm" />
            {creditCounter?.remainingCredits} of {creditCounter?.totalCredits}{" "}
            {creditCounter?.suffix || "daily AI credits left"}
          </div>
        )}
        {showSearchIcon && (
          <ButtonV2
            size="sm"
            hierarchy="tertiary"
            iconLeadingSrc={<Icons name="search-sm" size="sm" />}
            iconOnly
            onClick={onSearchIconClick}
          ></ButtonV2>
        )}
        {showNotificationIcon && (
          <ButtonV2
            size="sm"
            hierarchy="tertiary"
            iconLeadingSrc={<Icons name="bell-02" size="sm" />}
            iconOnly
            onClick={onNotificationIconClick}
          ></ButtonV2>
        )}
        {showHistoryIcon && (
          <ButtonV2
            size="sm"
            hierarchy="tertiary"
            iconLeadingSrc={<Icons name="clock-stopwatch" size="sm" />}
            iconOnly
            onClick={onHistoryIconClick}
          ></ButtonV2>
        )}
        {actionsOnRight}
      </div>
    </div>
  );
};