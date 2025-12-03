import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSelector } from "./ThemeSelector";
import { ThemeProvider } from "../../contexts/ThemeContext";

const meta: Meta<typeof ThemeSelector> = {
  component: ThemeSelector,
  title: "designsystem/ThemeSelector",
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
    showLabels: { control: "boolean" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    showLabels: true,
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// With labels
export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};

// Icon only
export const IconOnly: Story = {
  args: {
    showLabels: false,
  },
};

