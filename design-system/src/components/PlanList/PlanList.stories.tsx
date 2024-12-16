import { Meta, StoryObj } from "@storybook/react";
import { PlanList as ListPlan } from "../index";
import React from "react";
const meta: Meta<typeof ListPlan> = {
  title: "designsystem/PlanList",
  component: ListPlan,
  tags: ["autodocs"],
  args: {
    plans: [
      {
        id: 1,
        name: "Starter",
        amount: 0,
        description: "Starter",
        is_active: true,
        validity_days: 30,
      },
      {
        id: 2,
        name: "Plus",
        amount: 49.99,
        description: "Plus",
        is_active: true,
        validity_days: 30,
      },
      {
        id: 3,
        name: "Enterprise",
        amount: 99.99,
        description: "Enterprise",
        is_active: false,
        validity_days: 30,
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ListPlan>;

export const Base: Story = {};
