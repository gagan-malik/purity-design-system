import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Table } from "../../index"; // Assuming this is your Table component
import { action } from "storybook/actions"; // Import the action helper

interface IData {
  fullName: string | React.ReactNode;
  lastname: string | React.ReactNode;
  place: string | React.ReactNode;
  role: string | React.ReactNode
  tags: string | React.ReactNode;
}

const columns = [
  {
    key: "fullName",
    title: "Full Name",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-gray-500",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  },
  {
    key: "lastname",
    title: "Last Name",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-gray-500",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  },
  {
    key: "place",
    title: "Place",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-gray-500",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  },
  {
    key: "role",
    title: "Role",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-gray-500",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
  },
  {
    key: "tags",
    title: "Tags",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-gray-500",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
    render: (_: any, { tags }: any) => (
      <div>
        {tags.map((tag: any, index: number) => (
          <div key={index}>{tag}</div>
        ))}
      </div>
    ),
  },
];

const data: IData[] = [
  { fullName: <div className="text-text-primary">Francisco Mendes</div>, lastname: "Mendes", place: "New York", role: "Full Stack", tags: ["dev", "blogger"] },
  { fullName: "Alice Johnson", lastname: "Johnson", place: "Los Angeles", role: "Frontend Developer", tags: ["designer"] },
  { fullName: "Maria Lopez", lastname: "Lopez", place: "San Francisco", role: "Backend Developer", tags: ["server"] },
  { fullName: "John Doe", lastname: "Doe", place: "Seattle", role: "Data Scientist", tags: ["AI", "ML"] },
  { fullName: "Emma Smith", lastname: "Smith", place: "Chicago", role: "Software Engineer", tags: ["React", "JS"] },
  { fullName: "Lucas Brown", lastname: "Brown", place: "Boston", role: "UI Designer", tags: ["UX"] },
  { fullName: "Chris Evans", lastname: "Evans", place: "Houston", role: "DevOps Engineer", tags: ["AWS"] },
  { fullName: "Sarah Wilson", lastname: "Wilson", place: "Miami", role: "Tech Lead", tags: ["Leadership"] },
  { fullName: "Daniel Taylor", lastname: "Taylor", place: "Austin", role: "QA Engineer", tags: ["Testing"] },
];

const meta: Meta<typeof Table> = {
  component: Table,
  title: "designsystem/Table",
  tags: ["autodocs"],
  args: {
    data,
    columns,
    itemsPerPage: 5, // Default value
    paginationEnabled: true, // Default pagination setting
  },
  argTypes: {
    itemsPerPage: {
      control: { type: "number" },
      description: "Number of items to show per page",
    },
    paginationEnabled: {
      control: { type: "boolean" },
      description: "Enable or disable pagination",
    },
    currentPage: {
      control: { type: "number" },
      description: "The current active page",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Paginated: Story = {
  render: ({ itemsPerPage, paginationEnabled, totalPages, ...args }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      action("Page changed")(page); // Log page change to Storybook actions
    };

    return (
      <Table
        {...args}
        TableTitle="Paginated Table"
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        paginationEnabled={paginationEnabled}
        totalPages={3}
      />
    );
  },
};
export const withoutPaginationandTopSection: Story = {
  render: ({ itemsPerPage, paginationEnabled, ...args }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      action("Page changed")(page); // Log page change to Storybook actions
    };

    return (
      <Table
        {...args}
        onPageChange={handlePageChange}
        paginationEnabled={false}
        showTopSection={false}
        multiSelect={false}
      />
    );
  },
};

