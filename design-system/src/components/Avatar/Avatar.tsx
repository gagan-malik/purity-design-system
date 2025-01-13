import React from "react";

import xsOnline from "./icons/online/xs.svg";
import smOnline from "./icons/online/sm.svg";
import mdOnline from "./icons/online/md.svg";
import lgOnline from "./icons/online/lg.svg";
import xlOnline from "./icons/online/xl.svg";
import xxlOnline from "./icons/online/xxl.svg";

import xsOffline from "./icons/offline/xs.svg";
import smOffline from "./icons/offline/sm.svg";
import mdOffline from "./icons/offline/md.svg";
import lgOffline from "./icons/offline/lg.svg";
import xlOffline from "./icons/offline/xl.svg";
import xxlOffline from "./icons/offline/xxl.svg";

import xsBlueTick from "./icons/blueTick/xs.svg";
import smBlueTick from "./icons/blueTick/sm.svg";
import mdBlueTick from "./icons/blueTick/md.svg";
import lgBlueTick from "./icons/blueTick/lg.svg";
import xlBlueTick from "./icons/blueTick/lg.svg";
import xxlBlueTick from "./icons/blueTick/lg.svg";

import xsOrganization from "./icons/organization/xs.svg";
import smOrganization from "./icons/organization/sm.svg";
import mdOrganization from "./icons/organization/md.svg";
import lgOrganization from "./icons/organization/lg.svg";
import xlOrganization from "./icons/organization/lg.svg";
import xxlOrganization from "./icons/organization/lg.svg";

import { ToolTip } from "../ToolTip";

export interface AvatarProps {
  imageUrl?: string | null;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  border?: "default" | "focused" | "none";
  status?: "none" | "online" | "offline" | "blueTick" | "organization";
  icon?: string | null;
  background?: string | null;
  showTooltip?: boolean;
  tooltipText?: string;
  tooltipAlign?: "left" | "right" | "top" | "bottom";
}

