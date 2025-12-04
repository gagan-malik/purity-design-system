import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PopoverPlacement, Popup } from "../../index";

const meta: Meta<typeof Popup> = {
  component: Popup,
  title: "designsystem/Popup",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Popup>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Base: Story = {
  args: { children: "Hover over me", popupText: <div style={{background:"#000", color:"#fff", padding: "20px"}}>"Thank you!"</div>, placement: PopoverPlacement.bottom },
};
