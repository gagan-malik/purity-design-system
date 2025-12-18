import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VirtualizedList } from "./VirtualizedList";

const meta: Meta<typeof VirtualizedList<string>> = {
  title: "designsystem/VirtualizedList",
  component: VirtualizedList as any,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof VirtualizedList<string>>;

export const Default: Story = {
  render: () => {
    const items = Array.from({ length: 2000 }, (_, i) => `Row ${i + 1}`);
    return (
      <div className="max-w-xl">
        <VirtualizedList
          items={items}
          height={360}
          itemHeight={44}
          renderItem={(item, idx) => (
            <div className="h-full flex items-center px-3 border-b border-border-secondary text-sm text-text-primary">
              {idx + 1}. {item}
            </div>
          )}
        />
      </div>
    );
  },
};

