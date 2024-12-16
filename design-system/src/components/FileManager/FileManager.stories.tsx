import type { Meta, StoryObj } from "@storybook/react";
import {FileManager} from "."
import FolderIcon from "../../assets/icons/folder.svg"
import TripleDot from "../../assets/icons/tripleDots.svg"
import notificationAvatar from "../../assets/icons/notificationBellMobile.svg";
import {Button} from "../Button"
import { Avatar } from "../../index";
import React from "react";
import { MenuPopover, PopoverPlacement } from "../MenuPopover";
import userImage from "../../assets/icons/ticketAvatar.svg";

const meta: Meta<typeof FileManager> = {
  component: FileManager,
  title: "designsystem/FileManager",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileManager>;
const handleOptions = (option: string) => {
  console.log(`Option clicked: ${option}`);
};
export const GalleryOverview: Story = {
  args: {
    heading: "Folder",
    grid:3,
    view: "gallery",
    data: [
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      },{
        icon : FolderIcon,
        title: <span className="text-base font-semibold">My Spaces2</span>,
        description: <span className="text-sm font-normal">10 Files</span>,
        timestamp: "2024-06-26T10:34:28.000Z",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      },
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      },
      {
        icon : FolderIcon,
        title: "My Spaces4",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      }
    ],
  },
};
export const DocumentGalleryOverview: Story = {
  args: {
    heading: "Files",
    grid:3,
    view: "gallery",
    fileType: "document",
    data: [
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <MenuPopover
        children={
          <Button variant="outlined" color="label" shape="circle">
            <img src={TripleDot} alt="TripleDot" />
          </Button>
        }
        width="200px"
        placement={PopoverPlacement.bottomLeft}
        transform={{ left: -70 }}
        datas={[
          [
            {
              title: "Rename",
              hover: true,
              onClick: () => {
                handleOptions("rename");
              },
            },
            {
              title: "Delete ",
              hover: true,
              onClick: () => {
                handleOptions("delete");
              },
            }
          ],
        ]}
      />,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: notificationAvatar,
        }
      },{
        icon : FolderIcon,
        title: <span className="text-base font-semibold">My Spaces2</span>,
        description: <span className="text-sm font-normal">10 Files</span>,
        timestamp: "2024-06-26T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
        shape="circle"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: null,
        }
      },
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
        shape="circle"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      },
      {
        icon : FolderIcon,
        title: "My Spaces4",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      }
    ],
  },
};

export const ListOverview: Story = {
  args: {
    heading: "Folder",
    grid:2,
    view: "list",
    data: [
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: notificationAvatar,
        }
      },{
        icon : FolderIcon,
        title: <span className="text-base font-semibold">My Spaces2</span>,
        description: <span className="text-sm font-normal">10 Files</span>,
        timestamp: "2024-06-26T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
        shape="circle"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: null,
        }
      },
      {
        icon : FolderIcon,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
        shape="circle"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: null,
        }
      },
      {
        icon : FolderIcon,
        title: "My Spaces4",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        optionsDiv : <Button
        onClick={() => {}}
        variant="outlined"
        color="label"
      >
        <img src={TripleDot} alt="TripleDot" />
      </Button>,
        onClickHandler: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User11",
          avatar: null,
        }
      }
    ],
  },
};

export const MarketplaceOverview: Story = {
  args: {
    heading: "Templates",
    grid:3,
    view: "gallery",
    fileType: "marketplace",
    data: [
      {
        icon : <Avatar size="lg" imageUrl={userImage} />,
        title: "My Spaces",
        timestamp: "2024-06-27T10:34:28.000Z",
        button: "Get",
        onClickButton: () => {
          window.alert("Card clicked")
        },
        user: {
          fullname: "User",
          avatar: notificationAvatar,
        }
      },{
        icon : <Avatar size="xl" imageUrl={userImage} />,
        title: <span className="text-base font-semibold">My Spaces2</span>,
        description: <span className="text-sm font-normal">10 Files</span>,
        timestamp: "2024-06-26T10:34:28.000Z",
        button: "Get",
        user: {
          fullname: "User",
          avatar: null,
        }
      },
      {
        icon : <Avatar size="xl" imageUrl={userImage} />,
        title: "My Spaces",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        button: "Get",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      },
      {
        icon : <Avatar size="xl" imageUrl={userImage} />,
        title: "My Spaces4",
        description: "test",
        timestamp: "2024-06-27T10:34:28.000Z",
        button: "Get",
        onClickHandler: () => {
          window.alert("Card clicked")
        },
      }
    ],
  },
};