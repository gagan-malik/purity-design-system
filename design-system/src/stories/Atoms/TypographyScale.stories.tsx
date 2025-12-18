import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Typography Scale",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typography scale tokens for consistent text styling. These tokens define font sizes, weights, and line heights used throughout the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Typography scale - based on common design system patterns
const typographyScale = [
  { name: "xs", fontSize: "0.75rem", lineHeight: "1rem", description: "Extra small text" },
  { name: "sm", fontSize: "0.875rem", lineHeight: "1.25rem", description: "Small text" },
  { name: "base", fontSize: "1rem", lineHeight: "1.5rem", description: "Base text" },
  { name: "lg", fontSize: "1.125rem", lineHeight: "1.75rem", description: "Large text" },
  { name: "xl", fontSize: "1.25rem", lineHeight: "1.75rem", description: "Extra large text" },
  { name: "2xl", fontSize: "1.5rem", lineHeight: "2rem", description: "2X large text" },
  { name: "3xl", fontSize: "1.875rem", lineHeight: "2.25rem", description: "3X large text" },
  { name: "4xl", fontSize: "2.25rem", lineHeight: "2.5rem", description: "4X large text" },
  { name: "5xl", fontSize: "3rem", lineHeight: "1", description: "5X large text" },
  { name: "6xl", fontSize: "3.75rem", lineHeight: "1", description: "6X large text" },
];

const fontWeights = [
  { name: "thin", value: "100", description: "Thin weight" },
  { name: "extralight", value: "200", description: "Extra light weight" },
  { name: "light", value: "300", description: "Light weight" },
  { name: "normal", value: "400", description: "Normal weight" },
  { name: "medium", value: "500", description: "Medium weight" },
  { name: "semibold", value: "600", description: "Semibold weight" },
  { name: "bold", value: "700", description: "Bold weight" },
  { name: "extrabold", value: "800", description: "Extra bold weight" },
  { name: "black", value: "900", description: "Black weight" },
];

const TypographyExample: React.FC<{ scale: typeof typographyScale[0] }> = ({ scale }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
      <div
        style={{
          fontSize: scale.fontSize,
          lineHeight: scale.lineHeight,
          fontWeight: 400,
          color: "var(--text-primary)",
        }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
        {scale.name}: {scale.fontSize} / {scale.lineHeight}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>
        {scale.description}
      </div>
    </div>
  );
};

export const FontSizes: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Typography Scale
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Font size and line height combinations for consistent typography throughout the design system.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {typographyScale.map((scale) => (
          <TypographyExample key={scale.name} scale={scale} />
        ))}
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Font Weights
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Available font weights for text styling.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fontWeights.map((weight) => (
          <div
            key={weight.name}
            style={{
              padding: 16,
              border: "1px solid var(--border-secondary)",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: parseInt(weight.value),
                color: "var(--text-primary)",
                marginBottom: 8,
              }}
            >
              The quick brown fox
            </div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
              {weight.name}: {weight.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
              {weight.description}
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
            Common Patterns
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Headings
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
                {`h1: 3xl (1.875rem) / semibold
h2: 2xl (1.5rem) / semibold
h3: xl (1.25rem) / semibold
h4: lg (1.125rem) / medium`}
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Body Text
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
                {`body: base (1rem) / normal
small: sm (0.875rem) / normal
caption: xs (0.75rem) / normal`}
              </code>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            CSS Usage
          </h3>
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
            {`font-size: 1rem; /* base */
line-height: 1.5rem;
font-weight: 400; /* normal */`}
          </code>
        </div>
      </div>
    </div>
  ),
};
