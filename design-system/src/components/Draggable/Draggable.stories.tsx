import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Draggable, HomeCardGroup, OverviewCard } from "../../index";

const meta: Meta<typeof Draggable> = {
  component: Draggable,
  title: "designsystem/Draggable",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Draggable>;

const getChild = (title: string = "Incident") => (
  <div className="grid grid-cols-3 gap-1">
    <OverviewCard
      title={title}
      data={18}
      percentageChange={45}
      trendDescription="Compared to previous months"
    />
    <OverviewCard
      title={title}
      data={18}
      percentageChange={45}
      trendDescription="Compared to previous months"
    />
    <OverviewCard
      title={title}
      data={18}
      percentageChange={45}
      trendDescription="Compared to previous months"
    />
  </div>
);

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc

export const Base: Story = {
  args: {
    items: [{ id: "1", children: getChild() }],
  },
};

// type Story = StoryObj<typeof Drgble>;

export const MultipleComponent: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 h-screen justify-around">
        <Draggable
          className="flex flex-col gap-4"
          items={[
            { id: "1", children: getChild() },
            { id: "2", children: getChild("Observation") },
            { id: "3", children: getChild("Permitech") },
          ]}
        />
      </div>
    );
  },
};

const homeCardGroup = (
  <HomeCardGroup
    data={[
      {
        coverImage: "static/media/src/assets/icons/companyAvatar.svg",
        firstName: "Md",
        lastName: "Saket",
        onCardClick: () => {},
        subtitle: "HT-1",
        timestamp: "2024-06-27T10:34:28.000Z",
        title: "Test",
        titleImage: "static/media/src/assets/icons/companyAvatar.svg",
        userAvatar: "static/media/src/assets/icons/ticketAvatar.svg",
      },
      {
        coverImage: "static/media/src/assets/icons/companyAvatar.svg",
        firstName: "Md",
        lastName: "Saket",
        onCardClick: () => {},
        subtitle: "HT-1",
        timestamp: "2024-06-27T10:34:28.000Z",
        title: "Test",
        titleImage: "static/media/src/assets/icons/companyAvatar.svg",
        userAvatar: "static/media/src/assets/icons/ticketAvatar.svg",
      },
      {
        coverImage: "static/media/src/assets/icons/companyAvatar.svg",
        firstName: "Md",
        lastName: "Saket",
        onCardClick: () => {},
        subtitle: "HT-1",
        timestamp: "2024-06-27T10:34:28.000Z",
        title: "Test",
        titleImage: "static/media/src/assets/icons/companyAvatar.svg",
        userAvatar: "static/media/src/assets/icons/ticketAvatar.svg",
      },
    ]}
    heading="Test"
    isDraggable
  />
);

export const DraggableHomeCardGroup: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-4 h-screen justify-around">
        <Draggable
          className="flex flex-col gap-4"
          backgroundColor="bg-bg-primary"
          items={[
            { id: "1", children: homeCardGroup },
            { id: "2", children: homeCardGroup },
            { id: "3", children: homeCardGroup },
          ]}
          handleDragEnd={(items) => {
            console.log("Items after drop123:", items);
          }}
        />
      </div>
    );
  },
};
