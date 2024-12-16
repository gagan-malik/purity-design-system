import { Meta, StoryObj } from "@storybook/react";
import { AlCreditsCard } from "./index";
import { Button } from "../Button";
  
import React from "react";
const meta: Meta<typeof AlCreditsCard> = {
  title: "designsystem/AlCreditsCard",
  component: AlCreditsCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlCreditsCard>;

export const Expended: Story = {
  args: {
    totalCredits: 100,
    usedCredits: 50,
    title: "AI credits left today",
    description: "Invite others to unlock more",
    button: <Button shape="circle" color="label" variant="outlined" textColor="text-text-brand-secondary">Refer a friend</Button>,
    isExpended: true
  },
};
export const Collapsed: Story = {
  args: {
    totalCredits: 100,
    usedCredits: 72,
    title: "AI credits left today",
    description: "For every referral who joins, you will unlock 25 extra daily AI queries.",
    button: <Button shape="circle">Refer a friend</Button>,
    isExpended: false
  },
};

export const CollapsedWithProgressCircle: Story = {
  args: {
    totalCredits: 100,
    usedCredits: 72,
    title: "AI credits left today",
    description: "For every referral who joins, you will unlock 25 extra daily AI queries.",
    button: <Button shape="circle">Refer a friend</Button>,
    isExpended: false,
    showProgressCircle: true
  },
};