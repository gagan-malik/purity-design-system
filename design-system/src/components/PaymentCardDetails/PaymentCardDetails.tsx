import React from "react";
import visa from "../../assets/icons/payment/visa.svg";
import mastercard from "../../assets/icons/payment/mastercard.svg";
import applePay from "../../assets/icons/payment/applePay.svg";
import gPay from "../../assets/icons/payment/gPay.svg";
import klarna from "../../assets/icons/payment/klarna.svg";
import shopPay from "../../assets/icons/payment/shopPay.svg";
import amex from "../../assets/icons/payment/amex.svg";

interface IPaymentCardDetailsProps {
  cardType:
    | "visa"
    | "mastercard"
    | "applePay"
    | "gPay"
    | "klarna"
    | "shopPay"
    | "amex"
    | string
    | React.ReactNode;
  last4Digits: string;
  expiryDate: string;
  state?: "default" | "active" | "disabled";
  actions?: React.ReactNode;
}

export const PaymentCardDetails: React.FC<IPaymentCardDetailsProps> = ({
  cardType,
  last4Digits,
  expiryDate,
  actions,
  state = "default"
}) => {
  const stateClass = {
    default: "bg-bg-primary hover:bg-bg-primary_hover",
    active: "bg-bg-active",
    disabled: "bg-bg-primary cursor-not-allowed opacity-50"
  }

  const cardTypeIcon = {
    visa: visa,
    mastercard: mastercard,
    applePay: applePay,
    gPay: gPay,
    klarna: klarna,
    shopPay: shopPay,
    amex: amex
  }
  return (
    <div className={`flex justify-between gap-2 rounded-4xl p-4 ${stateClass[state]}`}>
      <div className="flex gap-4">
        <div>
          {typeof cardType === "string" ? (
            <img src={cardTypeIcon[cardType as keyof typeof cardTypeIcon]} alt={cardType} className="h-11 w-auto"></img>
          ) : (
            cardType
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-text-primary text-base font-medium">
            Card ending in {last4Digits}
          </div>
          <div className="text-text-tertiary text-sm font-regular">
            Expiry {expiryDate}
          </div>
        </div>
      </div>
      {actions}
    </div>
  );
};
