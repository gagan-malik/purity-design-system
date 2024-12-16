import type { Meta, StoryObj } from "@storybook/react";
import { BreadCrumb } from "../../index";

const meta: Meta<typeof BreadCrumb> = {
  component: BreadCrumb,
  title: "designsystem/BreadCrumb",
  tags: ["autodocs"],
  argTypes: {
    list: { control: "array" },
  },
  args: {
    list: [
      { name: "Workspaces", link: "/" },
      { name: "Blue Dolphin 775", link: "http://localhost:6006/?path=/docs/designsystem-breadcrumb--docs" },
      { name: "Test-Vikas" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof BreadCrumb>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc
export const BreadCrumbBasic: Story = {
  args: { variant: "filled" },
};
