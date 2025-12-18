import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Spinner } from "./Spinner";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Atoms/Spinner",
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

export const Default: Story = {
  render: () => <Spinner />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="muted" />
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
        <Spinner size="sm" />
        Loading...
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md"
        disabled
      >
        <Spinner size="sm" variant="muted" />
        Processing
      </button>
    </div>
  ),
};
