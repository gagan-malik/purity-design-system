import type { Meta, StoryObj } from "@storybook/react";
import { Loader as LoaderComp } from "../../index";

const meta: Meta<typeof LoaderComp> = {
  component: LoaderComp,
  title: "designsystem/Loader",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Loader: Story = {
  args: {},
};
export const LoaderFullPage: Story = {
  args: {
    fullPage: true,
  },
};
