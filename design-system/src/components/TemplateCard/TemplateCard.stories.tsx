import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TemplateCard from "./TemplateCard";
import userImage from "../../assets/icons/ticketAvatar.svg";
import coverImage from "../../assets/icons/companyAvatar.svg";

import Badge from "../Badge";

const meta: Meta<typeof TemplateCard> = {
  component: TemplateCard,
  title: "designsystem/TemplateCard",
  tags: ["autodocs"],
  args: {
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof TemplateCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const CardOverview: Story = {
  args: {
    title: "Test",
    subtitle: "Supporting text with short description capped to 2 lines...",
    userAvatar: userImage,
    coverImage: coverImage,
    firstName: "Md",
    lastName: "Saket",
    onCardClick: () => {
      window.alert("close clicked");
    },
    flag: <Badge color="default">Free</Badge>,
  },
};

export const TemplateCardWithoutCover: Story = {
  args: {
    title: "Test2",
    subtitle: "HT-1",
    userAvatar: userImage,
    firstName: "Md",
    lastName: "Saket",
    onCardClick: () => {
      window.alert("close clicked");
    },
    isDisabled: true,
    flag: <Badge color="primary">Coming Soon</Badge>,
  },
};
