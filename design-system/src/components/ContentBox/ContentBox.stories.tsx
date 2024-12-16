import { Meta, StoryObj } from "@storybook/react";
import ContentBox from "./index";
import { useGlobals } from '@storybook/addons';
import React from "react";

const meta: Meta<typeof ContentBox> = {
  title: "designsystem/ContentBox",
  component: ContentBox,
  tags: ["autodocs"],
  args: {
    content:"test"
  },
};

export default meta;
type Story = StoryObj<typeof ContentBox>;

export const Base: Story = {
  args: {
  },
  render: (args) => {
    const [globals] = useGlobals(); 
    let theme = (globals.backgrounds.value == "#030712") ? "dark" : "light";
    return <ContentBox {...args} theme={theme}/>
  },
};

