import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ThemeSelector } from "../../components/ThemeSelector";
import { Button } from "../../components/Button";

const meta: Meta = {
  title: "Pages/Foundations/Theming",
  tags: ["ci"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Foundations: theming model (mode + accent + radius + density + motion) and how to use Storybook globals to validate components across themes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Theming</h1>
        <p className="text-text-tertiary mt-2">
          Use the toolbar (Theme/Accent/Radius/Density/Motion) to validate every component against
          system constraints. Prefer semantic tokens over raw colors.
        </p>
      </div>

      <div className="rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-4">
        <div className="text-sm font-semibold text-text-primary">Controls (in components)</div>
        <div className="flex flex-wrap gap-3 items-center">
          <ThemeToggle />
          <ThemeSelector />
        </div>
        <div className="text-xs text-text-tertiary">
          Tip: validate focus rings, disabled states, and contrast across themes.
        </div>
      </div>

      <div className="rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-3">
        <div className="text-sm font-semibold text-text-primary">Quick visual smoke</div>
        <div className="flex flex-wrap gap-3">
          <Button tone="brand" variant="solid">Primary</Button>
          <Button tone="neutral" variant="outline">Secondary</Button>
          <Button tone="danger" variant="solid">Danger</Button>
          <Button tone="brand" loading>Loading</Button>
        </div>
      </div>
    </div>
  ),
};

