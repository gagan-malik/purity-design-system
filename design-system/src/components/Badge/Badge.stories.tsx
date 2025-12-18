import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Badge, CountBadge } from "./Badge";
import increase from "../../assets/icons/increase.svg";
import flagIcon from "./icons/flag.svg";

const meta: Meta<typeof Badge> = {
  component: Badge,

  title: "Atoms/Badge",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: "Label",
    icon: flagIcon,
    color: "important",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <div className="text-xs font-semibold text-text-secondary mb-2">Tones</div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="brand">Brand</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="gradient" variant="solid">Gradient</Badge>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-text-secondary mb-2">Variants</div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand" variant="soft">Soft</Badge>
          <Badge tone="brand" variant="outline">Outline</Badge>
          <Badge tone="brand" variant="solid">Solid</Badge>
        </div>
      </div>

      <div>
        <div className="text-xs font-semibold text-text-secondary mb-2">Dot + icons</div>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge tone="success" dot>Online</Badge>
          <Badge tone="danger" dot variant="outline">Blocked</Badge>
          <Badge tone="brand" leftIcon={<img src={flagIcon} alt="" aria-hidden className="h-4 w-4" />}>Flagged</Badge>
          <Badge tone="neutral" rightIcon={<img src={increase} alt="" aria-hidden className="h-4 w-4" />}>Up</Badge>
        </div>
      </div>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="text-xs font-semibold text-text-secondary">CountBadge (a11y-first)</div>
      <div className="flex gap-3 items-center">
        <CountBadge count={3} ariaLabel="3 notifications" />
        <CountBadge count={120} max={99} ariaLabel="99+ notifications" />
        <CountBadge count={0} showZero ariaLabel="0 notifications" tone="neutral" variant="outline" />
      </div>
    </div>
  ),
};
