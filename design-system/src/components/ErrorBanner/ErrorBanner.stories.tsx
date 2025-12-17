import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBanner } from "./ErrorBanner";

const meta: Meta<typeof ErrorBanner> = {
  title: "designsystem/ErrorBanner",
  component: ErrorBanner,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ErrorBanner>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <ErrorBanner message="Network error. Please try again." onRetry={() => {}} onDismiss={() => {}} />
    </div>
  ),
};

