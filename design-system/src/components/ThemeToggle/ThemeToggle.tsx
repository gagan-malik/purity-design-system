import React from "react";
import classNames from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../Button";

export interface ThemeToggleProps {
  /** Show labels */
  showLabel?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ThemeToggle - Toggle between light and dark themes
 * Provides a simple UI control for theme switching
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  size = "md",
  className = "",
  testId = "theme-toggle",
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="outlined"
      color="secondary"
      size={size}
      className={classNames("gap-2", className)}
      data-testid={testId}
      aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    >
      {resolvedTheme === "light" ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          {showLabel && <span>Dark Mode</span>}
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          {showLabel && <span>Light Mode</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;

