import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { MenuDrawer } from "../../index";

import star from "../../assets/icons/popover/star-filled.svg";
import bird from "../../assets/icons/popover/Birds.svg";
import cd from "../../assets/icons/popover/cd.svg";
import cloud from "../../assets/icons/popover/cloud.svg";

const meta: Meta<typeof MenuDrawer> = {
  component: MenuDrawer,
  title: "designsystem/Menu Drawer",
  tags: ["autodocs"],
};

const data1 = [
  [
    { heading: "STARRED" },
    { title: "Workspace", subHeading: "option", img: bird, badge: star },
    { title: "Music Dashboard", subHeading: "option", img: cd, badge: star },
    { title: "Cloud Kitcher", subHeading: "option", img: cloud, badge: star },
    { title: "Cloud Kitcher 4", subHeading: "option", img: cloud, badge: star },
    { title: "Cloud Kitcher 5", subHeading: "option", img: cloud, badge: star },
    { title: "Cloud Kitcher 6", subHeading: "option", img: cloud, badge: star },
  ],
  [{ title: "View all workspaces" }, { title: "Create workspace" }],
];

export default meta;
type Story = StoryObj<typeof MenuDrawer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

// Add comment here about base to show on doc
/* This Menu drawer which is wrapper over Drawer component */
export const menuDrawer: Story = {
  args: {
    datas: data1,
    childern: (
      <button style={{ background: "lightblue", padding: "5px" }}>Menu</button>
    ),
  },
};
