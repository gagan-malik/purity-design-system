import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  title: "designsystem/AspectRatio",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Square
export const Square: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio variant="square">
        <div className="flex items-center justify-center h-full bg-primary-100 text-primary-700">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
};

// Video (16:9)
export const Video: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio variant="video">
        <div className="flex items-center justify-center h-full bg-primary-100 text-primary-700">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
};

// Custom ratio
export const Custom: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio ratio={4 / 3}>
        <div className="flex items-center justify-center h-full bg-primary-100 text-primary-700">
          4:3
        </div>
      </AspectRatio>
    </div>
  ),
};

