import { Meta, StoryObj } from "@storybook/react-webpack5";
import { PaymentCardDetails } from "./PaymentCardDetails";
import { Button } from "../Button/Button";
import React from "react";



const meta: Meta<typeof PaymentCardDetails> = {
  title: "designsystem/PaymentCardDetails",
  component: PaymentCardDetails,
  tags: ["autodocs"],
  args:{}
};



export default meta;
type Story = StoryObj<typeof PaymentCardDetails>;

export const PaymentCardDetailsWithActionButton: Story = {
  args: {
    cardType: "visa",
    last4Digits: "1234",
    expiryDate: "12/2024",
    actions: <Button color="label" variant="outlined" >Delete</Button>,
    state: "default"
  },
};

export const PaymentCardDetailsWithActiveState: Story = {
  args: {
    cardType: "mastercard",
    last4Digits: "1234",
    expiryDate: "12/2024",
    state: "active"
  },
};

export const PaymentCardDetailsWithDisabledState: Story = {
  args: {
    cardType: "amex",
    last4Digits: "1234",
    expiryDate: "12/2024",
    state: "disabled" 
  },
};

