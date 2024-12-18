import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {PlayGround} from "./PlayGround"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PlayGround> = {
  component: PlayGround,
  title: "designsystem/PlayGround",
  tags: ["autodocs"],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Base: Story = {
  args: {
    playGround : 1
  },
};

export const Playground2: Story = {
  args: {
    playGround : 2
  },
};