import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NativeSelect } from "./NativeSelect";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof NativeSelect> = {
  component: NativeSelect,
  title: "Atoms/NativeSelect",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "", label: "Select an option" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Default: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect options={options} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect
        label="Choose an option"
        options={options}
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect
        label="Country"
        helperText="Select your country of residence"
        options={[
          { value: "", label: "Select country" },
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
          { value: "ca", label: "Canada" },
        ]}
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect
        label="Country"
        error="Please select a valid country"
        options={options}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect
        label="Disabled select"
        options={options}
        disabled
      />
    </div>
  ),
};

export const WithChildren: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <NativeSelect label="Framework">
        <option value="">Select framework</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </NativeSelect>
    </div>
  ),
};
