import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Spacing",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Spacing scale tokens for consistent spacing throughout the design system. Use these tokens for margins, padding, and gaps.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Spacing scale tokens
const spacingTokens = [
  { name: "none", varName: "spacing-none", value: "0rem" },
  { name: "xxs", varName: "spacing-xxs", value: "0.125rem" },
  { name: "xs", varName: "spacing-xs", value: "0.25rem" },
  { name: "sm", varName: "spacing-sm", value: "0.375rem" },
  { name: "md", varName: "spacing-md", value: "0.5rem" },
  { name: "lg", varName: "spacing-lg", value: "0.75rem" },
  { name: "xl", varName: "spacing-xl", value: "1rem" },
  { name: "2xl", varName: "spacing-2xl", value: "1.25rem" },
  { name: "3xl", varName: "spacing-3xl", value: "1.5rem" },
  { name: "4xl", varName: "spacing-4xl", value: "2rem" },
  { name: "5xl", varName: "spacing-5xl", value: "2.5rem" },
  { name: "6xl", varName: "spacing-6xl", value: "3rem" },
  { name: "7xl", varName: "spacing-7xl", value: "4rem" },
  { name: "8xl", varName: "spacing-8xl", value: "5rem" },
  { name: "9xl", varName: "spacing-9xl", value: "6rem" },
  { name: "10xl", varName: "spacing-10xl", value: "8rem" },
  { name: "11xl", varName: "spacing-11xl", value: "10rem" },
];

const SpacingExample: React.FC<{ token: typeof spacingTokens[0] }> = ({ token }) => {
  const [pixelValue, setPixelValue] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement).getPropertyValue(`--${token.varName}`).trim();
      if (value) {
        // Convert rem to pixels (assuming 16px base)
        const remValue = parseFloat(value);
        const pxValue = remValue * 16;
        setPixelValue(`${pxValue}px`);
      }
    }
  }, [token.varName]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: `var(--${token.varName})`,
            height: `var(--${token.varName})`,
            minWidth: `var(--${token.varName})`,
            minHeight: `var(--${token.varName})`,
            backgroundColor: "var(--bg-brand-primary)",
            border: "1px solid var(--border-brand)",
            borderRadius: 4,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
            {token.name}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
            {token.value} {pixelValue && `(${pixelValue})`}
          </div>
        </div>
      </div>
      <div
        style={{
          height: 2,
          backgroundColor: "var(--bg-secondary)",
          borderRadius: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            width: `var(--${token.varName})`,
            height: "100%",
            backgroundColor: "var(--bg-brand-solid)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
};

export const SpacingScale: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Spacing Scale
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Use these spacing tokens for consistent spacing throughout your designs. All values are in rem units.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {spacingTokens.map((token) => (
          <SpacingExample key={token.varName} token={token} />
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
            CSS Variables
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            Use spacing tokens via CSS variables:
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
            {`padding: var(--spacing-md);
margin: var(--spacing-lg);
gap: var(--spacing-xl);`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Common Patterns
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Component padding
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
                padding: var(--spacing-lg);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Gap between items
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
                gap: var(--spacing-md);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Section spacing
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
                margin-bottom: var(--spacing-4xl);
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
