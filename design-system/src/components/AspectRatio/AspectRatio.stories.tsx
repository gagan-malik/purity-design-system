import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ASPECT_RATIOS, AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  title: "Atoms/AspectRatio",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center h-full bg-primary-100 text-primary-700 font-semibold">
    {label}
  </div>
);

// Square
export const Square: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio variant="square">
        <Box label="1:1" />
      </AspectRatio>
    </div>
  ),
};

// Video (16:9)
export const Video: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio variant="video">
        <Box label="16:9" />
      </AspectRatio>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(
          [
            ["square", "1:1"],
            ["classic", "4:3"],
            ["photo", "3:2"],
            ["widescreen", "16:10"],
            ["video", "16:9"],
            ["wide", "21:9"],
            ["ultrawide", "32:9"],
            ["portrait", "9:16"],
          ] as const
        ).map(([variant, label]) => (
          <div key={variant} className="rounded-2xl border border-border-secondary p-3">
            <div className="mb-2 text-xs font-semibold text-text-secondary">
              {variant} · {ASPECT_RATIOS[variant].toFixed(4)}
            </div>
            <AspectRatio variant={variant}>
              <Box label={label} />
            </AspectRatio>
          </div>
        ))}
      </div>
    </div>
  ),
};

// Custom ratio
export const Custom: Story = {
  render: () => (
    <div className="max-w-md p-4">
      <AspectRatio ratio={4 / 3}>
        <Box label="4:3 (custom)" />
      </AspectRatio>
    </div>
  ),
};

export const Auto: Story = {
  render: () => (
    <div className="max-w-md p-4 space-y-2">
      <div className="text-xs font-semibold text-text-secondary">variant=&quot;auto&quot; (no enforced ratio)</div>
      <AspectRatio variant="auto">
        <div className="rounded-2xl border border-border-secondary bg-bg-secondary p-6 text-text-primary">
          This container sizes to its content.
        </div>
      </AspectRatio>
    </div>
  ),
};

