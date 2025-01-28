import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import dummyImage from "../../assets/icons/dummyImage.svg";
import { DragAndDrop as DnD } from "../../index";
import { IIssueData, IIssuesByLane } from "./interfaces";
import dummyAvatar from "../../assets/icons/ticketAvatar.svg";
import unassigned from "../../assets/icons/unassigned.svg";
import searchIcon from "../../assets/icons/searchIcon.svg";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

// const sampleSections = ["OPEN", "IN PROGRESS", "REVIEW", "COMPLETED"];

export const sampleIssuesData: IIssuesByLane[] = [
  {
    items: [],
    name: "Open",
  },
  {
    items: [
      {
        id: 1,
        issue_type: "Incident",
        ticket_number: "L1234",
        text: "Confined Space Entry with Methane Gas Leak and Lack of Respiratory Protection",
        slug: "slug",
        description: "desciption",
        priority: "Low",
        assignee: {
          id: 9,
          avatar: "https://permitech.s3.amazonaws.com/965ac315fab2__[PROXY]",
          first_name: "John",
          last_name: "Doe",
          fullname: "John Doe",
          email: "john@gmail.com",
        },
        attachmentURL: "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=2ccd5776-9fbb-4f67-92b0-ba2a9b50371b",
      },
      {
        id: 4,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "bar",
        slug: "test",
        description: "test",
        assignee: {
          id: 9,
        },
      },
    ],
    name: "In Progress",
  },
  {
    items: [
      {
        id: 5,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "joe",
        slug: "test",
        description: "test",
      },
      {
        id: 6,
        issue_type: "Injury",
        ticket_number: "1234",
        text: "lom",
        slug: "test",
        description: "test",
      },
    ],
    name: "In Review",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Completed",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Cancelled",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "On Hold",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Rejected",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Unknown",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Done",
  },
  {
    items: [
      {
        id: 7,
        issue_type: "Observation",
        ticket_number: "1234",
        text: "cam",
        slug: "test",
        description: "test",
      },
      {
        id: 8,
        issue_type: "Incident",
        ticket_number: "1234",
        text: "tim",
        slug: "test",
        description: "test",
      },
    ],
    name: "Blocked",
  },
];

const filterOptions = [
  {
    label: "Search this board",
    placeholder: "Search",
    type: "text",
    iconUrl: searchIcon,
    labelBold: false,
  },
  {
    label: "Issue type",
    type: "select",
    labelBold: false,
    placeholder: "All Issue types",
    defaultSelected: {
      id: 0,
      name: "All",
    },
    options: [
      { name: "All", id: 0 },
      { name: "Near Miss", id: "1" },
      { name: "Injury", id: "2" },
      { name: "Fatality", id: "3" },
      { name: "Property Damage", id: "5" },
      { name: "Observation", id: "6" },
      { name: "Incident", id: "7" },
    ],
  },
  {
    label: "Status",
    type: "select",
    labelBold: false,
    defaultSelected: {
      id: 0,
      name: "All",
    },
    options: [
      {
        id: 0,
        name: "All",
      },
      {
        id: 1,
        name: "Open",
      },
      {
        id: 2,
        name: "In Progress",
      },
      {
        id: 3,
        name: "In Review",
      },
      {
        id: 4,
        name: "Completed",
      },
    ],
  },
];

const onCardClick = function (card: any) {
  console.log("card clicked with details", card);
};

const onDrop = (issue: any, newStatus: any) => {
  console.log("issue dropped is", issue, " newStatus is", newStatus);
};

const onSearchFilter = (val: any) => {
  console.log(val);
};

