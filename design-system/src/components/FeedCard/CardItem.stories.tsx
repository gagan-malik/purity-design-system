import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import companyAvatar from "../../assets/icons/companyAvatar.svg";

import Card from "./Card";
const meta: Meta<typeof Card> = {
  component: Card,
  title: "designsystem/CardItem",
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {
  args: {
    title: "Getting started",
    subtitle: "Getting started",
    icon: <img src={companyAvatar} className="w-8 h-8 rounded-full"  alt="company avatar" />,
    children: <div>Children</div>
  }
};
