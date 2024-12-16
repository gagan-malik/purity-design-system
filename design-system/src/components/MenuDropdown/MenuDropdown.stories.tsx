import React from "react";
import MenuDropdown from "./MenuDropdown";
import { StoryObj } from "@storybook/react";

export default {
  component: MenuDropdown,
  title: "designsystem/MenuDropdown",
  tags: ["autodocs"],
  args: {},
};

type Story = StoryObj<typeof MenuDropdown>;

export const Base: Story = {
  args: {},
};
