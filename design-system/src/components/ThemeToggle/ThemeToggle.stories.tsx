import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof ThemeToggle> = {
  component: ThemeToggle,
  title: "designsystem/ThemeToggle",
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
  argTypes: {
    showLabel: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    showLabel: false,
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Icon only
export const IconOnly: Story = {
  args: {
    showLabel: false,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
  ),
};

