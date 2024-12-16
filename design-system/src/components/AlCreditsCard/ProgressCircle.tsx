import React from "react";

interface IProgressCircleProps {
  radius: number;
  stroke: number;
  normalizedRadius: number;
  circumference: number;
  strokeDashoffset: number;
  usedCredits: number;
}

export const ProgressCircle = ({radius, stroke, normalizedRadius, circumference, strokeDashoffset, usedCredits}: IProgressCircleProps) => {
    
    return (
      <>
      <div className="flex items-center w-fit justify-center rounded-full text-text-primary text-2xl font-semibold">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            <circle
              stroke="var(--border-disabled_subtle)" // Trail color
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="var(--bg-brand-solid)" // Path color
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset, strokeLinecap: "round" }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute text-center text-2xl">
            {usedCredits}
            </div>
          </div>
      </>
    )
  }