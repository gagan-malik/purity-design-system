import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InfoContainer } from "../../index";
import homeIcon from "../../assets/icons/home.svg"
import Badge from "../Badge";
import star from "../../assets/icons/star.svg";

const meta: Meta<typeof InfoContainer> = {
  component: InfoContainer,
  title: "designsystem/InfoContainer",
  tags: ["autodocs"],
  args: {
    box:false,
    align:'center'
  },
};

export default meta;
type Story = StoryObj<typeof InfoContainer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const infoContainer: Story = {
  args: {
    icon :homeIcon,
    title: "My Title",
    subTitle:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

export const infoContainerWithoutIcon: Story = {
  args: {
    title: "My Title",
    subTitle:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

export const infoContainerWithButton: Story = {
  args: {
    icon :homeIcon,
    title: "My Title",
    subTitle:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    action: <button>Some Button</button>,
  },
};

export const infoContainerLeftAligned: Story = {
  args: {
    icon :homeIcon,
    title: "My Title",
    subTitle:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    align:"left",
    box:true,
    flag : <Badge color="primary" icon={star}>Coming Soon</Badge>,
    isDisabled:false,
    onClickHandler : () =>{
      window.alert("Card Clicked")
    }
  },
};