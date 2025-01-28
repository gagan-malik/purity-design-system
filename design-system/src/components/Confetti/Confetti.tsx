import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

export type ConfettiSize = "sm" | "md" | "lg" | "xl" | "2xl" ;

export type ConfettiSpeed = "super-slow" |  "slow" | "medium" | "fast" | "super-fast";

export const Confetti: React.FC<{
  size: ConfettiSize;
  speed: ConfettiSpeed;
  duration?: number;
  width?: number;
  height?: number;
}> = ({
  size = "md",
  speed = "medium",
  duration = 10,
  width,
  height,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const speedValue =  speed === "super-slow" ? 0.01 : speed === "slow" ? 0.1 : speed === "medium" ? 0.2 : speed === "fast" ? 0.3 : speed === "super-fast" ? 0.4 : 0.3;
  const numberOfPieces = size === "sm" ? 100 : size === "md" ? 200 : size === "lg" ? 300 : size === "xl" ? 400 : size === "2xl" ? 500 : 300;
  const confettiWidth = width || window.innerWidth;
  const confettiHeight = height || window.innerHeight;

  return (
    <div className="fixed z-[9999]">
      {isVisible && (
        <ReactConfetti
          width={confettiWidth}
          height={confettiHeight}
          numberOfPieces={numberOfPieces}
          gravity={speedValue}
          // You can add more props to customize the confetti effect
        />
      )}
    </div>
  );
};
