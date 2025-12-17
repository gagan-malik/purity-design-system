import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModelSelector } from "./ModelSelector";

const meta: Meta<typeof ModelSelector> = {
  title: "designsystem/ModelSelector",
  component: ModelSelector,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("gpt-4.1");
    return (
      <div className="max-w-xl">
        <ModelSelector
          value={value}
          onChange={setValue}
          models={[
            { id: "gpt-4.1", label: "GPT-4.1", description: "Best quality", contextWindow: 128000, badge: "recommended" },
            { id: "gpt-4.1-mini", label: "GPT-4.1 mini", description: "Fast + cheap", contextWindow: 128000 },
            { id: "local-small", label: "Local small", description: "Offline", contextWindow: 8000, badge: "beta" },
          ]}
        />
      </div>
    );
  },
};

