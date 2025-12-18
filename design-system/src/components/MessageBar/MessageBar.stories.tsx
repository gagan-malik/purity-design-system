import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageBar } from "./MessageBar";
import { Button } from "../Button";

const meta: Meta<typeof MessageBar> = {
  title: "designsystem/MessageBar",
  component: MessageBar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MessageBar>;

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <MessageBar variant="info" message="This is an informational message." onDismiss={() => {}} />
      <MessageBar
        variant="warning"
        message="This action may have side effects."
        actions={<Button size="sm">Review</Button>}
        onDismiss={() => {}}
      />
      <MessageBar variant="error" message="Something went wrong." onDismiss={() => {}} />
    </div>
  ),
};

