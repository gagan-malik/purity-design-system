import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Collapsible } from "./Collapsible";
import { Button } from "../Button";

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: "designsystem/Collapsible",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic collapsible
export const Basic: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <Collapsible
        trigger={<Button>Toggle Content</Button>}
      >
        <div className="mt-4 p-4 bg-bg-secondary rounded-lg">
          This is collapsible content that appears when you click the button.
        </div>
      </Collapsible>
    </div>
  ),
};

// Default open
export const DefaultOpen: Story = {
  render: () => (
    <div className="p-4 max-w-md">
      <Collapsible
        defaultOpen={true}
        trigger={<Button>Toggle Content</Button>}
      >
        <div className="mt-4 p-4 bg-bg-secondary rounded-lg">
          This content is open by default.
        </div>
      </Collapsible>
    </div>
  ),
};

