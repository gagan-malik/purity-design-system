import type { Meta, StoryObj } from "@storybook/react-webpack5";
import HomeCard from "./HomeCard";
import userImage from "../../assets/icons/ticketAvatar.svg"
import coverImage from "../../assets/icons/companyAvatar.svg"
import workspaceImage from "../../assets/icons/permitechPLogo.svg"
import React from "react";
import { Button } from "../Button/Button";
import TripleDot from "../../assets/icons/tripleDot.svg";
import Avatar from "../Avatar";

const meta: Meta<typeof HomeCard> = {
  component: HomeCard,
  title: "designsystem/HomeCard",
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof HomeCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const CardOverview: Story = {
  args: {
    title: "Confined Space Entry with Methane Gas Leak and Lack of Respiratory Protection",
    subtitle: "HT-1",
    userAvatar : userImage,
    coverImage : coverImage,
    timestamp:"2024-06-27T10:34:28.000Z",
    firstName:"Md",
    lastName:"Saket",
    titleImage:coverImage,
    onCardClick: () => {
      window.alert("close clicked");
    }
  }
};

export const HomeCardWithoutCover: Story = {
  args: {    
    title: "Test2",
    subtitle: "HT-1",
    userAvatar : userImage,
    timestamp:"2024-06-27T10:34:28.000Z",
    firstName:"Md",
    lastName:"Saket",
    titleImage:coverImage,
    onCardClick: () => {
      window.alert("close clicked");
    }
  }
};

export const HomeCardWithoutSubtitle: Story = {
  args: {    
    title: "Test2",
    userAvatar : "",
    timestamp:"2024-06-27T10:34:28.000Z",
    fullName:"Md Saket",
    titleImage:<Avatar fullName ="M Saket"></Avatar>,
    onCardClick: () => {
      window.alert("close clicked");
    },
    optionsDiv: <Button
    onClick={() => {}}
    variant="outlined"
    color="label"
    shape="circle"
  >
    <img src={TripleDot} alt="TripleDot" />
  </Button>
  }
};
