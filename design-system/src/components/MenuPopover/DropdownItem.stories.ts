import type { Meta, StoryObj } from "@storybook/react-webpack5";
import DropdownItem from "./DropdownItem";
import { DropdownDataProps } from "./MenuPopover";

const meta: Meta<typeof DropdownItem> = {
  component: DropdownItem,
  title: "designsystem/DropdownItem",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof DropdownItem>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
// Add comment here about base to show on doc

const data: DropdownDataProps = {
  title: "Settings",
  onClick: () => console.log("Settings clicked"),
  selected: true,
  type: "icon",
  state: "default",
  category: "menu",
}

export const Default: Story = {
  args: {
    data: data as DropdownDataProps, 
  },
};
