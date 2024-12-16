import React from "react";
import Badge from "../Badge";

interface IPaymentCardProps {
  amount: number;
  currency: string;
}
export const PaymentCard: React.FC<IPaymentCardProps> = ({
  amount,
  currency,
}) => {
  return (
    <div className="p-4 border border-solid border-gray-200 rounded-2xl flex-col w-full">
      <span className="flex pb-4 text-base font-semibold">Payment due</span>
      <div className="flex justify-between items-center">
        <span className="text-4xl font-semibold	">
          {currency}
          {amount.toFixed(2)}
        </span>
        <div>
          <Badge color="default">No Payment Due</Badge>
        </div>
      </div>
    </div>
  );
};