const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  firstName,
  lastName,
  fullName,
  size = "md",
  border = "default",
  status = "none",
  icon,
  background,
  showTooltip = false,
  tooltipText,
  tooltipAlign = "bottom"
}) => {

  const fullNameInitials = (fullName: string) => {
    let temp = fullName.split(" ");
    if (temp.length > 1) {
      return `${temp[0][0]}${temp[temp.length-1][0]}`.toUpperCase();
    }
    return `${temp[0][0]}`.toUpperCase();
  };

  const initials =
    fullName ? fullNameInitials(fullName) : (firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : "");

  const imgSizeStyles = {
    xs: {
      default: "h-6 w-6 border border-solid border-borderAvatar",
      focused: "h-6 w-6 border-4 border-solid border-borderAvatarFocused",
      none: "h-6 w-6",
    },
    sm: {
      default: "h-8 w-8 border border-solid border-borderAvatar",
      focused: "h-8 w-8 border-4 border-solid border-borderAvatarFocused",
      none: "h-8 w-8",
    },
    md: {
      default: "h-10 w-10 border border-solid border-borderAvatar",
      focused: "h-10 w-10 border-4 border-solid border-borderAvatarFocused",
      none: "h-10 w-10",
    },
    lg: {
      default: "h-12 w-12 border border-solid border-borderAvatar",
      focused: "h-12 w-12 border-4 border-solid border-borderAvatarFocused",
      none: "h-12 w-12",
    },
    xl: {
      default: "h-14 w-14 border border-solid border-borderAvatar",
      focused: "h-14 w-14 border-4 border-solid border-borderAvatarFocused",
      none: "h-14 w-14",
    },
    xxl: {
      default: "h-16 w-16 border border-solid border-borderAvatar",
      focused: "h-16 w-16 border-4 border-solid border-borderAvatarFocused",
      none: "h-16 w-16",
    },
  };
  const svgSizeStyles = {
    xs: {
      default: "h-6 w-6 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-6 w-6 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-6 w-6 flex items-center justify-center",
    },
    sm: {
      default: "h-8 w-8 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-8 w-8 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-8 w-8 flex items-center justify-center",
    },
    md: {
      default: "h-10 w-10 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-10 w-10 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-10 w-10 flex items-center justify-center",
    },
    lg: {
      default: "h-12 w-12 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-12 w-12 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-12 w-12 flex items-center justify-center",
    },
    xl: {
      default: "h-14 w-14 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-14 w-14 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-14 w-14 flex items-center justify-center",
    },
    xxl: {
      default: "h-16 w-16 border border-solid border-borderAvatar flex items-center justify-center",
      focused: "h-16 w-16 border-4 border-solid border-borderAvatarFocused flex items-center justify-center",
      none: "h-16 w-16 flex items-center justify-center",
    },
  };
  const textSizeStyles = {
    xs: {
      default: "text-xs font-semibold",
      focused: "text-xs font-semibold",
      none: "text-xs font-semibold",
    },
    sm: {
      default: "text-sm font-semibold",
      focused: "text-sm font-semibold",
      none: "text-sm font-semibold",
    },
    md: {
      default: "text-base font-semibold",
      focused: "text-base font-semibold",
      none: "text-base font-semibold",
    },
    lg: {
      default: "text-lg font-semibold",
      focused: "text-lg font-semibold",
      none: "text-lg font-semibold",
    },
    xl: {
      default: "text-xl font-semibold",
      focused: "text-xl font-semibold",
      none: "text-xl font-semibold",
    },
    xxl: {
      default: "text-2xl font-semibold",
      focused: "text-2xl font-semibold",
      none: "text-2xl font-semibold",
    },
  };

  const statusUrl = {
    online: {
      xs: xsOnline,
      sm: smOnline,
      md: mdOnline,
      lg: lgOnline,
      xl: xlOnline,
      xxl: xxlOnline,
    },
    offline: {
      xs: xsOffline,
      sm: smOffline,
      md: mdOffline,
      lg: lgOffline,
      xl: xlOffline,
      xxl: xxlOffline,
    },
    blueTick: {
      xs: xsBlueTick,
      sm: smBlueTick,
      md: mdBlueTick,
      lg: lgBlueTick,
      xl: xlBlueTick,
      xxl: xxlBlueTick,
    },
    organization: {
      xs: xsOrganization,
      sm: smOrganization,
      md: mdOrganization,
      lg: lgOrganization,
      xl: xlOrganization,
      xxl: xxlOrganization,
    },
  };

  const avatarStyle = `rounded-full ${imgSizeStyles[size][border]}`;
  const iconStyle = `rounded-full ${svgSizeStyles[size][border]}`;
  const textStyles = `${imgSizeStyles[size][border]} text-fg-quaternary inline-flex items-center justify-center rounded-full ${background ? background : "bg-bg-tertiary"} uppercase ${textSizeStyles[size][border]}`;

  return (
    <>
    <ToolTip
              text={
                showTooltip && tooltipText ? tooltipText : ""
              }
              align={tooltipAlign}
              className={`${imgSizeStyles[size]["none"]}`}
            >
      <div className={`relative inline-block`}>
        {imageUrl ? (
          <div className={avatarStyle}>
            <img
              className="w-full h-full rounded-full object-cover"
              src={imageUrl}
              alt=""
            />
          </div>
        ) : icon ? <div className={`${iconStyle} ${background ? background : "bg-bg-tertiary"}`}>

              <img
              className="w-1/2	h-8/12 object-cover"
              src={icon}
              alt=""
            />
        </div>:(
          <div className={textStyles}>{initials}</div>
        )}
        {status !== "none" && (
          <img
            className="absolute bottom-0 right-0"
            src={statusUrl[status][size]}
            alt=""
          />
        )}
      </div>
      </ToolTip>
    </>
  );
};

export default Avatar;
