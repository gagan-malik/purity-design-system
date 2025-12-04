import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "designsystem/Skeleton",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Text skeleton
export const Text: Story = {
  args: {
    variant: "text",
  },
};

// Multiple lines
export const MultipleLines: Story = {
  args: {
    variant: "text",
    lines: 3,
  },
};

// Circular (for avatars)
export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
};

// Rectangular (for images)
export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "100%",
    height: 200,
  },
};

// Card example
export const CardExample: Story = {
  render: () => (
    <div className="p-4 border border-border-secondary rounded-lg space-y-4 max-w-md">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" lines={2} />
    </div>
  ),
};

// List example
export const ListExample: Story = {
  render: () => (
    <div className="p-4 space-y-3 max-w-md">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton width="70%" height={16} />
            <Skeleton width="50%" height={14} />
          </div>
        </div>
      ))}
    </div>
  ),
};

