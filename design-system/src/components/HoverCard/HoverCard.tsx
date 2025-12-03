import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

export interface HoverCardProps {
  /** Trigger element */
  children: React.ReactNode;
  /** Content to show on hover */
  content: React.ReactNode;
  /** Delay before showing (ms) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * HoverCard - Card shown on hover
 * Perfect for user previews and tooltips with rich content
 */
export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  delay = 300,
  className = "",
  testId = "hover-card",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
        setIsOpen(true);
      }
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && cardRef.current && triggerRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      
      let x = triggerRect.left + triggerRect.width / 2;
      let y = triggerRect.top - cardRect.height - 10;

      // Adjust if goes off screen
      if (x + cardRect.width / 2 > window.innerWidth) {
        x = window.innerWidth - cardRect.width / 2 - 10;
      }
      if (x - cardRect.width / 2 < 0) {
        x = cardRect.width / 2 + 10;
      }
      if (y < 0) {
        y = triggerRect.bottom + 10;
      }

      setPosition({ x, y });
    }
  }, [isOpen]);

  return (
    <div
      ref={triggerRef}
      className={classNames("inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={testId}
    >
      {children}

      {isOpen && (
        <div
          ref={cardRef}
          className="fixed z-[9999] bg-bg-primary border border-border-secondary rounded-lg shadow-xl p-4 max-w-sm"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default HoverCard;

