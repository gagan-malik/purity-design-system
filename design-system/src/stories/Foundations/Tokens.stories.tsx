import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comprehensive design token reference for the Purity Design System. All tokens are available as CSS variables and can be used throughout your application for consistent styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
          Design Tokens
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Design tokens are the visual design atoms of the design system. They define colors, spacing, typography, shadows, and more. All tokens are available as CSS variables and can be used throughout your application.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {/* Colors & Tokens */}
        <a
          href="?path=/story/atoms-colors--tokens-color-palettes"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            🎨 Colors & Tokens
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Color palettes and semantic tokens for backgrounds, text, borders, and foregrounds.
          </div>
        </a>

        {/* Typography Scale */}
        <a
          href="?path=/story/atoms-typography-scale--font-sizes"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            📝 Typography Scale
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Font sizes, line heights, and font weights for consistent typography.
          </div>
        </a>

        {/* Spacing */}
        <a
          href="?path=/story/atoms-spacing--spacing-scale"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            📏 Spacing
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Spacing scale tokens for margins, padding, and gaps (none through 11xl).
          </div>
        </a>

        {/* Shadows */}
        <a
          href="?path=/story/atoms-shadows--shadow-scale"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            🌑 Shadows
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Shadow tokens for elevation and depth (xs through 3xl, plus modal).
          </div>
        </a>

        {/* Border Radius */}
        <a
          href="?path=/story/atoms-border-radius--radius-scale"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            ⭕ Border Radius
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Border radius tokens for rounded corners (none through 6xl, plus full).
          </div>
        </a>

        {/* Breakpoints */}
        <a
          href="?path=/story/atoms-breakpoints--breakpoint-tokens"
          style={{
            display: "block",
            padding: 24,
            border: "1px solid var(--border-secondary)",
            borderRadius: 12,
            backgroundColor: "var(--bg-primary)",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-brand)";
            e.currentTarget.style.backgroundColor = "var(--bg-brand-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-secondary)";
            e.currentTarget.style.backgroundColor = "var(--bg-primary)";
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            📱 Breakpoints
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Responsive breakpoint tokens for mobile, tablet, and desktop layouts.
          </div>
        </a>
      </div>

      <div style={{ marginTop: 48, padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-secondary)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
          How to Use Tokens
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
              CSS Variables
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
              All tokens are available as CSS variables prefixed with <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>--</code>:
            </p>
            <code
              style={{
                display: "block",
                padding: 16,
                backgroundColor: "var(--bg-primary)",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "monospace",
                color: "var(--text-primary)",
              }}
            >
              {`color: var(--text-primary);
background-color: var(--bg-primary);
border-color: var(--border-secondary);
padding: var(--spacing-md);
border-radius: var(--radius-md);
box-shadow: var(--shadow-sm);`}
            </code>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
              Semantic Tokens
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
              Always prefer semantic tokens (e.g., <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>--text-primary</code>) over raw palette values (e.g., <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>--gray-900</code>) for better theme support and maintainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const QuickReference: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>
        Token Quick Reference
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {/* Colors */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Colors
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
            <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Text</div>
              <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                --text-primary, --text-secondary, --text-tertiary
              </code>
            </div>
            <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Background</div>
              <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                --bg-primary, --bg-secondary, --bg-tertiary
              </code>
            </div>
            <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Border</div>
              <code style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
                --border-primary, --border-secondary, --border-tertiary
              </code>
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Spacing
          </h2>
          <code
            style={{
              display: "block",
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`--spacing-none (0rem)
--spacing-xs (0.25rem) → --spacing-11xl (10rem)`}
          </code>
        </div>

        {/* Typography */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Typography
          </h2>
          <code
            style={{
              display: "block",
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`Font sizes: xs (0.75rem) → 6xl (3.75rem)
Font weights: 100 (thin) → 900 (black)
Line heights: 1rem → 2.5rem`}
          </code>
        </div>

        {/* Shadows */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Shadows
          </h2>
          <code
            style={{
              display: "block",
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`--shadow-xs, --shadow-sm, --shadow-md,
--shadow-lg, --shadow-xl, --shadow-2xl,
--shadow-3xl, --shadow-modal`}
          </code>
        </div>

        {/* Border Radius */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Border Radius
          </h2>
          <code
            style={{
              display: "block",
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`--radius-none (0rem) → --radius-6xl (2rem)
--radius-full (9999px)`}
          </code>
        </div>

        {/* Breakpoints */}
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Breakpoints
          </h2>
          <code
            style={{
              display: "block",
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            {`--breakpoint-mobile: 320px
--breakpoint-mobile-lg: 414px
--breakpoint-tablet: 768px`}
          </code>
        </div>
      </div>
    </div>
  ),
};
