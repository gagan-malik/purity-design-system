import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React, { useState } from "react";
import { InfiniteScroll } from "./InfiniteScroll";

const meta: Meta<typeof InfiniteScroll> = {
  component: InfiniteScroll,
  title: "designsystem/InfiniteScroll",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage
export const Base: Story = {
  render: () => {
    const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadMore = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newItems = Array.from(
        { length: 10 },
        (_, i) => items.length + i + 1
      );
      setItems([...items, ...newItems]);

      // Stop loading after 50 items
      if (items.length + 10 >= 50) {
        setHasMore(false);
      }

      setIsLoading(false);
    };

    return (
      <div className="h-screen overflow-auto">
        <InfiniteScroll
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          isLoading={isLoading}
        >
          <div className="space-y-2 p-4">
            {items.map((item) => (
              <div
                key={item}
                className="p-4 bg-bg-secondary rounded-lg text-text-primary"
              >
                Item {item}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  },
};

