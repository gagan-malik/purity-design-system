import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button";

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: "designsystem/Popover",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic popover
export const Basic: Story = {
  render: () => (
    <div className="p-8">
      <Popover
        trigger={<Button>Open Popover</Button>}
        content={
          <div className="space-y-2">
            <div className="font-semibold">Popover Title</div>
            <div className="text-sm text-text-secondary">
              This is popover content
            </div>
          </div>
        }
      />
    </div>
  ),
};

// Different placements
export const Placements: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div className="flex justify-center">
        <Popover
          trigger={<Button>Top</Button>}
          content={<div>Popover on top</div>}
          placement="top"
        />
      </div>
      <div className="flex justify-center gap-8">
        <Popover
          trigger={<Button>Left</Button>}
          content={<div>Popover on left</div>}
          placement="left"
        />
        <Popover
          trigger={<Button>Right</Button>}
          content={<div>Popover on right</div>}
          placement="right"
        />
      </div>
      <div className="flex justify-center">
        <Popover
          trigger={<Button>Bottom</Button>}
          content={<div>Popover on bottom</div>}
          placement="bottom"
        />
      </div>
    </div>
  ),
};

