import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Container as Box } from "../../index";
import { AuthLayout } from "../../index";
import SampleLoginForm from "../AuthLayout/SampleLoginForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Box> = {
  component: Box,
  title: "designsystem/Container",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    children: <SampleLoginForm />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Container: Story = {
  args: {},
};
