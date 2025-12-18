import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "../../components/Button";
import { Input } from "../../components/FormInput/Input";
import { Checkbox } from "../../components/Checkbox";
import { Toggle } from "../../components/Toggle";
import { Select } from "../../components/Select";
import { Badge } from "../../components/Badge";
import { Avatar } from "../../components/Avatar";
import { CardDashboard } from "../../components/Card/DashboardCards";
import { Modal } from "../../components/Modal";
import { Accordion } from "../../components/Accordion";
import { Separator } from "../../components/Separator";
import { Skeleton } from "../../components/Skeleton";
import { Slider } from "../../components/Slider";
import { Stepper } from "../../components/Stepper";
import { ProgressBar } from "../../components/ProgressBar";
import { Alert } from "../../components/Alert";
import { ToolTip } from "../../components/ToolTip";
import { Popover } from "../../components/Popover";
import { DropdownMenu } from "../../components/DropdownMenu";
import { NavigationMenu } from "../../components/NavigationMenu";
import { SideNav } from "../../components/SideNav";
import { BottomNav } from "../../components/BottomNav";
import { Table } from "../../components/Table";
import { Pagination } from "../../components/Pagination";
import { BreadCrumb } from "../../components/BreadCrumb";
import { Tabs } from "../../components/SegmentTabs";

const meta: Meta = {
  title: "Components/Showcase",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Visual gallery of all Purity Design System components organized by Atomic Design taxonomy. Click any component to view its detailed documentation.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ComponentCard = ({ title, description, href, children }: { title: string; description?: string; href?: string; children: React.ReactNode }) => (
  <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
    <div style={{ marginBottom: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
        {href ? <a href={href} style={{ color: "inherit", textDecoration: "none" }}>{title}</a> : title}
      </h3>
      {description && <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{description}</p>}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center", minHeight: 60 }}>
      {children}
    </div>
  </div>
);

export const Atoms: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1400 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>Atoms</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          Basic building blocks: buttons, inputs, labels, icons, and other fundamental UI elements.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <ComponentCard title="Button" description="Primary interactive element" href="?path=/story/atoms-button--light-and-dark">
          <Button tone="brand" variant="solid">Primary</Button>
          <Button tone="neutral" variant="outline">Outline</Button>
          <Button tone="danger" variant="solid">Danger</Button>
        </ComponentCard>

        <ComponentCard title="Input" description="Text input fields" href="?path=/story/atoms-input--default">
          <Input label="Email" type="email" placeholder="name@example.com" />
        </ComponentCard>

        <ComponentCard title="Checkbox" description="Binary selection control">
          <Checkbox id="showcase-checkbox" label="Option 1" />
          <Checkbox id="showcase-checkbox-2" label="Option 2" checked />
        </ComponentCard>

        <ComponentCard title="Toggle" description="On/off switch">
          <Toggle id="showcase-toggle" label="Enable" />
          <Toggle id="showcase-toggle-2" label="Enabled" checked />
        </ComponentCard>

        <ComponentCard title="Select" description="Dropdown selection">
          <Select
            options={[
              { id: "1", name: "Option 1" },
              { id: "2", name: "Option 2" },
            ]}
            onClick={() => {}}
          />
        </ComponentCard>

        <ComponentCard title="Badge" description="Status indicator">
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="warning">Warning</Badge>
        </ComponentCard>

        <ComponentCard title="Avatar" description="User profile image">
          <Avatar src="https://via.placeholder.com/40" alt="User" />
          <Avatar alt="User" />
        </ComponentCard>

        <ComponentCard title="Separator" description="Visual divider">
          <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
            <div>Section 1</div>
            <Separator />
            <div>Section 2</div>
          </div>
        </ComponentCard>

        <ComponentCard title="Skeleton" description="Loading placeholder">
          <Skeleton width={100} height={20} />
          <Skeleton width={80} height={20} />
        </ComponentCard>

        <ComponentCard title="Slider" description="Range input">
          <Slider value={50} onValueChange={() => {}} showValue ariaLabel="Value" />
        </ComponentCard>

        <ComponentCard title="Stepper" description="Increment/decrement">
          <Stepper value={5} onValueChange={() => {}} min={0} max={10} />
        </ComponentCard>
      </div>
    </div>
  ),
};

export const Molecules: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1400 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>Molecules</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          Combinations of atoms: form fields with labels, search bars, navigation items, and other composite components.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <ComponentCard title="Input Group" description="Input with icon and actions">
          <Input label="Search" iconUrl="/icons/search.svg" placeholder="Search..." />
        </ComponentCard>

        <ComponentCard title="Button Group" description="Related buttons">
          <div style={{ display: "flex", gap: 8 }}>
            <Button tone="brand" variant="solid">Save</Button>
            <Button tone="neutral" variant="outline">Cancel</Button>
          </div>
        </ComponentCard>

        <ComponentCard title="Form Field" description="Input with label and hint">
          <Input label="Email" type="email" hintText="We'll never share your email" />
        </ComponentCard>

        <ComponentCard title="Alert" description="Notification message">
          <Alert variant="success" message="Operation completed successfully" />
        </ComponentCard>

        <ComponentCard title="Tooltip" description="Contextual help">
          <ToolTip content="This is a tooltip">
            <Button tone="neutral" variant="ghost">Hover me</Button>
          </ToolTip>
        </ComponentCard>

        <ComponentCard title="Popover" description="Floating content">
          <Popover content={<div style={{ padding: 12 }}>Popover content</div>}>
            <Button tone="neutral" variant="outline">Open Popover</Button>
          </Popover>
        </ComponentCard>

        <ComponentCard title="Breadcrumb" description="Navigation path">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Showcase" },
            ]}
          />
        </ComponentCard>

        <ComponentCard title="Progress Bar" description="Progress indicator">
          <ProgressBar value={65} max={100} />
        </ComponentCard>
      </div>
    </div>
  ),
};

