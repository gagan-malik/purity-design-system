import type { Meta, StoryObj } from "@storybook/react";
import { Resizable } from "./Resizable";

const meta: Meta<typeof Resizable> = {
  component: Resizable,
  title: "designsystem/Resizable",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Horizontal split
export const Horizontal: Story = {
  render: () => (
    <div className="h-96 p-4">
      <Resizable
        firstPanel={
          <div className="h-full bg-primary-100 p-4 flex items-center justify-center">
            Left Panel
          </div>
        }
        secondPanel={
          <div className="h-full bg-secondary-100 p-4 flex items-center justify-center">
            Right Panel
          </div>
        }
      />
    </div>
  ),
};

// Vertical split
export const Vertical: Story = {
  render: () => (
    <div className="h-96 p-4">
      <Resizable
        direction="vertical"
        firstPanel={
          <div className="w-full bg-primary-100 p-4 flex items-center justify-center">
            Top Panel
          </div>
        }
        secondPanel={
          <div className="w-full bg-secondary-100 p-4 flex items-center justify-center">
            Bottom Panel
          </div>
        }
      />
    </div>
  ),
};

