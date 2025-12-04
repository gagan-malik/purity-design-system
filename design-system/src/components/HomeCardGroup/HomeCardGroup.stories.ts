import type { Meta, StoryObj } from "@storybook/react-webpack5";
import HomeCardGroup from "./HomeCardGroup";
import userImage from "../../assets/icons/ticketAvatar.svg";
import coverImage from "../../assets/icons/companyAvatar.svg";
import workspaceImage from "../../assets/icons/permitechPLogo.svg";
import { Draggable } from "../../index";
const meta: Meta<typeof HomeCardGroup> = {
  component: HomeCardGroup,
  title: "designsystem/HomeCardGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HomeCardGroup>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const CardOverview: Story = {
  args: {
    heading: "Test",
    isDraggable: true,
    data: [
      {
        title: "Test",
        subtitle: "HT-1",
        userAvatar: userImage,
        coverImage: coverImage,
        timestamp: "2024-06-27T10:34:28.000Z",
        firstName: "Md",
        lastName: "Saket",
        titleImage: coverImage,
        onCardClick: () => {
          window.alert("close clicked");
        },
      },
      {
        title: "Test",
        subtitle: "HT-1",
        userAvatar: userImage,
        coverImage: coverImage,
        timestamp: "2024-06-27T10:34:28.000Z",
        firstName: "Md",
        lastName: "Saket",
        titleImage: coverImage,
        onCardClick: () => {
          window.alert("close clicked");
        },
      },
      {
        title: "Test",
        subtitle: "HT-1",
        userAvatar: userImage,
        coverImage: coverImage,
        timestamp: "2024-06-27T10:34:28.000Z",
        firstName: "Md",
        lastName: "Saket",
        titleImage: coverImage,
        onCardClick: () => {
          window.alert("close clicked");
        },
      },
    ],
  },
};
