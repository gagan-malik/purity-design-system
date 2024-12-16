import { Meta, StoryObj } from "@storybook/react";
import { PaymentCard } from "./index";
const meta: Meta<typeof PaymentCard> = {
  title: "designsystem/PaymentCard",
  component: PaymentCard,
  tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<typeof PaymentCard>;

export const Unchecked: Story = {
  args: {
    amount:0,
    currency:"$"
  },
};

