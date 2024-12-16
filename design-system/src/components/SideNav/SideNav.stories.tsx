import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge, TSideNavItem, SideNav as Nav } from "../../index";
import companyAvatar from "./icons/companyAvatar.svg";
import search from "./icons/search.svg";
import home from "./icons/home.svg";
import signal from "./icons/signal.svg";
import star from "../../assets/icons/star.svg";
import inbox from "./icons/inbox.svg";
import { ToastAlert } from "../ToastAlert";
import downarrow from "./icons/downarrow.svg";

export const navConfig: TSideNavItem[] = [
  {
    icon: search,
    label: "Search",
    onNavClick: () => {
      console.log("Button Clicked!!!");
    },
  },
  {
    icon: home,
    label: "Home",
    href: "/#",
  },
  {
    icon: inbox,
    label: "Inbox",
    href: "/#",
  },
  {
    icon: signal,
    label: "Access",
    href: "/",
    badge: (
      <Badge color="primary" icon={star}>
        Coming
      </Badge>
    ),
  },
  {
    icon: search,
    label: "Search",
    onNavClick: () => {
      console.log("Button Clicked!!!");
    },
  },
  {
    icon: home,
    label: "Home",
    href: "/#",
  },
  {
    icon: inbox,
    label: "Inbox",
    href: "/#",
  },
  {
    icon: signal,
    label: "Access",
    href: "/",
    badge: (
      <Badge color="primary" icon={star}>
        Coming
      </Badge>
    ),
  },
];

const getIsExpanded = (isExpanded: boolean) => {
  console.log("isExpanded", isExpanded);
};

const menuItems = [
  <img src={downarrow} alt="select" className="max-h-3 max-w-3" />,
];

const meta: Meta<typeof Nav> = {
  component: Nav,
  title: "designsystem/SideNav",
  tags: ["autodocs"],
  argTypes: {
    navItems: { control: "array" },
    menuItems: { control: "array" },
  },
  args: {
    getIsExpanded,
    navItems: [...navConfig],
    companyName: "Permitech",
    supportText: "Free Plan · 8 members",
    companyAvatarUrl: "https://permitech.s3.amazonaws.com/6569ae1b3ca0__[PROXY]",
    menuItems: menuItems,
    header: (
      <ToastAlert
        id={1}
        variant="success"
        message="Free Plan"
        description="Your team has used 8 out of 10 of your available seats. Need more?"
        onActionClick={() => {}}
        onClose={() => {}}
      />
    ),
    footer: (
      <ToastAlert
        id={1}
        variant="success"
        message="Free Plan"
        description="Your team has used 8 out of 10 of your available seats. Need more?"
        onActionClick={() => {}}
        onClose={() => {}}
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;
