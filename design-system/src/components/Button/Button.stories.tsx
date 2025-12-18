import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "./Button";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../ThemeToggle";
import { UsageGuidelines } from "../../stories/_shared/UsageGuidelines";
import { DesignSpecs } from "../../stories/_shared/DesignSpecs";
import { ComponentSpecsTable, TokenSpec } from "../../stories/_shared/ComponentSpecsTable";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 space-y-4">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Light and dark mode examples
export const LightAndDark: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Buttons in Light/Dark Mode</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" color="primary">Primary</Button>
          <Button variant="outlined" color="primary">Outlined</Button>
          <Button variant="filled" color="secondary">Secondary</Button>
          <Button variant="outlined" color="secondary">Secondary Outlined</Button>
          <Button variant="filled" color="destructive">Destructive</Button>
          <Button variant="outlined" color="destructive">Destructive Outlined</Button>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">New variants (token-driven)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-secondary">Brand</div>
            <div className="flex flex-wrap gap-3">
              <Button tone="brand" variant="solid">Solid</Button>
              <Button tone="brand" variant="outline">Outline</Button>
              <Button tone="brand" variant="ghost">Ghost</Button>
              <Button tone="brand" variant="link">Link</Button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-xs font-semibold text-text-secondary">Danger</div>
            <div className="flex flex-wrap gap-3">
              <Button tone="danger" variant="solid">Solid</Button>
              <Button tone="danger" variant="outline">Outline</Button>
              <Button tone="danger" variant="ghost">Ghost</Button>
              <Button tone="danger" variant="link">Link</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IconsAndLoading: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Icons + loading</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button tone="brand" startIcon={<span aria-hidden>↗</span>}>Start icon</Button>
          <Button tone="brand" endIcon={<span aria-hidden>→</span>}>End icon</Button>
          <Button tone="brand" loading loadingText="Saving…">Save</Button>
          <Button tone="danger" variant="outline" loading spinnerPlacement="end">Delete</Button>
        </div>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">IconButton</h3>
        <div className="flex gap-3 items-center">
          <IconButton ariaLabel="Add" tone="brand" icon={<span aria-hidden>＋</span>} />
          <IconButton ariaLabel="Settings" tone="neutral" variant="ghost" icon={<span aria-hidden>⚙</span>} />
          <IconButton ariaLabel="Delete" tone="danger" icon={<span aria-hidden>🗑</span>} />
        </div>
      </div>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-text-primary">asChild (polymorphic)</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button asChild tone="brand" variant="solid" startIcon={<span aria-hidden>↗</span>}>
            <a href="#button-as-child">Anchor button</a>
          </Button>
          <Button asChild tone="neutral" variant="outline" disabledReason="You don’t have permission." disabled>
            <a href="#disabled-anchor">Disabled anchor</a>
          </Button>
        </div>
      </div>
    </div>
  ),
};


export const Usage: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>
        Usage Guidelines
      </h2>
      <UsageGuidelines
        whenToUse={[
          "For primary actions that move the user forward in a flow",
          "For submitting forms or confirming actions",
          "For navigation to important pages or sections",
          "When you need a clear call-to-action",
        ]}
        whenNotToUse={[
          "For secondary or tertiary actions (use outlined or ghost variants)",
          "For destructive actions without confirmation (use danger tone with confirmation)",
          "For navigation within the same page (consider using links instead)",
          "For actions that are not immediately available (use disabled state with reason)",
        ]}
        commonMistakes={[
          "Using too many primary buttons on the same page (only one should be primary)",
          "Not providing loading states for async actions",
          "Using buttons for navigation when links would be more appropriate",
          "Not providing accessible labels for icon-only buttons",
          "Using destructive actions without proper confirmation",
        ]}
        alternatives={[
          "Link component for navigation",
          "IconButton for icon-only actions",
          "Toggle or Checkbox for on/off states",
          "Select or Combobox for choosing from options",
        ]}
      />
    </div>
  ),
};

