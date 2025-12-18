import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PathStepper } from "./PathStepper";

const meta: Meta<typeof PathStepper> = {
  title: "Organisms/PathStepper",
  component: PathStepper,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof PathStepper>;

export const Default: Story = {
  render: () => {
    const [current, setCurrent] = React.useState("plan");
    return (
      <div className="max-w-3xl">
        <PathStepper
          currentId={current}
          onChange={setCurrent}
          steps={[
            { id: "plan", label: "Plan" },
            { id: "tools", label: "Tools" },
            { id: "review", label: "Review" },
            { id: "ship", label: "Ship" },
          ]}
        />
      </div>
    );
  },
};

