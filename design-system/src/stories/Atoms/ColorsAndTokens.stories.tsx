import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Atoms/Colors & Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Design tokens for colors and semantic tokens. Use semantic tokens (e.g., `bg-bg-primary`, `text-text-primary`) over raw palette values for better theme support.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper to get CSS variable value
const getCSSVar = (varName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return "";
};

// Color palette groups
const colorGroups = [
  {
    name: "Primary",
    vars: ["primary-50", "primary-100", "primary-200", "primary-300", "primary-400", "primary-500", "primary-600", "primary-700", "primary-800", "primary-900"],
  },
  {
    name: "Brand",
    vars: ["brand-25", "brand-50", "brand-100", "brand-200", "brand-300", "brand-400", "brand-500", "brand-600", "brand-700", "brand-800", "brand-900", "brand-950"],
  },
  {
    name: "Gray",
    vars: ["gray-25", "gray-50", "gray-100", "gray-200", "gray-300", "gray-400", "gray-500", "gray-600", "gray-700", "gray-800", "gray-900", "gray-950"],
  },
  {
    name: "Error",
    vars: ["error-25", "error-50", "error-100", "error-200", "error-300", "error-400", "error-500", "error-600", "error-700", "error-800", "error-900", "error-950"],
  },
  {
    name: "Warning",
    vars: ["warning-25", "warning-50", "warning-100", "warning-200", "warning-300", "warning-400", "warning-500", "warning-600", "warning-700", "warning-800", "warning-900", "warning-950"],
  },
  {
    name: "Success",
    vars: ["success-25", "success-50", "success-100", "success-200", "success-300", "success-400", "success-500", "success-600", "success-700", "success-800", "success-900", "success-950"],
  },
  {
    name: "Blue",
    vars: ["blue-25", "blue-50", "blue-100", "blue-200", "blue-300", "blue-400", "blue-500", "blue-600", "blue-700", "blue-800", "blue-900", "blue-950"],
  },
  {
    name: "Green",
    vars: ["green-25", "green-50", "green-100", "green-200", "green-300", "green-400", "green-500", "green-600", "green-700", "green-800", "green-900", "green-950"],
  },
];

// Semantic token groups
const semanticGroups = [
  {
    name: "Text Colors",
    vars: [
      "text-primary",
      "text-secondary",
      "text-tertiary",
      "text-quaternary",
      "text-white",
      "text-disabled",
      "text-placeholder",
      "text-brand-primary",
      "text-error-primary",
      "text-warning-primary",
      "text-success-primary",
    ],
  },
  {
    name: "Background Colors",
    vars: [
      "bg-primary",
      "bg-secondary",
      "bg-tertiary",
      "bg-quaternary",
      "bg-active",
      "bg-disabled",
      "bg-brand-primary",
      "bg-error-primary",
      "bg-warning-primary",
      "bg-success-primary",
    ],
  },
  {
    name: "Border Colors",
    vars: [
      "border-primary",
      "border-secondary",
      "border-tertiary",
      "border-disabled",
      "border-brand",
      "border-error",
    ],
  },
  {
    name: "Foreground Colors",
    vars: [
      "fg-primary",
      "fg-secondary",
      "fg-tertiary",
      "fg-quaternary",
      "fg-white",
      "fg-disabled",
      "fg-brand-primary",
      "fg-error-primary",
      "fg-warning-primary",
      "fg-success-primary",
    ],
  },
];

const ColorSwatch: React.FC<{ varName: string; label?: string }> = ({ varName, label }) => {
  const fullVarName = `--${varName}`;
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    const value = getCSSVar(fullVarName);
    setColor(value || "#000000");
  }, [fullVarName]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          width: "100%",
          height: 64,
          backgroundColor: color ? `var(${fullVarName})` : "#ccc",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 8,
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 500, color: "var(--text-primary)" }}>
        {label || varName}
      </div>
      <div style={{ fontSize: 10, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
        {color || "—"}
      </div>
    </div>
  );
};

export const ColorPalettes: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Color Palettes
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Raw color palette tokens. Use semantic tokens instead for better theme support.
        </p>
      </div>

      {colorGroups.map((group) => (
        <div key={group.name} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            {group.name}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: 16,
            }}
          >
            {group.vars.map((varName) => (
              <ColorSwatch key={varName} varName={varName} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
          Semantic Tokens
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
          Semantic tokens map to colors based on their purpose. These adapt automatically to theme changes.
        </p>
      </div>

      {semanticGroups.map((group) => (
        <div key={group.name} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            {group.name}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 16,
            }}
          >
            {group.vars.map((varName) => (
              <ColorSwatch key={varName} varName={varName} />
            ))}
          </div>
        </div>
      ))}
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
            ✅ Prefer Semantic Tokens
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            Use semantic tokens that describe the purpose of the color:
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
            {`bg-bg-primary
text-text-primary
border-border-secondary`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            ❌ Avoid Raw Palette Values
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            Don't use raw palette values unless building foundational primitives:
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
            {`bg-blue-600
text-gray-900`}
          </code>
        </div>

        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            CSS Variables
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
            All tokens are available as CSS variables:
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
            {`color: var(--text-primary);
background-color: var(--bg-primary);
border-color: var(--border-secondary);`}
          </code>
        </div>
      </div>
    </div>
  ),
};
