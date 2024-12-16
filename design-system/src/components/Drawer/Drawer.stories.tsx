import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "../../index";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: "designsystem/Drawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const TopDrawer: Story = {
  render: () => {
    const [openTop, setOpenTop] = useState(false);
    return (
      <div
        className="min-h-screen flex
      items-center justify-center flex-col"
      >
        <div
          className="rounded m-4
          bg-purple-400 w-40 h-10 flex
          items-center justify-center
          cursor-pointer"
          onClick={() => setOpenTop(!openTop)}
        >
          open top drawer
        </div>
        <Drawer
          open={openTop}
          side="top"
          setOpen={setOpenTop}
          children={<div>Top Drawer content</div>}
        />
      </div>
    );
  },
};

export const BottomDrawer: Story = {
  render: () => {
    const [openBottom, setOpenBottom] = useState(false);
    return (
      <div
        className="min-h-screen flex
    items-center justify-center flex-col"
      >
        <div
          className="rounded m-4
        bg-purple-400 w-40 h-10 flex
        items-center justify-center
        cursor-pointer"
          onClick={() => setOpenBottom(!openBottom)}
        >
          open bottom drawer
        </div>
        <Drawer
          open={openBottom}
          side="bottom"
          setOpen={setOpenBottom}
          children={<div>Down Drawer content</div>}
        />
      </div>
    );
  },
};

export const RightDrawer: Story = {
  render: () => {
    const [openRight, setOpenRight] = useState(false);
    return (
      <div
        className="min-h-screen flex
      items-center justify-center flex-col"
      >
        <div
          className="rounded m-4
          bg-purple-400 w-40 h-10 flex
          items-center justify-center
          cursor-pointer"
          onClick={() => setOpenRight(!openRight)}
        >
          open right drawer
        </div>
        <Drawer
          open={openRight}
          side="right"
          setOpen={setOpenRight}
          children={<div>Right Drawer content</div>}
        />
      </div>
    );
  },
};
