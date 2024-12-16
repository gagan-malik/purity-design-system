import React from "react";
import { ProgressCircle } from "./ProgressCircle";

interface IBillingCardProps {
  totalCredits: number;
  usedCredits: number;
  title: string;
  description?: string;
  button?: React.ReactNode;
  isExpended: boolean;
  showProgressCircle?: boolean;
}

export const AlCreditsCard: React.FC<IBillingCardProps> = ({
  title,
  description,
  totalCredits,
  usedCredits,
  button,
  isExpended,
  showProgressCircle = false,
}) => {
  const radius = 35; // Radius of the circle
  const stroke = 6; // Stroke width
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = (usedCredits / totalCredits) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <>
      {isExpended ? (
        <div
          className={`flex flex-col bg-bg-primary hover:bg-bg-secondary p-4 rounded-4xl w-full`}
        >
          <div className="flex gap-1 items-center -mt-4 -ml-4">
            <div>
              <ProgressCircle
                radius={radius}
                stroke={stroke}
                normalizedRadius={normalizedRadius}
                circumference={circumference}
                strokeDashoffset={strokeDashoffset}
                usedCredits={usedCredits}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-text-primary text-sm font-semibold">
                {title}
              </span>
              <span className="text-text-secondary text-xs font-regular">
                {description}
              </span>
            </div>
          </div>
          <div className="flex justify-end -mt-3">
          {button}
          </div>
        </div>
      ) : showProgressCircle ? (
        <ProgressCircle
          radius={radius}
          stroke={stroke}
          normalizedRadius={normalizedRadius}
          circumference={circumference}
          strokeDashoffset={strokeDashoffset}
          usedCredits={usedCredits}
        />
      ) : (
        <div className="text-text-primary text-2xl w-12 h-12 font-semibold bg-bg-secondary rounded-full flex items-center justify-center">
          {usedCredits}
        </div>
      )}
    </>
  );
};

export default AlCreditsCard;
