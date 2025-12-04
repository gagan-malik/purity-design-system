import React from "react";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DropdownDataProps, MenuPopover, PopoverPlacement,Avatar,Badge } from "../../index";
import star from "../../assets/icons/popover/star-filled.svg";
import bird from "../../assets/icons/popover/Birds.svg";
import cd from "../../assets/icons/popover/cd.svg";
import cloud from "../../assets/icons/popover/cloud.svg";
import avatar from "../../assets/icons/popover/Avatar.svg";
import account from "../../assets/icons/popover/account.svg";
import logout from "../../assets/icons/popover/logout.svg";
import userImage from "../../assets/icons/ticketAvatar.svg";

const data1 = [
  [
    { heading: "STARRED" },
    { title: "Workspace", subHeading: "option", img: bird, badge: star },
    { title: "Music Dashboard", subHeading: "option", img: cd, badge: star },
    {
      title: "Cloud Kitcher",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
    },
    {
      title: "Cloud Kitcher 2",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
      hover: true, 
    },
    {
      title: "Cloud Kitcher 3",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
    },
    {
      title: "Cloud Kitcher 4",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
    },
    {
      title: "Cloud Kitcher 5",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
    },
    {
      title: "Cloud Kitcher 6",
      subHeading: "option",
      img: cloud,
      badge: star,
      underline: true,
      onClick: () => console.log("clicked"),
      hover: true, 
    },
  ],
  [{ title: "View all workspaces" }, { title: "Create workspace" }],
];

const data2 = [
  [
    { heading: "ACCOUNT" },
    {
      title: "Olivia Rhyde",
      subHeading: "olivia@untitledui.com",
      img: avatar,
      underline: true,
    },
    { title: "Manage Account", img: account, underline: true, hover: true }, 
    { heading: "UPGRADE" },
    {
      title: "Try the Pro plan",
      badge: (
        <div className="bg-blue-600 px-2 rounded-sm text-white">
          Free 30 day trial
        </div>
      ),
    },
    { title: "Logout", img: logout, hover: true }, 
  ],
];
const data3 = [
  [
    { heading: "ACCOUNT" },
    {
      title: "Olivia Rhyde",
      subHeading: "olivia@untitledui.com",
      img: avatar,
      underline: true,
    },
    { title: "Manage Account", img: account, underline: true },
    { heading: "UPGRADE" },
    {
      title: "Try the Pro plan",
      badge: (
        <div className="bg-blue-600 px-2 rounded-sm text-white">
          Free 30 day trial
        </div>
      ),
    },
    { title: "Logout", img: logout },
  ],
];
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "designsystem/MenuPopover",
  component: MenuPopover,
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof MenuPopover>;

// const meta: Meta<typeof MetricItem> = {
//   component: MetricItem,
//   title: "designsystem/MetricItem",
//   tags: ["autodocs"],
//   argTypes: {},
//   args: {
//     data: 18,
//   },
// };


export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const workspace: Story = {
  args: {
    datas: data1,
    children: (
      <button className="bg-indigo-500 px-4 py-1.5 border rounded text-white">
        Click me
      </button>
    ),
    placement: PopoverPlacement.right,
    transform: { top: 280 },
  },
};

export const Primary: Story = {
  args: {
    datas: data2,
    children: (
      <button className="bg-indigo-500 px-4 py-1.5 border rounded text-white align-center">
        Click me
      </button>
    ),
    placement: PopoverPlacement.bottomRight,
    transform: { left: 140 },
  },
};
export const Secondary: Story = {
  args: {
    datas: data3,
    children: (
      <button className="bg-indigo-500 px-4 py-1.5 border rounded text-white align-center">
        Click me
      </button>
    ),
    placement: PopoverPlacement.topRight, // Set placement to top right
    transform: {left : 500, top: 500 }, // Adjust transform if needed for fine-tuning
  },
};
const dataforDropdown = [
  {
    title: "Place Holder",
    onClick: () => console.log("Profile clicked"),
    selected: false,
    type: "avatar",
    state: "default",
    category: "menu",
    icon: logout,
  },
  {
    title: "Place Holder",
    onClick: () => console.log("Settings clicked"),
    selected: true,
    type: "icon",
    state: "default",
    category: "menu",
  },
  {
    title: "Place Holder",
    onClick: () => console.log("Logout clicked"),
    selected: false,
    type: "default",
    state: "default",
    category: "list",
    description: "Upgrade your account to access more features",
    badge: <Badge>Upgrade</Badge>
  },
  {
    title: "Place Holder",
    onClick: () => console.log("Logout clicked"),
    selected: false,
    type: "default",
    state: "disabled",
    category: "list",
  },
  {
    title: "Place Holder",
    onClick: () => console.log("Logout clicked"),
    selected: false,
    type: "icon",
    state: "default",
    category: "list",
    icon: <Avatar size="xs" border="none" imageUrl={userImage} />,
  },
];
export const Dropdown: Story = {
  args: {
    children: (
      <button className="bg-indigo-500 px-4 py-1.5 border rounded text-white">
        Click me
      </button>
    ),
    placement: PopoverPlacement.bottomRight,
    transform: { left: 180 },
    dropdownData: [...dataforDropdown as DropdownDataProps[],...dataforDropdown as DropdownDataProps[]],
    containerClass: "bg-bg-primary m-2 max-h-80 overflow-y-auto" ,
  },
};
