import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { PullToRefresh } from "./PullToRefresh";

const meta: Meta<typeof PullToRefresh> = {
  component: PullToRefresh,
  title: "designsystem/PullToRefresh",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const ListContent = () => (
  <div className="space-y-2 p-4">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        className="p-4 bg-bg-secondary rounded-lg text-text-primary"
      >
        Item {i}
      </div>
    ))}
  </div>
);

// Basic usage
export const Base: Story = {
  render: () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [items, setItems] = useState([1, 2, 3, 4, 5]);

    const handleRefresh = async () => {
      setIsRefreshing(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setItems([...items, items.length + 1]);
      setIsRefreshing(false);
    };

    return (
      <div className="h-screen overflow-auto">
        <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
          <ListContent />
        </PullToRefresh>
      </div>
    );
  },
};

