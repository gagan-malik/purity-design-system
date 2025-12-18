import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import CardDashboard from "../../components/Card/DashboardCards/DashboardCard";
import { AreaChart } from "../../components/AreaChart";
import { PieChart } from "../../components/PieChart";
import { Button } from "../../components/Button";
import { SideNav } from "../../components/SideNav";

const meta: Meta = {
  title: "Patterns/Dashboard",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: Dashboard layout with cards, charts, navigation, and responsive grid. Use this as a reference for building dashboard interfaces.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const areaChartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const pieChartData = [
  { label: "Type 1", value: 200, color: "#0E9384" },
  { label: "Type 2", value: 300, color: "#4A1FB8" },
  { label: "Type 3", value: 400, color: "#06B6D4" },
  { label: "Type 4", value: 500, color: "#194185" },
];

export const Reference: Story = {
  render: () => {
    const [selectedNav, setSelectedNav] = React.useState("dashboard");

    return (
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--bg-secondary)" }}>
        {/* Sidebar Navigation */}
        <div style={{ width: 240, borderRight: "1px solid var(--border-secondary)", padding: 16 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)" }}>Dashboard</h2>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["dashboard", "analytics", "reports", "settings"].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedNav(item)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: selectedNav === item ? "var(--bg-brand-primary)" : "transparent",
                  color: selectedNav === item ? "var(--text-brand-primary)" : "var(--text-secondary)",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: selectedNav === item ? 600 : 400,
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
              Dashboard
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              Overview of your data and metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <CardDashboard title="Total Users" gap="md">
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text-primary)" }}>12,345</div>
              <div style={{ fontSize: 14, color: "var(--text-success-primary)", marginTop: 8 }}>
                +12.5% from last month
              </div>
            </CardDashboard>

            <CardDashboard title="Revenue" gap="md">
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text-primary)" }}>$45,678</div>
              <div style={{ fontSize: 14, color: "var(--text-success-primary)", marginTop: 8 }}>
                +8.2% from last month
              </div>
            </CardDashboard>

            <CardDashboard title="Active Sessions" gap="md">
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text-primary)" }}>1,234</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8 }}>
                Currently active
              </div>
            </CardDashboard>

            <CardDashboard title="Conversion Rate" gap="md">
              <div style={{ fontSize: 32, fontWeight: 700, color: "var(--text-primary)" }}>3.24%</div>
              <div style={{ fontSize: 14, color: "var(--text-error-primary)", marginTop: 8 }}>
                -2.1% from last month
              </div>
            </CardDashboard>
          </div>

          {/* Charts Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <CardDashboard title="Revenue Trend" gap="md">
              <AreaChart data={areaChartData} height={200} />
            </CardDashboard>

            <CardDashboard title="Distribution" gap="md">
              <PieChart isDonutChart data={pieChartData} />
            </CardDashboard>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Button tone="neutral" variant="outline">
              Export Report
            </Button>
            <Button tone="brand" variant="solid">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const ComponentBreakdown: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Component Breakdown
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            CardDashboard Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Container for dashboard content sections (stats, charts, data)
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<CardDashboard title="Stats" gap="md">{content}</CardDashboard>`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Chart Components
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            AreaChart, PieChart, and other visualization components for data display
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<AreaChart data={data} height={200} />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Navigation Components
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            SideNav or custom navigation for dashboard sections
          </div>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Grid Layout
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            CSS Grid for responsive card layouts
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`}
          </code>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveBehavior: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Responsive Behavior
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Mobile (< 768px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Sidebar collapses to drawer/menu</li>
            <li>Cards stack vertically (1 column)</li>
            <li>Charts adapt to full width</li>
            <li>Action buttons stack vertically</li>
            <li>Touch-friendly spacing and targets</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Tablet (768px - 1024px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>2-3 columns for stat cards</li>
            <li>Charts in 2-column grid</li>
            <li>Sidebar may be collapsible</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Desktop (≥ 1024px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>4+ columns for stat cards</li>
            <li>Sidebar always visible</li>
            <li>Charts in 2-column grid</li>
            <li>Optimal spacing and padding</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Accessibility Notes
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Keyboard Navigation
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            All interactive elements (navigation, buttons, cards) are keyboard accessible. Tab order follows visual flow.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Chart Accessibility
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Charts include alt text and data tables for screen readers. Color is not the only indicator of information.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Focus Management
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Focus rings are visible on all interactive elements. Focus moves logically through dashboard sections.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Screen Reader Support
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            All cards and sections have proper headings and labels. Navigation is properly structured.
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WhenToUse: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        When to Use
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Admin dashboards and analytics pages</li>
            <li>Data visualization interfaces</li>
            <li>Overview pages with multiple metrics</li>
            <li>Executive summaries and reports</li>
            <li>Monitoring and status dashboards</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ❌ Don't use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Simple content pages (use standard layout)</li>
            <li>Mobile-first apps (use MobileNavigation pattern)</li>
            <li>Single-purpose interfaces</li>
            <li>Forms or wizards (use Forms pattern)</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
