import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import { ModalContainer as MdlContainer } from "../../index";
import ModalHeader from "../ModalHeader";
import BasicForm from "../common/BasicForm";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MdlContainer> = {
  component: MdlContainer,
  title: "designsystem/ModalContainer",
  tags: ["autodocs"],
  argTypes: {
    header: { control: "input" },
  },
  args: {
    header: (
      <ModalHeader
        title="Duplicate Test Dashboard"
        description="Required fields are marked with an asterisk"
        highlightDescription={true}
      />
    ),
    widthVariant: "small",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ModalContainer: Story = {
  args: {},
};
