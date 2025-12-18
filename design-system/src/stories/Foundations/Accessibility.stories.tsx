import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Toggle } from "../../components/Toggle";
import { Slider } from "../../components/Slider";
import { Rating } from "../../components/Rating";

const meta: Meta = {
  title: "Pages/Foundations/Accessibility",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessibility foundations: keyboard interactions, focus rings, and aria contracts for Purity primitives. This page is designed to be validated with Storybook a11y tooling and automated smoke checks.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Checklist: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Accessibility</h1>
        <p className="text-text-tertiary mt-2">
          If it looks interactive, it must be keyboard-accessible, focus-visible, and correctly labeled.
        </p>
      </div>

      <div className="rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-3">
        <div className="text-sm font-semibold text-text-primary">Try keyboard navigation</div>
        <div className="text-xs text-text-tertiary">
          Tab through controls. Use arrow keys on Slider and Rating. Check that focus is always visible.
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Button tone="brand" variant="solid">Button</Button>
          <Button tone="neutral" variant="outline">Outline</Button>
          <IconButton ariaLabel="Add" tone="brand" icon={<span aria-hidden>＋</span>} />
        </div>
      </div>

      <div className="rounded-3xl border border-border-secondary bg-bg-primary p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-primary">Checkbox</div>
            <Checkbox id="a11y-checkbox" label="Subscribe" checked="indeterminate" />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-primary">Toggle</div>
            <Toggle id="a11y-toggle" label="Enable feature" checked />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-primary">Slider</div>
            <Slider value={40} onValueChange={() => {}} showValue ariaLabel="Volume" />
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-primary">Rating</div>
            <Rating value={3} onValueChange={() => {}} label="Quality" />
          </div>
        </div>
      </div>
    </div>
  ),
};

