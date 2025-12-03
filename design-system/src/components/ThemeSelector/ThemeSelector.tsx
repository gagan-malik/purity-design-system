import React from "react";
import classNames from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../Button";

export interface ThemeSelectorProps {
  /** Show labels */
  showLabels?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes */
  className?: string;
  /** Test ID for testing */
  testId?: string;
}

/**
 * ThemeSelector - Select between light, dark, or system theme
 * Provides full theme control including system preference
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  showLabels = true,
  size = "md",
  className = "",
  testId = "theme-selector",
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={classNames("inline-flex rounded-lg border border-border-secondary p-1", className)}
      role="radiogroup"
      aria-label="Theme selection"
      data-testid={testId}
    >
      <Button
        variant={theme === "light" ? "filled" : "outlined"}
        color={theme === "light" ? "primary" : "secondary"}
        size={size}
        onClick={() => setTheme("light")}
        className="rounded-md"
        aria-label="Light theme"
        aria-pressed={theme === "light"}
      >
        <svg
          className="w-4 h-4"
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
        {showLabels && <span>Light</span>}
      </Button>
      <Button
        variant={theme === "dark" ? "filled" : "outlined"}
        color={theme === "dark" ? "primary" : "secondary"}
        size={size}
        onClick={() => setTheme("dark")}
        className="rounded-md"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
      >
        <svg
          className="w-4 h-4"
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
        {showLabels && <span>Dark</span>}
      </Button>
      <Button
        variant={theme === "system" ? "filled" : "outlined"}
        color={theme === "system" ? "primary" : "secondary"}
        size={size}
        onClick={() => setTheme("system")}
        className="rounded-md"
        aria-label="System theme"
        aria-pressed={theme === "system"}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        {showLabels && <span>System</span>}
      </Button>
    </div>
  );
};

export default ThemeSelector;

