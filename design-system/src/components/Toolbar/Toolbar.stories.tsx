import type { Meta, StoryObj } from "@storybook/react";
import { Toolbar } from "./Toolbar";
import { Button } from "../Button";

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
  title: "designsystem/Toolbar",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic toolbar
export const Basic: Story = {
  render: () => (
    <div className="p-4">
      <Toolbar>
        <Button size="sm">Bold</Button>
        <Button size="sm">Italic</Button>
        <Button size="sm">Underline</Button>
      </Toolbar>
    </div>
  ),
};

