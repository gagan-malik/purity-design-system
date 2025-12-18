import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ApprovalCard } from "./ApprovalCard";

const meta: Meta<typeof ApprovalCard> = {
  title: "Organisms/ApprovalCard",
  component: ApprovalCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ApprovalCard>;

export const HighRisk: Story = {
  render: () => (
    <div className="max-w-2xl">
      <ApprovalCard
        title="Approve destructive action"
        risk="high"
        description="The agent is requesting permission to delete 12 files."
        onApprove={() => {}}
        onReject={() => {}}
        approveLabel="Approve delete"
        rejectLabel="Cancel"
      />
    </div>
  ),
};

