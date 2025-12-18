import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "Atoms/Toggle",
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    isChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
    onCheckedChange: { action: "checkedChange" },
  },
  args: {
    checked: true,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const DefaultToggle: Story = {
  args: {
    id: "default-toggle",
    label: "Toggle me",
    checked: false,
  },
};

export const CheckedToggle: Story = {
  args: {
    checked: true,
  },
};

export const DisabledToggle: Story = {
  args: {
    disabled: true,
    checked: false,
  },
};

export const DisabledCheckedToggle: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
