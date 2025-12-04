import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "designsystem/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: {
        type: "radio",
        options: ["unchecked", "basic", "dash", "rounded"],
      },
    },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    id: "unchecked-checkbox",
    label: "Unchecked Checkbox",
    checked: "unchecked",
  },
};

export const Basic: Story = {
  args: {
    id: "basic-checkbox",
    label: "Basic Checkbox",
    checked: "basic",
  },
};

export const Dash: Story = {
  args: {
    id: "dash-checkbox",
    label: "Dash Checkbox",
    checked: "dash",
  },
};

export const DisabledBasic: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  },
};

export const DisabledDash: Story = {
  args: {
    ...Dash.args,
    disabled: true,
  },
};
