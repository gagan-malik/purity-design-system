import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import React from "react";

const meta: Meta<typeof Alert> = {
  title: "designsystem/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Base: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "error",
  },
};
export const Warning: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "warning",
  },
};
export const Info: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "info",
  },
};
export const Success: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "success",
  },
};
export const Transparent: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "transparent",
  },
};

export const Primary: Story = {
  args: {
    message: "This is an alert message",
    onClose: () => alert("Close"),
    alertType: "primary",
  },
};

