import { Meta, StoryObj } from "@storybook/react";
import { AssistantInput } from "./AssistantInput";
import React from "react";

const meta: Meta<typeof AssistantInput> = {
  title: "designsystem/AssistantInput",
  component: AssistantInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AssistantInput>;

export const Base: Story = {
  args: {
    showAttachmentIcon: true,
    placeholderText: "Ask or search for anything...",
    onSend: (text) => alert(`Sent: ${text}`),
  },
};

export const DisabledSend: Story = {
  args: {
    isSendDisabled: true,
    showAttachmentIcon: true,
    placeholderText: "Ask or search for anything...",
    onSend: (text) => alert(`Sent: ${text}`),
  },
};

export const ShowUpgrade: Story = {
  args: {
    isSendDisabled: true,
    showAttachmentIcon: true,
    placeholderText: "Ask or search for anything...",
    onSend: (text) => alert(`Sent: ${text}`),
    showUpgradeButton:true,
    upgradeMessage: "You are out of free daily assistant credits. Please wait 24 hours before trying again or consider upgrading for unlimited AI access.",
    upgradeClick: () => alert("test")
  },
};

export const WithAttachmentIcon: Story = {
  args: {
    showAttachmentIcon: true,
    placeholderText: "Type your message...",
    onSend: (text) => alert(`Sent: ${text}`),
  },
};

export const WithoutAttachmentIcon: Story = {
  args: {
    showAttachmentIcon: false,
    placeholderText: "Type your message...",
    onSend: (text) => alert(`Sent: ${text}`),
  },
};
