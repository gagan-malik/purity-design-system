import type { Meta, StoryObj } from "@storybook/react";
import { Input as Inpt } from "../../index";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Inpt> = {
  component: Inpt,
  title: "designsystem/Input",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: { type: "select" },
      options: [
        "text",
        "number",
        "date",
        "tel",
        "button",
        "color",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "password",
        "radio",
        "range",
        "search",
        "reset",
        "submit",
        "time",
        "url",
        "week",
        "checkbox",
      ],
    },
    dropdownOptions: { control: "object" },
  },
  args: {
    label: "Name",
    placeholder: "John Doe",
    type: "text",
    showHelpTooltip: true,
    helpText: "Enter your full name here.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input story
export const BasicInput: Story = {
  args: { onChange: (e) => console.log(e.target.value) },
};

// Email Input story
export const EmailInput: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "john@doe.com",
    hintText: "Enter your workspace email ID.",
    required: true,
    helpText: "Enter your workspace email ID here.",
    onChange: (e) => console.log(e.target.value),
  },
};

// Password Input story
export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Admin@123",
    hintText:
      "Enter a strong password, including letters, numbers and symbols.",
    required: true,
    onChange: (e) => console.log(e.target.value),
  },
};

// Phone Number Input story
export const PhoneNumberInput: Story = {
  args: {
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
    dropdownOptions: [
      { value: "+1", label: "US" },
      { value: "+44", label: "UK" },
      { value: "+91", label: "IN" },
    ],
    onDropdownChange: (value) => console.log("Selected country code:", value),
    onChange: (e) => console.log("Phone number:", e.target.value),
    hintText: "Enter your phone number and select country code",
    helpText: "This is a help text.",
  },
};

// Currency Input story
export const CurrencyInputRightAligned: Story = {
  args: {
    label: "Amount",
    type: "number",
    placeholder: "1,000.00",
    dropdownOptions: [
      { value: "USD", label: "USD" },
      { value: "EUR", label: "EUR" },
      { value: "GBP", label: "GBP" },
    ],
    dropdownAlignment: "right",
    onDropdownChange: (value) => console.log("Selected currency:", value),
    onChange: (e) => console.log("Amount:", e.target.value),
    hintText: "This is a hint text to help user.",
    helpText: "This is a help text to help user.",
  },
};

// With Copy Button
export const CopyButtonInput: Story = {
  args: {
    label: "Workspace ID",
    type: "text",
    placeholder: "workspace-id-1234",
    hintText: "This is a hint text to help user.",
    helpText: "This is a help text to help user.",
    showCopyButton: true,
    onChange: (e) => console.log(e.target.value),
  },
};
