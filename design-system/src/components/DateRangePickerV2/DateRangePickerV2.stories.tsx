import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DateRangePickerV2 from "./DateRangePickerV2";

const meta: Meta<typeof DateRangePickerV2> = {
  component: DateRangePickerV2,
  title: "designsystem/DateRangePickerV2",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePickerV2>;

export const Base: Story = {
  args: {
    onDateRangeChange: (dateRange) => console.log("Selected Date Range:", dateRange),
  },
};
