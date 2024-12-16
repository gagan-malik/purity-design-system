import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar as Avtr } from "../../index";
import increase from "../../assets/icons/unassigned.svg";
import dummyAvatar from "../Comments/icons/notificationAvatar.svg";
import close from "../../assets/icons/close.svg";
import deleteRed from "../../assets/icons/deleteRed.svg";

const meta: Meta<typeof Avtr> = {
  component: Avtr,
  title: "designsystem/Avatar",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  args: {
    imageUrl:
      "https://static0.srcdn.com/wordpress/wp-content/uploads/2024/01/nezuko-smiling-and-saying-good-morning-in-the-demon-slayer-hashira-training-arc-official-trailer-by-crunchyroll.jpg",
    firstName: "Permi",
    lastName: "Tech",
  },
};
export const AvatarWithText: Story = {
  args: {
    firstName: "Permi",
    lastName: "Tech",
  },
};
export const AvatarWithIcon: Story = {
  args: {
    icon: close,
    background : "",
    size:"xs",
    fullName: "Permi Tech"
  },
};

export const AvatarWithIcon2: Story = {
  args: {
    icon: deleteRed,
    background : "bg-bg-avatar",
    size:"xxl",
    border:"none"
  },
};