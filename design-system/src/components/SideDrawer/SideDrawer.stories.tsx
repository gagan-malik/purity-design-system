import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SideDrawer } from "../../index";


const meta: Meta<typeof SideDrawer> = {
  component: SideDrawer,
  title: "designsystem/SideDrawer",
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof SideDrawer>;

export const sideDrawer: Story = {
  args: {
    heading: "Activity",
    showCloseIcon: true,
    onCloseClick: () => {window.alert("closed Clicked ")},
    children: <div>Children</div>
  },
};


export const sideDrawerForChat: Story = {
  args: {
    children: <div>Children</div>
  },
};
