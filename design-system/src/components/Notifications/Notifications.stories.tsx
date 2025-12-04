import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Notifications as Notif } from "../index";
import notificationAvatar from "./icons/notificationAvatar.svg";
import React from "react";
import FileInfo, { IfileInfo }from "../FormInput/FileUpload/FileInfo";
import  ContentBox  from "../ContentBox/ContentBox";
import { useGlobals } from '@storybook/addons';
import  Avatar  from "../Avatar";
import done from "../../assets/icons/doneSuccess.svg"

const meta: Meta<typeof Notif> = {
  component: Notif,
  title: "designsystem/Notifications",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    data: [
      {
        variant: 'v1',
        notificationId: "12345",
        notificationTitle : "Action Actioned",
        notificationDescription: <span>Assigned to you <span className="text-blue-700">PT-123</span></span>,
        notificationRead:true,
        notificationIcon: <Avatar imageUrl={notificationAvatar} /> ,
        createdAt:  "2024-06-27T17:23:49.000Z",
        onClickHandler: ()=>{window.alert("test");}
      },
      {
        variant: 'v1',
        notificationId: "12345",
        notificationTitle : "Action Actioned",
        notificationDescription: <span> Assigned to you <span className="text-blue-700">PT-123</span></span>,
        notificationRead:true,
        notificationIcon: <Avatar imageUrl={notificationAvatar} /> ,
        createdAt:  "2024-06-27T17:23:49.000Z",
        content:<FileInfo data={{
          id: 20,
          mediaURL:
            "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fa3a6255-0d12-4695-abd2-fbc8a271a81c",
          mediaName: "giyu-tomioka-demon-3840x2160-16085.jpg",
          size: 5757677,
          progress: 50,
          fileSizeLimit: 8000000,
          uploadError: false,
          showLoader: true,
        }}/>
      },

      {
        notificationId: "12345",
        notificationIcon: <Avatar imageUrl={notificationAvatar} /> ,
        notificationTitle : "Mohammed Saket",
        notificationDescription: <span>Added a file to <span className="text-blue-700">Marketing site redesign</span></span>,
        createdAt: "2024-06-27T17:23:49.000Z",
        content:<FileInfo data={{
          id: 20,
          mediaURL:
            "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fa3a6255-0d12-4695-abd2-fbc8a271a81c",
          mediaName: "giyu-tomioka-demon-3840x2160-16085.jpg",
          size: 5757677,
          progress: 50,
          fileSizeLimit: 8000000,
          uploadError: false,
          showLoader: true,
        }}/>,
        notificationRead:false
      },
      {
        notificationId: "12345",
        notificationIcon: <Avatar icon={done} /> ,
        notificationTitle: "Gagan Malik",
        notificationDescription: <span>Assigned <span className="text-blue-700">PT-123</span> to you</span>,
        createdAt: "2024-06-27T17:23:49.000Z",
        notificationRead:true
      },
      {
        notificationId: "12345",
        notificationIcon: <Avatar imageUrl={notificationAvatar} /> ,
        notificationTitle: "Gagan Malik",
        notificationDescription: <span>Commented in <span className="text-blue-700">Marketing site redesign</span></span>,
        content:<ContentBox content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id."></ContentBox>,
        createdAt: "2024-06-27T17:23:49.000Z",
        notificationRead:true
      },
      {
        notificationId: "12345",
        notificationIcon: <Avatar imageUrl={notificationAvatar} /> ,
        notificationTitle: "Gagan Malik",
        notificationDescription: "Added 3 labels to the project Marketing site redesign",
        createdAt: "2024-06-27T17:23:49.000Z",
        notificationRead:true
      }
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Notifications: Story = {
  args: {},
  render: (args) => {
    const [globals] = useGlobals(); 
    let theme = (globals?.backgrounds?.value == "#030712") ? "dark" : "light";
    return <Notif {...args} theme={theme}/>
  },
};
