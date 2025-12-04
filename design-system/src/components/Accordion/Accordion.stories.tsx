import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "designsystem/Accordion",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: "1",
    header: "What is Purity Design System?",
    content:
      "Purity Design System is a comprehensive component library built for modern web applications with a focus on mobile-first design and accessibility.",
  },
  {
    id: "2",
    header: "How do I install it?",
    content:
      "You can install Purity Design System via npm or yarn. Visit our documentation for detailed installation instructions.",
  },
  {
    id: "3",
    header: "Is it free to use?",
    content:
      "Yes, Purity Design System is open source and free to use in your projects.",
  },
];

// Basic accordion
export const Basic: Story = {
  args: {
    items: defaultItems,
  },
};

// Allow multiple open
export const AllowMultiple: Story = {
  args: {
    items: defaultItems,
    allowMultiple: true,
  },
};

// Bordered variant
export const Bordered: Story = {
  args: {
    items: defaultItems,
    variant: "bordered",
  },
};

// Separated variant
export const Separated: Story = {
  args: {
    items: defaultItems,
    variant: "separated",
  },
};

// With default open
export const DefaultOpen: Story = {
  args: {
    items: [
      { ...defaultItems[0], defaultOpen: true },
      ...defaultItems.slice(1),
    ],
  },
};

// With disabled item
export const WithDisabled: Story = {
  args: {
    items: [
      defaultItems[0],
      { ...defaultItems[1], disabled: true },
      defaultItems[2],
    ],
  },
};

