import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "../../components/Button";

const meta: Meta = {
  title: "Foundations/Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Welcome to the Purity Design System. This overview introduces the design system's mission, principles, and how to get started.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Mission: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
          Purity Design System
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
          Making product UI <strong>faster to build</strong>, <strong>consistent by default</strong>, and <strong>accessible</strong> without every team re-solving the same problems.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🧩</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Components</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Production-ready UI building blocks: buttons, inputs, navigation, overlays, charts, and more.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🎨</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Theme System</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Light/dark/system themes with persistence, all built on CSS variables.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🎯</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Design Tokens</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Comprehensive token system implemented as CSS variables for consistent styling.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>📚</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Storybook</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Live component catalog, documentation site, and visual regression testing surface.
          </p>
        </div>
      </div>

      <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-secondary)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>What This Is Not</h2>
        <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Not a "one-size-fits-all" UI kit that hides implementation details</li>
          <li>Not a generic style guide; this is a <strong>shipping</strong> library with versioning and release discipline</li>
        </ul>
      </div>
    </div>
  ),
};

export const Principles: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          Design Principles
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          Team-wide defaults that guide how we build and use the design system.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            🎯 Consistency beats cleverness
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Follow existing patterns unless there's a measured reason to change. Consistency across the product creates a cohesive user experience.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            🧩 Composition first
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Small primitives + predictable props; avoid prop explosions. Build complex UIs by composing simple, reusable components.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            🎨 Tokens over raw values
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Prefer semantic tokens (<code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>bg-bg-primary</code>) over literal colors (<code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>#ffffff</code>) for better theme support and maintainability.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            ♿ Accessible by construction
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Keyboard navigation, focus management, and ARIA requirements are part of the definition of done. Every component is accessible by default.
          </p>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            📱 Mobile-aware
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Touch targets, spacing, and interaction affordances are deliberate. Minimum touch target size is 44px (Apple HIG recommendation).
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ComponentPhilosophy: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          Component Philosophy
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Inspired by shadcn/ui's approach: components are <strong>plain React components</strong> with a predictable contract.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
            Readable Code
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Components are written in plain React and TypeScript. You can read the source code to understand how they work, modify them for your needs, and learn from them.
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
            {`// Components live in src/components/
// Each component is self-contained
// Source code is your documentation`}
          </code>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
            Token-First Styling
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            All styling uses design tokens (CSS variables). This ensures consistency and makes theming straightforward.
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
            {`// Use semantic tokens
className="bg-bg-primary text-text-primary"

// Not raw values
className="bg-white text-gray-900"`}
          </code>
        </div>

        <div style={{ padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
            Predictable API
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Components follow consistent naming conventions. Props like <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>variant</code>, <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>size</code>, and <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>disabled</code> work the same way across components.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="filled" color="primary">Primary</Button>
            <Button variant="outlined" color="primary">Outlined</Button>
            <Button variant="filled" color="primary" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const GettingStarted: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
          Getting Started
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          Quick links to help you get started with the Purity Design System.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        <a
          href="?path=/story/foundations-tokens--overview"
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
            🎯 Design Tokens
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Explore all design tokens: colors, spacing, typography, shadows, and more.
          </div>
        </a>

        <a
          href="?path=/story/atomic-overview--default"
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
            ⚛️ Components
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Browse all components organized by Atomic Design taxonomy.
          </div>
        </a>

        <a
          href="?path=/story/pages-foundations-theming--overview"
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
            🎨 Theming
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Learn about the theme system: light/dark modes, accent colors, and customization.
          </div>
        </a>

        <a
          href="?path=/story/pages-foundations-accessibility--checklist"
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
            ♿ Accessibility
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Understand accessibility requirements and keyboard navigation patterns.
          </div>
        </a>

        <a
          href="?path=/story/pages-patterns-forms--reference"
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
            📋 Patterns
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
            See real-world patterns and component combinations in action.
          </div>
        </a>
      </div>

      <div style={{ marginTop: 48, padding: 24, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-secondary)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
          Installation & Setup
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
          To use the Purity Design System in your project:
        </p>
        <ol style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 }}>
          <li>Install the package: <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>npm install @purity/design-system</code></li>
          <li>Import the CSS: <code style={{ fontFamily: "monospace", fontSize: 12, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>import '@purity/design-system/styles'</code></li>
          <li>Wrap your app with ThemeProvider</li>
          <li>Start using components!</li>
        </ol>
        <p style={{ color: "var(--text-tertiary)", fontSize: 12 }}>
          See the documentation in <code style={{ fontFamily: "monospace", fontSize: 11, backgroundColor: "var(--bg-primary)", padding: "2px 6px", borderRadius: 4 }}>design-system/docs/getting-started.md</code> for detailed setup instructions.
        </p>
      </div>
    </div>
  ),
};
