import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: "designsystem/Pagination",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic pagination
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="p-4">
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
        <div className="mt-4 text-center text-sm text-text-secondary">
          Current page: {page}
        </div>
      </div>
    );
  },
};

// Many pages
export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return (
      <div className="p-4">
        <Pagination
          currentPage={page}
          totalPages={100}
          onPageChange={setPage}
        />
      </div>
    );
  },
};

// Without first/last
export const WithoutFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div className="p-4">
        <Pagination
          currentPage={page}
          totalPages={20}
          onPageChange={setPage}
          showFirstLast={false}
        />
      </div>
    );
  },
};

