import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Breakpoints",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Responsive breakpoint tokens for mobile, tablet, and desktop layouts. Use these tokens in media queries for responsive design.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Breakpoint tokens from tailwind-theme.css
const breakpoints = [
  { name: "mobile", varName: "breakpoint-mobile", value: "320px", description: "Small mobile devices" },
  { name: "mobile-lg", varName: "breakpoint-mobile-lg", value: "414px", description: "Large mobile devices" },
  { name: "tablet", varName: "breakpoint-tablet", value: "768px", description: "Tablet devices" },
];

// Common breakpoint ranges (not in CSS vars but commonly used)
const commonBreakpoints = [
  { name: "sm", min: "640px", description: "Small screens" },
  { name: "md", min: "768px", description: "Medium screens (tablets)" },
  { name: "lg", min: "1024px", description: "Large screens (desktops)" },
  { name: "xl", min: "1280px", description: "Extra large screens" },
  { name: "2xl", min: "1536px", description: "2X large screens" },
];

const BreakpointExample: React.FC<{ breakpoint: typeof breakpoints[0] }> = ({ breakpoint }) => {
  return (
    <div
      style={{
        padding: 16,
        border: "1px solid var(--border-secondary)",
        borderRadius: 8,
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
        {breakpoint.name}
      </div>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 4, fontFamily: "monospace" }}>
        {breakpoint.value}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
        {breakpoint.description}
      </div>
    </div>
  );
};

export const BreakpointTokens: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Breakpoint Tokens
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          CSS variable breakpoints defined in the design system. These are the minimum widths for different device categories.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {breakpoints.map((breakpoint) => (
          <BreakpointExample key={breakpoint.varName} breakpoint={breakpoint} />
        ))}
      </div>
    </div>
  ),
};

export const CommonBreakpoints: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Common Breakpoint Ranges
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Standard breakpoint ranges commonly used in responsive design (not CSS variables, but recommended values).
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {commonBreakpoints.map((bp) => (
          <div
            key={bp.name}
            style={{
              padding: 16,
              border: "1px solid var(--border-secondary)",
              borderRadius: 8,
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", minWidth: 60 }}>
                {bp.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "monospace", flex: 1 }}>
                min-width: {bp.min}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                {bp.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Usage Guidelines
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            CSS Variables (for reference)
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            Breakpoint tokens are available as CSS variables:
          </p>
          <code
            style={{
              display: "block",
              padding: 12,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`/* Note: CSS variables can't be used directly in media queries */
/* Use the pixel values instead */
@media (min-width: 768px) {
  /* Tablet and up */
}`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Media Query Examples
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Mobile First
              </div>
              <code
                style={{
                  display: "block",
                  padding: 12,
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: "var(--text-primary)",
                }}
              >
                {`/* Base: mobile styles */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
  }
}`}
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Tailwind CSS
              </div>
              <code
                style={{
                  display: "block",
                  padding: 12,
                  backgroundColor: "var(--bg-secondary)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "monospace",
                  color: "var(--text-primary)",
                }}
              >
                {`<div className="p-4 md:p-8 lg:max-w-6xl">
  {/* Responsive padding and max-width */}
</div>`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
