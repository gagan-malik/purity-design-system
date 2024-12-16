import { Meta, StoryObj } from "@storybook/react";
import { BillingCard } from "./index";
import React from "react";
const meta: Meta<typeof BillingCard> = {
  title: "designsystem/BillingCard",
  component: BillingCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BillingCard>;

export const Base: Story = {
  args: {
    title: "Free Plan",
    description: "Free forever for 10 users",
    featuresTitle:"Includes",
    features: [
      "One workspaces and unlimited actions",
      "Reports",
      "Up to 5 team members",
      "Community support",
    ],
    isActive: true,
    totalUser: 10,
    activeUser: 8,
    button: <button className="text-blue-600 cursor-pointer">Manage Team</button>,
  },
};

export const DisabledBillingCard: Story = {
  args: {
    title: "Standard",
    description: "Free forever for 10 users",
    featuresTitle:"Everything from Free plus:",
    features: [
      "One workspaces and unlimited actions",
      "Reports",
      "Up to 5 team members",
      "Community support",
    ],
    isActive: false,
    totalUser: 10,
    activeUser: 8
  },
};