const meta: Meta<typeof DnD> = {
  component: DnD,
  title: "designsystem/DragAndDrop",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    isLoading: false,
    data: sampleIssuesData,
    onDrop,
    onCardClick,
    filterOptions,
    onButtonClick: (value) => {
      window.alert(value);
    },
    attachments: [
      {
        id: 12,
        attachments: [
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=2ccd5776-9fbb-4f67-92b0-ba2a9b50371b",
          },
          {
            media_name: "i-love-coding-dark-3840x2160-16016.png",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fi-love-coding-dark-3840x2160-16016.png?alt=media&token=fb29f03d-6052-43f8-a3b0-054bc7b719be",
          },
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fb6a3118-83a1-4f52-8604-847337cae59e",
          },
        ],
      },
      {
        id: 6,
        attachments: [
          {
            media_name: "tanjiro-kamado-3840x2160-16947.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Ftanjiro-kamado-3840x2160-16947.jpg?alt=media&token=05e86478-5f02-4533-9e53-e683e1aa0b1c",
          },
        ],
      },
      {
        id: 8,
        attachments: [
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fundefined?alt=media&token=4a4adffc-ec63-4b53-aa68-c4f516519e00",
          },
          {
            media_name: "tanjiro-kamado-3840x2160-16947.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Ftanjiro-kamado-3840x2160-16947.jpg?alt=media&token=34803955-a680-4be0-a4a5-a225b4124c5f",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fundefined?alt=media&token=c0360259-e984-4c0f-80e5-152d5a6250bf",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=9c3a1809-722e-486c-a3ca-0b5cc75f41bd",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=74d0b20f-61fd-46d9-a608-c16581ed92e3",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=74d0b20f-61fd-46d9-a608-c16581ed92e3",
          },
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fc486115-0601-4aa2-93e7-433ae2937240",
          },
        ],
      },
      {
        id: 12,
        attachments: [
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=2ccd5776-9fbb-4f67-92b0-ba2a9b50371b",
          },
          {
            media_name: "i-love-coding-dark-3840x2160-16016.png",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fi-love-coding-dark-3840x2160-16016.png?alt=media&token=fb29f03d-6052-43f8-a3b0-054bc7b719be",
          },
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fb6a3118-83a1-4f52-8604-847337cae59e",
          },
        ],
      },
      {
        id: 6,
        attachments: [
          {
            media_name: "tanjiro-kamado-3840x2160-16947.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Ftanjiro-kamado-3840x2160-16947.jpg?alt=media&token=05e86478-5f02-4533-9e53-e683e1aa0b1c",
          },
        ],
      },
      {
        id: 8,
        attachments: [
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fundefined?alt=media&token=4a4adffc-ec63-4b53-aa68-c4f516519e00",
          },
          {
            media_name: "tanjiro-kamado-3840x2160-16947.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Ftanjiro-kamado-3840x2160-16947.jpg?alt=media&token=34803955-a680-4be0-a4a5-a225b4124c5f",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fundefined?alt=media&token=c0360259-e984-4c0f-80e5-152d5a6250bf",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=9c3a1809-722e-486c-a3ca-0b5cc75f41bd",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=74d0b20f-61fd-46d9-a608-c16581ed92e3",
          },
          {
            media_name: null,
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=74d0b20f-61fd-46d9-a608-c16581ed92e3",
          },
          {
            media_name: "giyu-tomioka-demon-3840x2160-16085.jpg",
            mediaURL:
              "https://firebasestorage.googleapis.com/v0/b/permitech-b27fa.appspot.com/o/attachments%2Fgiyu-tomioka-demon-3840x2160-16085.jpg?alt=media&token=fc486115-0601-4aa2-93e7-433ae2937240",
          },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DragAndDrop: Story = {
  render: () => {
    const [data, setData] = React.useState(sampleIssuesData);
    const [key, setKey] = React.useState(1);
    const onDrop = (
      issue: { status: string; issue: IIssueData },
      newStatus: string
    ) => {
      if (issue.status.toLowerCase() === newStatus.toLowerCase()) {
        return;
      }

      let updatedState = data;
      let filtereditemIndex = updatedState.findIndex(
        (i) => i.name === issue.status
      );
      let filtereditemNewIndex = updatedState.findIndex(
        (i) => i.name === newStatus
      );

      if (filtereditemNewIndex !== -1 && filtereditemIndex !== -1) {
        updatedState[filtereditemNewIndex] = {
          ...updatedState[filtereditemNewIndex],
          items: [...updatedState[filtereditemNewIndex]?.items, issue.issue],
        };

        updatedState[filtereditemIndex].items = updatedState[
          filtereditemIndex
        ].items.filter((d) => d.id !== issue.issue.id);
        setKey(key + 1);
        setData({} as any);
        setData(updatedState);
      }
    };

    return (
      <DnD
        data={data}
        filterOptions={filterOptions}
        onDrop={onDrop}
        onCardClick={() => {}}
        key={key}
      />
    );
  },
};
