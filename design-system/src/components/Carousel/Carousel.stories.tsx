import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "designsystem/Carousel",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const carouselItems = [
  <div key="1" className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-4xl font-bold">
    Slide 1
  </div>,
  <div key="2" className="flex items-center justify-center h-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-4xl font-bold">
    Slide 2
  </div>,
  <div key="3" className="flex items-center justify-center h-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-4xl font-bold">
    Slide 3
  </div>,
];

// Basic carousel
export const Basic: Story = {
  args: {
    items: carouselItems,
  },
};

// With autoplay
export const Autoplay: Story = {
  args: {
    items: carouselItems,
    autoPlay: true,
    autoPlayInterval: 3000,
  },
};

// Without arrows
export const WithoutArrows: Story = {
  args: {
    items: carouselItems,
    showArrows: false,
  },
};

// Without indicators
export const WithoutIndicators: Story = {
  args: {
    items: carouselItems,
    showIndicators: false,
  },
};

