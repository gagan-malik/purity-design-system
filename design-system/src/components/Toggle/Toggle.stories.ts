import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Toggle } from "./index";

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: "designsystem/Toggle",
  tags: ["autodocs"],
  argTypes: {
    isChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
  args: {
    isChecked: true,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const DefaultToggle: Story = {
  args: {
    id: "default-toggle",
    label: "Toggle me",
    isChecked: false,
  },
};

export const CheckedToggle: Story = {
  args: {
    isChecked: true,
  },
};

export const DisabledToggle: Story = {
  args: {
    disabled: true,
    isChecked: false,
  },
};

export const DisabledCheckedToggle: Story = {
  args: {
    isChecked: true,
    disabled: true,
  },
};