export const Organisms: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1400 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>Organisms</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          Complex components: forms, navigation menus, data tables, modals, and other feature-rich components.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
        <ComponentCard title="Card" description="Content container">
          <CardDashboard title="Dashboard Card" gap="md">
            <div style={{ fontSize: 24, fontWeight: 600, color: "var(--text-primary)" }}>12,345</div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>Total users</div>
          </CardDashboard>
        </ComponentCard>

        <ComponentCard title="Modal" description="Dialog overlay">
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Click to open modal (see story for interactive example)</div>
        </ComponentCard>

        <ComponentCard title="Accordion" description="Collapsible sections">
          <Accordion
            items={[
              { id: "1", header: "Section 1", content: "Content for section 1" },
              { id: "2", header: "Section 2", content: "Content for section 2" },
            ]}
          />
        </ComponentCard>

        <ComponentCard title="Navigation Menu" description="Horizontal navigation">
          <NavigationMenu
            items={[
              { label: "Home", href: "/" },
              { label: "Components", href: "/components" },
              { label: "Docs", href: "/docs" },
            ]}
          />
        </ComponentCard>

        <ComponentCard title="Side Navigation" description="Vertical sidebar">
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>See SideNav component story for full example</div>
        </ComponentCard>

        <ComponentCard title="Bottom Navigation" description="Mobile bottom nav">
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>See BottomNav component story for full example</div>
        </ComponentCard>

        <ComponentCard title="Table" description="Data table">
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>See Table component story for full example</div>
        </ComponentCard>

        <ComponentCard title="Tabs" description="Tabbed interface">
          <Tabs
            items={[
              { id: "tab1", label: "Tab 1", content: "Content 1" },
              { id: "tab2", label: "Tab 2", content: "Content 2" },
            ]}
          />
        </ComponentCard>

        <ComponentCard title="Dropdown Menu" description="Context menu">
          <DropdownMenu
            trigger={<Button tone="neutral" variant="outline">Menu</Button>}
            items={[
              { label: "Edit", onClick: () => {} },
              { label: "Delete", onClick: () => {} },
            ]}
          />
        </ComponentCard>

        <ComponentCard title="Pagination" description="Page navigation">
          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </ComponentCard>
      </div>
    </div>
  ),
};

export const AllComponents: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1400 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>Component Showcase</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Complete visual gallery of all Purity Design System components organized by Atomic Design taxonomy.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <a href="?path=/story/components-showcase--atoms" style={{ padding: "8px 16px", backgroundColor: "var(--bg-brand-primary)", color: "var(--text-brand-primary)", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Atoms</a>
          <a href="?path=/story/components-showcase--molecules" style={{ padding: "8px 16px", backgroundColor: "var(--bg-brand-primary)", color: "var(--text-brand-primary)", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Molecules</a>
          <a href="?path=/story/components-showcase--organisms" style={{ padding: "8px 16px", backgroundColor: "var(--bg-brand-primary)", color: "var(--text-brand-primary)", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Organisms</a>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {/* Atoms */}
        <div style={{ gridColumn: "1 / -1", padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>Atoms</h2>
        </div>
        <ComponentCard title="Button" href="?path=/story/atoms-button--light-and-dark">
          <Button tone="brand" variant="solid">Primary</Button>
          <Button tone="neutral" variant="outline">Outline</Button>
        </ComponentCard>
        <ComponentCard title="Input" href="?path=/story/atoms-input--default">
          <Input label="Email" type="email" />
        </ComponentCard>
        <ComponentCard title="Checkbox">
          <Checkbox id="all-checkbox" label="Option" />
        </ComponentCard>
        <ComponentCard title="Toggle">
          <Toggle id="all-toggle" label="Toggle" />
        </ComponentCard>
        <ComponentCard title="Badge">
          <Badge variant="success">Success</Badge>
        </ComponentCard>
        <ComponentCard title="Avatar">
          <Avatar alt="User" />
        </ComponentCard>

        {/* Molecules */}
        <div style={{ gridColumn: "1 / -1", padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginTop: 24, marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>Molecules</h2>
        </div>
        <ComponentCard title="Form Field">
          <Input label="Email" hintText="Helper text" />
        </ComponentCard>
        <ComponentCard title="Alert">
          <Alert variant="success" message="Success message" />
        </ComponentCard>
        <ComponentCard title="Breadcrumb">
          <BreadCrumb items={[{ label: "Home" }, { label: "Current" }]} />
        </ComponentCard>
        <ComponentCard title="Progress Bar">
          <ProgressBar value={65} max={100} />
        </ComponentCard>

        {/* Organisms */}
        <div style={{ gridColumn: "1 / -1", padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginTop: 24, marginBottom: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>Organisms</h2>
        </div>
        <ComponentCard title="Card">
          <CardDashboard title="Card Title" gap="md">
            <div>Card content</div>
          </CardDashboard>
        </ComponentCard>
        <ComponentCard title="Accordion">
          <Accordion items={[{ id: "1", header: "Section", content: "Content" }]} />
        </ComponentCard>
        <ComponentCard title="Tabs">
          <Tabs items={[{ id: "1", label: "Tab", content: "Content" }]} />
        </ComponentCard>
        <ComponentCard title="Pagination">
          <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
        </ComponentCard>
      </div>
    </div>
  ),
};
