import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: "designsystem/Separator",
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Horizontal separator
export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
};

// Vertical separator
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 h-20">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Middle</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
};

// In a list
export const InList: Story = {
  render: () => (
    <div className="w-64 p-4">
      <div className="p-2">Item 1</div>
      <Separator />
      <div className="p-2">Item 2</div>
      <Separator />
      <div className="p-2">Item 3</div>
    </div>
  ),
};

