import type { Meta, StoryObj } from "@storybook/react";
import { TextArea as TArea } from "../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TArea> = {
  component: TArea,
  title: "designsystem/TextArea",
  tags: ["autodocs"],
  argTypes: {},
  args: {
    label: "Name",
    placeholder: "Copy of Test Dashboard",
    rows: 5,
    cols: 50,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TextArea: Story = {
  args: {},
};