// Button token specifications
const buttonTokens: TokenSpec[] = [
  {
    name: "Primary Background",
    cssVariable: "var(--button-primaryBg)",
    description: "Background color for brand/primary buttons (solid variant)",
    usage: "Used in solid brand buttons",
  },
  {
    name: "Primary Background Hover",
    cssVariable: "var(--button-primaryBgHover)",
    description: "Hover state background for brand/primary buttons",
    usage: "Applied on hover for solid brand buttons",
  },
  {
    name: "Primary Border",
    cssVariable: "var(--button-primaryBorder)",
    description: "Border color for brand/primary buttons",
    usage: "Border for solid and outline brand buttons",
  },
  {
    name: "Primary Text",
    cssVariable: "var(--button-primaryFg)",
    description: "Text color for brand/primary buttons",
    usage: "Text color in solid brand buttons",
  },
  {
    name: "Secondary Background",
    cssVariable: "var(--button-secondaryBg)",
    description: "Background color for neutral/secondary buttons",
    usage: "Used in solid neutral buttons",
  },
  {
    name: "Secondary Text",
    cssVariable: "var(--button-secondaryFg)",
    description: "Text color for neutral/secondary buttons",
    usage: "Text color in solid neutral buttons",
  },
  {
    name: "Tertiary Background Hover",
    cssVariable: "var(--button-tertiaryBgHover)",
    description: "Hover background for ghost buttons",
    usage: "Applied on hover for ghost variant buttons",
  },
  {
    name: "Tertiary Text",
    cssVariable: "var(--button-tertiaryFg)",
    description: "Text color for ghost and link buttons",
    usage: "Text color in ghost and link variant buttons",
  },
  {
    name: "Danger Background",
    cssVariable: "var(--button-dangerBg)",
    description: "Background color for danger buttons (solid variant)",
    usage: "Used in solid danger buttons",
  },
  {
    name: "Danger Text",
    cssVariable: "var(--button-dangerFg)",
    description: "Text color for danger buttons",
    usage: "Text color in danger buttons",
  },
  {
    name: "Focus Ring (Brand)",
    cssVariable: "var(--button-ringBrandShadowSm)",
    description: "Focus ring shadow for brand buttons",
    usage: "Applied on focus for brand buttons",
  },
  {
    name: "Focus Ring (Gray)",
    cssVariable: "var(--button-ringGrayShadowSm)",
    description: "Focus ring shadow for neutral buttons",
    usage: "Applied on focus for neutral buttons",
  },
  {
    name: "Disabled Background",
    cssVariable: "var(--bg-disabled)",
    description: "Background color for disabled buttons",
    usage: "Applied when button is disabled",
  },
  {
    name: "Disabled Text",
    cssVariable: "var(--fg-disabled)",
    description: "Text color for disabled buttons",
    usage: "Text color when button is disabled",
  },
];

export const DesignSpecs: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <DesignSpecs
        component="Button"
        dimensions={{
          minHeight: "44px (touch target minimum)",
          minWidth: "auto (content-based)",
        }}
        spacing={{
          padding: "var(--spacing-md) to var(--spacing-lg) (size-dependent)",
          gap: "var(--spacing-xs) to var(--spacing-sm) (between icon and text)",
          paddingTop: "var(--spacing-sm) to var(--spacing-md)",
          paddingBottom: "var(--spacing-sm) to var(--spacing-md)",
          paddingLeft: "var(--spacing-md) to var(--spacing-lg)",
          paddingRight: "var(--spacing-md) to var(--spacing-lg)",
        }}
        typography={{
          fontSize: "var(--text-sm) (0.875rem)",
          fontWeight: "600 (semibold)",
          lineHeight: "1.5",
          fontFamily: "var(--sans)",
        }}
        colors={{
          background: "var(--button-primaryBg)",
          text: "var(--button-primaryFg)",
          border: "var(--button-primaryBorder)",
          hover: {
            background: "var(--button-primaryBgHover)",
            text: "var(--button-primaryFgHover)",
            border: "var(--button-primaryBorderHover)",
          },
          active: {
            background: "var(--button-primaryBgHover)",
            text: "var(--button-primaryFgHover)",
            border: "var(--button-primaryBorderHover)",
          },
          disabled: {
            background: "var(--bg-disabled)",
            text: "var(--fg-disabled)",
            border: "var(--border-disabled)",
          },
        }}
        states={[
          {
            name: "Default",
            description: "Default button state with primary styling",
            visual: <Button tone="brand" variant="solid">Default Button</Button>,
          },
          {
            name: "Hover",
            description: "Button state when user hovers over it",
            visual: <Button tone="brand" variant="solid">Hover State</Button>,
          },
          {
            name: "Active",
            description: "Button state when being clicked",
            visual: <Button tone="brand" variant="solid">Active State</Button>,
          },
          {
            name: "Focus",
            description: "Button state when focused via keyboard navigation",
            visual: <Button tone="brand" variant="solid">Focus State</Button>,
          },
          {
            name: "Disabled",
            description: "Button state when disabled",
            visual: <Button tone="brand" variant="solid" disabled>Disabled Button</Button>,
          },
          {
            name: "Loading",
            description: "Button state when loading/processing",
            visual: <Button tone="brand" variant="solid" loading>Loading...</Button>,
          },
        ]}
      />

      <div style={{ marginTop: 48 }}>
        <ComponentSpecsTable tokens={buttonTokens} title="Button Token Reference" />
      </div>
    </div>
  ),
};
