import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  component: ScrollArea,
  title: "designsystem/ScrollArea",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic scroll area
export const Basic: Story = {
  render: () => (
    <div className="p-4">
      <ScrollArea>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 mb-2 bg-bg-secondary rounded-lg">
            Item {i + 1}
          </div>
        ))}
      </ScrollArea>
    </div>
  ),
};

