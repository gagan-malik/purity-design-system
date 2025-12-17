import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SafetyNotice } from "./SafetyNotice";
import { ApprovalCard } from "../ApprovalCard/ApprovalCard";

const meta: Meta<typeof SafetyNotice> = {
  title: "designsystem/SafetyNotice",
  component: SafetyNotice,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SafetyNotice>;

export const Warning: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <SafetyNotice
        variant="warning"
        title="Sensitive action"
        description="This action may modify or delete files. Review carefully before approving."
      />
      <SafetyNotice
        variant="danger"
        title="Requires approval"
        description="The agent requested a destructive operation."
        actions={<ApprovalCard title="Delete files?" risk="high" onApprove={() => {}} onReject={() => {}} />}
      />
    </div>
  ),
};

