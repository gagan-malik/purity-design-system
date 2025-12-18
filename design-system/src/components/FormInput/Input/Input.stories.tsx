import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Input as Inpt } from "../../index";
import { DesignSpecs } from "../../../stories/_shared/DesignSpecs";
import { ComponentSpecsTable, TokenSpec } from "../../../stories/_shared/ComponentSpecsTable";
import { UsageGuidelines } from "../../../stories/_shared/UsageGuidelines";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Inpt> = {
  component: Inpt,
  title: "Molecules/FormInput/Input",
  tags: ["autodocs"],
  parameters: {
    // Figma design link - add your Figma file URL here
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/YOUR_FILE_ID/Input-Design',
    // },
  },
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

// Textarea Input story
export const TextareaInput: Story = {
  args: {
    label: "Description",
    type: "textarea",
    placeholder: "Enter your description here.",
  },
};
// Input token specifications
const inputTokens: TokenSpec[] = [
  {
    name: "Input Background",
    cssVariable: "var(--bg-primary)",
    description: "Background color for input fields",
    usage: "Default background for all input states",
  },
  {
    name: "Input Text",
    cssVariable: "var(--text-primary)",
    description: "Text color for input values",
    usage: "Text color for user-entered values",
  },
  {
    name: "Input Border",
    cssVariable: "var(--border-primary)",
    description: "Border color for input fields",
    usage: "Default border color",
  },
  {
    name: "Placeholder Text",
    cssVariable: "var(--text-placeholder)",
    description: "Text color for placeholder text",
    usage: "Placeholder text styling",
  },
  {
    name: "Label Text",
    cssVariable: "var(--text-tertiary)",
    description: "Text color for input labels",
    usage: "Label text styling",
  },
  {
    name: "Hint Text",
    cssVariable: "var(--text-secondary)",
    description: "Text color for hint/helper text",
    usage: "Helper text below input",
  },
  {
    name: "Error Border",
    cssVariable: "var(--border-error)",
    description: "Border color for error state",
    usage: "Applied when input has validation error",
  },
  {
    name: "Error Text",
    cssVariable: "var(--text-error-primary)",
    description: "Text color for error messages",
    usage: "Error message text",
  },
  {
    name: "Focus Ring",
    cssVariable: "var(--ring)",
    description: "Focus ring color",
    usage: "Applied on focus for accessibility",
  },
  {
    name: "Disabled Background",
    cssVariable: "var(--bg-disabled)",
    description: "Background color for disabled inputs",
    usage: "Applied when input is disabled",
  },
  {
    name: "Disabled Text",
    cssVariable: "var(--text-disabled)",
    description: "Text color for disabled inputs",
    usage: "Text color when input is disabled",
  },
];

export const DesignSpecs: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <DesignSpecs
        component="Input"
        dimensions={{
          minHeight: "44px (touch target minimum)",
          width: "100% (full width by default)",
        }}
        spacing={{
          padding: "var(--spacing-sm) to var(--spacing-md)",
          paddingLeft: "var(--spacing-md) (14px)",
          paddingRight: "var(--spacing-md) (14px)",
          paddingTop: "var(--spacing-sm) (8px)",
          paddingBottom: "var(--spacing-sm) (8px)",
          gap: "var(--spacing-xs) (between label and input)",
        }}
        typography={{
          fontSize: "var(--text-base) (1rem)",
          fontWeight: "400 (normal)",
          lineHeight: "1.5",
          fontFamily: "var(--sans)",
        }}
        colors={{
          background: "var(--bg-primary)",
          text: "var(--text-primary)",
          border: "var(--border-primary)",
          hover: {
            border: "var(--border-primary)",
          },
          active: {
            border: "var(--border-primary)",
          },
          disabled: {
            background: "var(--bg-disabled)",
            text: "var(--text-disabled)",
            border: "var(--border-disabled)",
          },
          error: {
            border: "var(--border-error)",
            text: "var(--text-error-primary)",
          },
        }}
        states={[
          {
            name: "Default",
            description: "Default input state",
            visual: <Inpt label="Name" placeholder="Enter your name" />,
          },
          {
            name: "Focused",
            description: "Input state when focused",
            visual: <Inpt label="Email" placeholder="Enter your email" autoFocus />,
          },
          {
            name: "With Value",
            description: "Input with entered value",
            visual: <Inpt label="Username" defaultValue="john.doe" />,
          },
          {
            name: "Error",
            description: "Input with validation error",
            visual: <Inpt label="Email" placeholder="invalid-email" className="border-error" />,
          },
          {
            name: "Disabled",
            description: "Input in disabled state",
            visual: <Inpt label="Disabled Field" placeholder="Cannot edit" disabled />,
          },
          {
            name: "With Hint",
            description: "Input with helper text",
            visual: <Inpt label="Password" type="password" hintText="Must be at least 8 characters" />,
          },
        ]}
      />

      <div style={{ marginTop: 48 }}>
        <ComponentSpecsTable tokens={inputTokens} title="Input Token Reference" />
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>
        Usage Guidelines
      </h2>
      <UsageGuidelines
        whenToUse={[
          "For text input fields in forms",
          "For email, password, and other input types",
          "When you need validation and error messaging",
          "For search inputs and filters",
          "When you need helper text or hints",
        ]}
        whenNotToUse={[
          "For selecting from options (use Select or Combobox)",
          "For multi-line text (use TextArea)",
          "For simple on/off toggles (use Toggle or Checkbox)",
          "For file uploads (use FileUpload component)",
        ]}
        commonMistakes={[
          "Not providing labels for inputs (accessibility issue)",
          "Not showing validation errors clearly",
          "Using placeholder text as the only label",
          "Not handling loading or disabled states",
          "Not providing helpful error messages",
        ]}
        alternatives={[
          "TextArea for multi-line text input",
          "Select or Combobox for choosing from options",
          "DatePicker for date input",
          "NumberInput for numeric input",
          "PasswordInput for password fields with show/hide",
        ]}
      />
    </div>
  ),
};
