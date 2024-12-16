import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Badge as Bdge } from "../../index";
import increase from "../../assets/icons/increase.svg";
import flagIcon from "./icons/flag.svg";

const meta: Meta<typeof Bdge> = {
  component: Bdge,

  title: "designsystem/Badge",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "Label",
    icon: flagIcon,
    color: "important",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: {},
};
