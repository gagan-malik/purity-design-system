import type { Meta, StoryObj } from "@storybook/react";

import { ButtonV2 } from "./ButtonV2";
import { Icons } from "../Icons/Icons";

import Icon from "../../assets/icons/icon.svg";
import React from "react";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "designsystem/ButtonV2",
  tags: ["autodocs"],
  component: ButtonV2,
} satisfies Meta<typeof ButtonV2>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    hierarchy: "secondary",
    size: "md",
    shape: "rounded",
    children: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    hierarchy: "tertiary",
    size: "md",
    shape: "rounded",
    children: "Tertiary Button",
  },
};

export const Link: Story = {
  args: {
    hierarchy: "link",
    size: "md",
    shape: "rounded",
    children: "Link Button",
  },
};

export const DisabledPrimary: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    disabled: true,
    children: "Disabled Primary Button",
  },
};

export const WithLeadingIcon: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    iconLeadingSrc: Icon,
    children: "Button with Leading Icon",
    buttonColor: "bg-warning-500",
  },
};

export const WithTrailingIcon: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    iconTrailingSrc: Icon,
    children: "Button with Trailing Icon",
  },
};

export const IconOnly: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    iconOnly: true,
    iconLeadingSrc: Icon,
  },
};

export const LeadingIcon: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    iconLeadingSrc: Icon,
    children: "Leading Icon Button",
  },
};

export const TrailingIcon: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    shape: "rounded",
    iconTrailingSrc: Icon,
    children: "Trailing Icon Button",
  },
};

export const Gradient: Story = {
  args: {
    hierarchy: "gradient",
    size: "md",
    shape: "rounded",
    children: "Gradient Button",
    iconLeadingSrc: <Icons name="star-01" size="sm" color="text-white" />
  },
};