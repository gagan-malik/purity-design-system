import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Shadows",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Shadow tokens for elevation and depth. Use these tokens to create visual hierarchy and indicate interactive elements.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Shadow tokens
const shadowTokens = [
  { name: "xs", varName: "shadow-xs", description: "Extra small shadow for subtle elevation" },
  { name: "sm", varName: "shadow-sm", description: "Small shadow for cards and inputs" },
  { name: "md", varName: "shadow-md", description: "Medium shadow for elevated cards" },
  { name: "lg", varName: "shadow-lg", description: "Large shadow for modals and popovers" },
  { name: "xl", varName: "shadow-xl", description: "Extra large shadow for prominent elements" },
  { name: "2xl", varName: "shadow-2xl", description: "2X large shadow for high elevation" },
  { name: "3xl", varName: "shadow-3xl", description: "3X large shadow for maximum elevation" },
  { name: "modal", varName: "shadow-modal", description: "Special shadow for modal dialogs" },
];

const ShadowExample: React.FC<{ token: typeof shadowTokens[0] }> = ({ token }) => {
  const [shadowValue, setShadowValue] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement).getPropertyValue(`--${token.varName}`).trim();
      setShadowValue(value || "");
    }
  }, [token.varName]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          width: "100%",
          height: 120,
          backgroundColor: "var(--bg-primary)",
          borderRadius: 12,
          boxShadow: shadowValue ? `var(--${token.varName})` : "none",
          border: "1px solid var(--border-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--text-primary)",
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
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
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
            wordBreak: "break-all",
          }}
        >
          {shadowValue || "—"}
        </code>
      </div>
    </div>
  );
};

export const ShadowScale: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Shadow Scale
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Use shadow tokens to create visual hierarchy and indicate elevation. Shadows increase in intensity from xs to 3xl.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {shadowTokens.map((token) => (
          <ShadowExample key={token.varName} token={token} />
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
            Apply shadows using CSS variables:
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
            {`box-shadow: var(--shadow-md);
box-shadow: var(--shadow-lg);`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Common Patterns
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Cards and containers
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
                box-shadow: var(--shadow-sm);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Elevated cards and popovers
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
                box-shadow: var(--shadow-md);
              </code>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: "var(--text-primary)" }}>
                Modals and dialogs
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
                box-shadow: var(--shadow-modal);
              </code>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Elevation Guidelines
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>xs-sm:</strong> Subtle elevation for inputs, buttons
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>md-lg:</strong> Cards, dropdowns, tooltips
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>xl-2xl:</strong> Modals, dialogs, overlays
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>3xl:</strong> Maximum elevation for special cases
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
