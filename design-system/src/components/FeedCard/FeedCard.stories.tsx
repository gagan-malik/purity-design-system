import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FeedCard from "./FeedCard";
import  Avatar  from "../Avatar";
import close from "../../assets/icons/close.svg";
const meta: Meta<typeof FeedCard> = {
  component: FeedCard,
  title: "designsystem/FeedCard",
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof FeedCard>;

export const Base: Story = {
  args: {
    type :"getting started",
    title: "Getting started",
    progress: 20,
    steps: [
      {
        id: 1,
        step_name: "Step 1",
        isCompleted: false,
      },
      {
        id: 2,
        step_name: "Step 2",
        isCompleted: true,
      },
      {
        id: 3,
        step_name: "Step 3",
        isCompleted: false,
      },
      {
        id: 4,
        step_name: "Step 4",
        isCompleted: false,
      },
      {
        id: 5,
        step_name: "Step 5",
        isCompleted: false,
      },
    ],
  }
};

export const Report: Story = {
  args: {
    type: "report",
    title: "Report",
    viewAllClickHandler: () => {},
    reportItems: [
      {
        title: "To do",
        data: 30,
        percentageChange: 45,
      },
      {
        title: "In progress",
        data: 30,
        percentageChange: -45,
      },
      {
        title: "To do",
        data: 30,
        percentageChange: 45,
      },
      {
        title: "In progress",
        data: 30,
        percentageChange: -45,
      },
      {
        title: "To do",
        data: 30,
        percentageChange: 45,
      }
    ]
  }
}

export const Default: Story = {
  args: {
    type: "default",
    title: "Default",
    defaultItems: [
      {
        icon: <Avatar 
        icon={close}
        background =""
        size="xs"
        border="none"
        />,
        title: "Type 1",
        date: "2025-01-11T00:00:00Z",
        dateType: "default",
        onClickHandler: () => {}
      },
      {
        icon: <Avatar icon={close} background="" size="xs" border="none" />,
        title: "Type 2",
        date: "2025-01-11T00:00:00Z",
        dateType: "overdue",
        children: <div>Hello</div>,
        onClickHandler: () => {}
      },
      {
        icon: <Avatar icon={close} background="" size="xs" border="none" />,
        title: "Type 3",
        onClickHandler: () => {}
      },
      {
        icon: <Avatar icon={close} background="" size="xs" border="none" />,
        title: "Type 4",
        children: <Avatar imageUrl="https://static0.srcdn.com/wordpress/wp-content/uploads/2024/01/nezuko-smiling-and-saying-good-morning-in-the-demon-slayer-hashira-training-arc-official-trailer-by-crunchyroll.jpg" 
        size="xs" 
        border="none"/>,
        onClickHandler: () => {alert("clicked")}
      },
      {
        title: "Type 5",
        children: <div className="text-xs font-medium text-text-secondary">Children</div>,
        onClickHandler: () => {}
      },
    ],
    viewAllClickHandler: () => {}
  }
}