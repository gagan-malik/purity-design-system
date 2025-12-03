import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "designsystem/Button",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 space-y-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Light and dark mode examples
export const LightAndDark: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Buttons in Light/Dark Mode</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" color="primary">Primary</Button>
          <Button variant="outlined" color="primary">Outlined</Button>
          <Button variant="filled" color="secondary">Secondary</Button>
          <Button variant="outlined" color="secondary">Secondary Outlined</Button>
          <Button variant="filled" color="destructive">Destructive</Button>
          <Button variant="outlined" color="destructive">Destructive Outlined</Button>
        </div>
      </div>
    </div>
  ),
};

