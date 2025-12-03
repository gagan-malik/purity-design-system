import type { Meta, StoryObj } from "@storybook/react";
import { StatusBar } from "./StatusBar";

const meta: Meta<typeof StatusBar> = {
  component: StatusBar,
  title: "designsystem/StatusBar",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic status bar
export const Basic: Story = {
  render: () => (
    <div className="h-screen">
      <StatusBar />
      <div className="pt-20 p-4">
        Content below status bar
      </div>
    </div>
  ),
};

// Custom status bar
export const Custom: Story = {
  render: () => (
    <div className="h-screen">
      <StatusBar>
        <div>My App</div>
        <div>Status</div>
      </StatusBar>
      <div className="pt-20 p-4">
        Content below status bar
      </div>
    </div>
  ),
};

