import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Border Radius",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Border radius tokens for consistent rounded corners throughout the design system. Use these tokens for buttons, cards, inputs, and other UI elements.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Border radius tokens from tailwind-theme.css
const radiusTokens = [
  { name: "none", varName: "radius-none", value: "0rem", description: "No border radius" },
  { name: "xxs", varName: "radius-xxs", value: "0.125rem", description: "Extra extra small radius" },
  { name: "xs", varName: "radius-xs", value: "0.25rem", description: "Extra small radius" },
  { name: "sm", varName: "radius-sm", value: "0.375rem", description: "Small radius" },
  { name: "md", varName: "radius-md", value: "0.5rem", description: "Medium radius" },
  { name: "lg", varName: "radius-lg", value: "0.625rem", description: "Large radius" },
  { name: "xl", varName: "radius-xl", value: "0.75rem", description: "Extra large radius" },
  { name: "2xl", varName: "radius-2xl", value: "1rem", description: "2X large radius" },
  { name: "3xl", varName: "radius-3xl", value: "1.25rem", description: "3X large radius" },
  { name: "4xl", varName: "radius-4xl", value: "1.5rem", description: "4X large radius" },
  { name: "5xl", varName: "radius-5xl", value: "1.75rem", description: "5X large radius" },
  { name: "6xl", varName: "radius-6xl", value: "2rem", description: "6X large radius" },
  { name: "full", varName: "radius-full", value: "9999px", description: "Fully rounded (pill/circle)" },
];

const RadiusExample: React.FC<{ token: typeof radiusTokens[0] }> = ({ token }) => {
  const [pixelValue, setPixelValue] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement).getPropertyValue(`--${token.varName}`).trim();
      if (value) {
        if (value.includes("px")) {
          setPixelValue(value);
        } else {
          // Convert rem to pixels (assuming 16px base)
          const remValue = parseFloat(value);
          const pxValue = remValue * 16;
          setPixelValue(`${pxValue}px`);
        }
      }
    }
  }, [token.varName]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          width: "100%",
          height: 80,
          backgroundColor: "var(--bg-brand-primary)",
          borderRadius: `var(--${token.varName})`,
          border: "1px solid var(--border-brand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-brand-primary)",
            textAlign: "center",
          }}
        >
          {token.name}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
          {token.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
          {token.description}
        </div>
        <code
          style={{
            display: "block",
            padding: 8,
            backgroundColor: "var(--bg-secondary)",
            borderRadius: 6,
            fontSize: 11,
            fontFamily: "monospace",
            color: "var(--text-primary)",
          }}
        >
          {token.value} {pixelValue && `(${pixelValue})`}
        </code>
      </div>
    </div>
  );
};

export const RadiusScale: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Border Radius Scale
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Use these radius tokens for consistent rounded corners. All values are in rem units (except "full" which uses pixels).
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 24,
        }}
      >
        {radiusTokens.map((token) => (
          <RadiusExample key={token.varName} token={token} />
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
            Use radius tokens via CSS variables:
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
            {`border-radius: var(--radius-md);
border-radius: var(--radius-lg);`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Common Patterns
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Buttons
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
                border-radius: var(--radius-md);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Cards
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
                border-radius: var(--radius-lg);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Inputs
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
                border-radius: var(--radius-md);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Pills/Badges
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
                border-radius: var(--radius-full);
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
