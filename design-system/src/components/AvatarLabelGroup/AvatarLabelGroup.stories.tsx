import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AvatarLabelGroup as ALG } from "../../index";

const meta: Meta<typeof ALG> = {
  component: ALG,
  title: "designsystem/AvatarLabelGroup",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarLabelGroup: Story = {
  args: {
    imageUrl:
      "https://static0.srcdn.com/wordpress/wp-content/uploads/2024/01/nezuko-smiling-and-saying-good-morning-in-the-demon-slayer-hashira-training-arc-official-trailer-by-crunchyroll.jpg",
    firstName: "Permi",
    lastName: "Tech",
    title: "Olivia Rhye",
    description: "olivia@untitledui.com",
  },
};
export const AvatarWithText: Story = {
  args: {
    firstName: "Olivia",
    lastName: "Rhye",
    title: "Olivia Rhye",
    description: "olivia@untitledui.com",
  },
};
