import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, PopoverPlacement } from "../../index";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "designsystem/Datepicker",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const Main: Story = {
  args: {},
};

export const subHeaing: Story = {
  args: {},
};

export const bottom: Story = {
  render: () => (
    <div
      style={{
        alignItems: "flex-end",
        flex: 1,
        display: "flex",
        height: "700px",
        width: "1400px",
        justifyContent: "center",
      }}
    >
      <DatePicker
        defaultSelectDate={new Date()}
        onlyShow="datetime"
        placement={PopoverPlacement.top}
        width={{ timeWidth: "25%", dateWidth: "50%" }}
        label="Select Date and Time"
        required={true}
      />
    </div>
  ),
};
