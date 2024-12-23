import React, { useState } from "react";
import { Badge } from "../..";

import star from "../../assets/icons/star.svg";

interface IPlan {
  id: string | number;
  name: string;
  description: string;
  is_active?: boolean;
  amount?: string | number;
  validity_days?: number;
}
interface IPlanList {
  plans: IPlan[];
  onSelect: (plan: IPlan) => void;
  activePlanID ?: string | number;
}

const PlanList: React.FC<IPlanList> = ({ plans, onSelect, activePlanID}) => {
  const [selectedPlan, setSelectedPlan] = useState(
    activePlanID ? activePlanID : plans.length > 0 ? plans[0]?.id : null );

  const handlePlanChanage = (plan: IPlan) => {
    if (!plan.is_active) return;
    setSelectedPlan(plan.id);
    onSelect(plan);
  };
  return (
    <section className="flex flex-col gap-5 w-full overflow-hidden">
      {plans.map((plan) => (
        <div
          onClick={() => handlePlanChanage(plan)}
          key={plan.id}
          className={`rounded-4xl ${
            selectedPlan === plan.id ? " bg-gradient" : "bg-bg-secondary"
          } p-[1px]`}
        >
          <div
            className={`flex flex-col p-3 gap-1 rounded-4xl ${
              !plan.is_active
                ? "bg-bg-disabled_subtle border border-border-disabled"
                : "bg-bg-primary cursor-pointer"
            }`}
          >
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="text-text-secondary font-semibold">
                    {plan.name}
                  </p>
                  {!plan.is_active && (
                    <Badge color="primary" variant="filled" size="xs" border={false}>
                      Upcoming
                    </Badge>
                  )}
                </div>

                <input
                  className={`${plan.is_active ?  (selectedPlan === plan.id ? "" : "bg-bg-primary") : "bg-bg-disabled_subtle"}`}
                  name="plan"
                  type="radio"
                  disabled={!plan.is_active}
                  checked={selectedPlan === plan.id}
                  onChange={() => handlePlanChanage(plan)}
                />
              </div>

              {plan.is_active ? (
                <div className="text-text-tertiary font-regular">{`$${plan.amount} per member / month`}</div>
              ) : null}
            </div>
        </div>
      ))}
    </section>
  );
};

export default PlanList;
