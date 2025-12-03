import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard } from "./HoverCard";
import { Avatar } from "../Avatar";

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  title: "designsystem/HoverCard",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic hover card
export const Basic: Story = {
  render: () => (
    <div className="p-8">
      <HoverCard
        content={
          <div className="space-y-2">
            <div className="font-semibold text-text-primary">John Doe</div>
            <div className="text-sm text-text-secondary">@johndoe</div>
            <div className="text-sm text-text-secondary">
              Software developer and designer
            </div>
          </div>
        }
      >
        <span className="text-primary-600 cursor-pointer hover:underline">
          Hover me
        </span>
      </HoverCard>
    </div>
  ),
};

// User preview
export const UserPreview: Story = {
  render: () => (
    <div className="p-8">
      <HoverCard
        content={
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar size="lg" />
              <div>
                <div className="font-semibold text-text-primary">Jane Smith</div>
                <div className="text-sm text-text-secondary">Product Manager</div>
              </div>
            </div>
            <div className="text-sm text-text-secondary">
              Working on awesome products that make a difference.
            </div>
          </div>
        }
      >
        <Avatar />
      </HoverCard>
    </div>
  ),
};

