import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup as BG } from "../../index";
import React from "react";
import BasicButton from "../BasicButton";
import { Button } from "../../index";
import { BaseButton } from "../index";

const baseButtons = [
  <BasicButton text={"Day"} />,
  <BasicButton text={"Week"} active={true} />,
  <BasicButton text={"Month"} />,
];
const primaryButtons = [
  <Button>Day</Button>,
  <Button>Week</Button>,
  <Button>Month</Button>,
];
const basicButtons = [
  <BaseButton
    boder_left={true}
    selected={true}
    onClick={() => console.log("All Clicked")}
  >
    All
  </BaseButton>,
  <BaseButton>History</BaseButton>,
  <BaseButton>Comments</BaseButton>,
  <BaseButton boder_right={true}>Work Log</BaseButton>,
];

const meta: Meta<typeof BG> = {
  component: BG,
  title: "designsystem/ButtonGroup",
  tags: ["autodocs"],
  argTypes: {
    children: { contro: "array" },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof BG>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const BaseButtonGroup: Story = {
  args: {
    children: baseButtons,
  },
};

export const PrimaryButtonGroup: Story = {
  args: {
    children: primaryButtons,
  },
};

export const BasicButtonGroup: Story = {
  args: {
    variant: "stick",
    children: basicButtons,
  },
};
