import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DateRangePicker from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "designsystem/DateRangePicker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Base: Story = {
  args: {},
};

