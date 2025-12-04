import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Comments as Cmts } from "../index";
import notificationAvatar from "./icons/notificationAvatar.svg";
import { useGlobals } from '@storybook/addons';
import React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Cmts> = {
  component: Cmts,
  title: "designsystem/Comments",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    data: [
      {
        avatar: notificationAvatar,
        first_name: "Lana",
        last_name: "Steiner",
        description: "Invited Alisa Hester to the team",
        created_at: "2024-06-27T17:23:49.000Z",
      },
      {
        avatar: null,
        first_name: "Demi",
        last_name: "Wikinson",
        description: "Invited Alisa Hester to the team",
        created_at: "2024-06-27T17:23:49.000Z",
      },
      {
        avatar: notificationAvatar,
        first_name: "Candice",
        last_name: "Wu",
        description: "Commented in Marketing site redesign",
        created_at: "2024-06-27T17:23:49.000Z",
      },
      {
        avatar: notificationAvatar,
        first_name: "Natali",
        last_name: "Craig",
        description: "Added 3 labels to the project Marketing site redesign",
        created_at: "2024-06-30T07:22:34.000Z",
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Comments: Story = {
  args: {},
  render: (args) => {
    const [globals] = useGlobals(); 
    let theme = (globals?.backgrounds?.value == "#030712") ? "dark" : "light";
    return <Cmts {...args} theme={theme}/>
  },
};
