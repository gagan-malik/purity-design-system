import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TopBar } from "./TopBar";
import { ButtonV2 } from "../ButtonV2";
const meta: Meta<typeof TopBar> = {
  component: TopBar,
  title: "designsystem/TopBar",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const Base: Story = {
  args: {
    showBackButton: true,
    showBreadcrumb: true,
    showCreditCounter: true,
    showTitle: true,
    title: "Top Bar",
  },
};

export const Breadcrumb: Story = {
  args: {
    showBackButton: true,
    showBreadcrumb: true,
    showCreditCounter: true,
    breadcrumbs: [
      { label: "Home", onClick: () => {} },
      { label: "transcription_5c289791-596f-b9ff-4fa0-53b7e01170b2"},
      { label: "transcription_5c289791-596f-b9ff-4fa0-53b7e01170b2", onClick: () => {} },
    ],
    creditCounter: {
      totalCredits: 100,
      remainingCredits: 50,
      suffix: "daily AI credits left",
    },
    actionsOnRight: <ButtonV2 size="sm">Button</ButtonV2>,
    actionsOnLeft: <ButtonV2 size="sm">Button</ButtonV2>,
    showSideMenu: true,
    showSearchIcon: true,
    onSideMenuClick: () => {},
    onSearchIconClick: () => {},
    showProductTour: true,
    onProductTourClick: () => {},
    showNotificationIcon: true,
    onNotificationIconClick: () => {},
  },
};

export const Title: Story = {
    args: {
      showTitle: true,
      title: "Top Bar",
    },
  };
  
