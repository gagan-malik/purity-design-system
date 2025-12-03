import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SwipeableCard } from "./SwipeableCard";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/picture.svg";

const meta: Meta<typeof SwipeableCard> = {
  component: SwipeableCard,
  title: "designsystem/SwipeableCard",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const CardContent = ({ title, description }: { title: string; description: string }) => (
  <div className="p-4">
    <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
    <p className="text-sm text-text-secondary">{description}</p>
  </div>
);

// Basic swipe left
export const SwipeLeft: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4">
      <SwipeableCard
        swipeLeftActions={[
          {
            label: "Delete",
            icon: deleteIcon,
            onAction: () => alert("Delete clicked"),
            destructive: true,
          },
          {
            label: "Edit",
            icon: editIcon,
            onAction: () => alert("Edit clicked"),
          },
        ]}
      >
        <CardContent
          title="Swipe Left Card"
          description="Swipe left to reveal actions"
        />
      </SwipeableCard>
    </div>
  ),
};

// Swipe right
export const SwipeRight: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4">
      <SwipeableCard
        swipeRightActions={[
          {
            label: "Archive",
            color: "#6366f1",
            onAction: () => alert("Archive clicked"),
          },
        ]}
      >
        <CardContent
          title="Swipe Right Card"
          description="Swipe right to reveal actions"
        />
      </SwipeableCard>
    </div>
  ),
};

// Both directions
export const SwipeBoth: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <SwipeableCard
        swipeLeftActions={[
          {
            label: "Delete",
            icon: deleteIcon,
            onAction: () => alert("Delete clicked"),
            destructive: true,
          },
        ]}
        swipeRightActions={[
          {
            label: "Archive",
            color: "#6366f1",
            onAction: () => alert("Archive clicked"),
          },
        ]}
      >
        <CardContent
          title="Swipe Both Ways"
          description="Swipe left or right to reveal different actions"
        />
      </SwipeableCard>
    </div>
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-4">
      <SwipeableCard enabled={false}>
        <CardContent
          title="Disabled Swipe"
          description="Swipe is disabled on this card"
        />
      </SwipeableCard>
    </div>
  ),
};

