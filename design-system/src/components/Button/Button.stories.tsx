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
  parameters: {
    // Figma design link - add your Figma file URL here
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/YOUR_FILE_ID/Button-Design',
    // },
  },
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

// Button token specifications - showcasing ALL design system tokens used
const buttonTokens: TokenSpec[] = [
  // Spacing Tokens
  {
    name: "Spacing - XS",
    cssVariable: "var(--spacing-xs)",
    description: "Extra small spacing (0.25rem = 4px) - used for gap between icon and text",
    usage: "Gap between icon and text in buttons",
  },
  {
    name: "Spacing - SM",
    cssVariable: "var(--spacing-sm)",
    description: "Small spacing (0.375rem = 6px) - used for gap in large buttons",
    usage: "Gap in large size buttons",
  },
  {
    name: "Spacing - MD",
    cssVariable: "var(--spacing-md)",
    description: "Medium spacing (0.5rem = 8px) - used for padding",
    usage: "Vertical padding in small/medium buttons",
  },
  {
    name: "Spacing - LG",
    cssVariable: "var(--spacing-lg)",
    description: "Large spacing (0.75rem = 12px) - used for padding",
    usage: "Horizontal padding in xs/sm buttons, vertical in md buttons",
  },
  {
    name: "Spacing - XL",
    cssVariable: "var(--spacing-xl)",
    description: "Extra large spacing (1rem = 16px) - used for padding",
    usage: "Horizontal padding in medium buttons",
  },
  {
    name: "Spacing - 2XL",
    cssVariable: "var(--spacing-2xl)",
    description: "2X large spacing (1.25rem = 20px) - used for padding",
    usage: "Horizontal padding in large buttons",
  },
  // Radius Tokens
  {
    name: "Radius - MD",
    cssVariable: "var(--radius-md)",
    description: "Medium border radius (0.5rem = 8px) - default button radius",
    usage: "Default border radius for square buttons",
  },
  {
    name: "Radius - Full",
    cssVariable: "var(--radius-full)",
    description: "Full border radius (9999px) - for circular buttons",
    usage: "Border radius for circle shape buttons",
  },
  // Shadow Tokens
  {
    name: "Shadow - SM",
    cssVariable: "var(--shadow-sm)",
    description: "Small shadow - used for solid buttons",
    usage: "Default shadow for solid variant buttons",
  },
  {
    name: "Shadow - MD",
    cssVariable: "var(--shadow-md)",
    description: "Medium shadow - used on hover",
    usage: "Shadow on hover state for solid buttons",
  },
  // Color Tokens - Brand
  {
    name: "Background - Brand Solid",
    cssVariable: "var(--bg-brand-solid)",
    description: "Brand solid background color",
    usage: "Background for brand solid buttons",
  },
  {
    name: "Background - Brand Solid Hover",
    cssVariable: "var(--bg-brand-solid_hover)",
    description: "Brand solid background on hover",
    usage: "Hover background for brand solid buttons",
  },
  {
    name: "Background - Brand Primary",
    cssVariable: "var(--bg-brand-primary)",
    description: "Brand primary background (subtle)",
    usage: "Hover background for brand outline/ghost buttons",
  },
  {
    name: "Foreground - Brand Primary",
    cssVariable: "var(--fg-brand-primary)",
    description: "Brand primary foreground/text color",
    usage: "Text color for brand outline/ghost/link buttons",
  },
  {
    name: "Border - Brand Solid",
    cssVariable: "var(--border-brand_solid)",
    description: "Brand solid border color",
    usage: "Border for brand outline buttons",
  },
  {
    name: "Text - Primary On Brand",
    cssVariable: "var(--text-primary_on_brand)",
    description: "Primary text color on brand background",
    usage: "Text color for brand solid buttons",
  },
  // Color Tokens - Neutral
  {
    name: "Background - Secondary Solid",
    cssVariable: "var(--bg-secondary_solid)",
    description: "Secondary solid background color",
    usage: "Background for neutral solid buttons",
  },
  {
    name: "Background - Secondary",
    cssVariable: "var(--bg-secondary)",
    description: "Secondary background (subtle)",
    usage: "Hover background for neutral outline/ghost buttons",
  },
  {
    name: "Background - Secondary Hover",
    cssVariable: "var(--bg-secondary_hover)",
    description: "Secondary background on hover",
    usage: "Hover background for neutral solid buttons",
  },
  {
    name: "Foreground - Primary",
    cssVariable: "var(--fg-primary)",
    description: "Primary foreground/text color",
    usage: "Text color for neutral buttons",
  },
  {
    name: "Border - Primary",
    cssVariable: "var(--border-primary)",
    description: "Primary border color",
    usage: "Border for neutral solid/outline buttons",
  },
  {
    name: "Border - Secondary",
    cssVariable: "var(--border-secondary)",
    description: "Secondary border color",
    usage: "Hover border for neutral buttons",
  },
  {
    name: "Text - Primary",
    cssVariable: "var(--text-primary)",
    description: "Primary text color",
    usage: "Text color for neutral solid buttons",
  },
  // Color Tokens - Danger
  {
    name: "Background - Error Solid",
    cssVariable: "var(--bg-error-solid)",
    description: "Error solid background color",
    usage: "Background for danger solid buttons",
  },
  {
    name: "Background - Error Primary",
    cssVariable: "var(--bg-error-primary)",
    description: "Error primary background (subtle)",
    usage: "Hover background for danger outline/ghost buttons",
  },
  {
    name: "Foreground - Error Primary",
    cssVariable: "var(--fg-error-primary)",
    description: "Error primary foreground/text color",
    usage: "Text color for danger outline/ghost/link buttons",
  },
  {
    name: "Border - Error Solid",
    cssVariable: "var(--border-error_solid)",
    description: "Error solid border color",
    usage: "Border for danger outline buttons",
  },
  // Focus Ring Tokens
  {
    name: "Focus Ring - Brand",
    cssVariable: "var(--ring-brand-shadow-sm)",
    description: "Focus ring shadow for brand buttons",
    usage: "Applied on focus-visible for brand buttons",
  },
  {
    name: "Focus Ring - Gray",
    cssVariable: "var(--ring-gray-shadow-sm)",
    description: "Focus ring shadow for neutral buttons",
    usage: "Applied on focus-visible for neutral buttons",
  },
  {
    name: "Focus Ring - Error",
    cssVariable: "var(--ring-error-shadow-sm)",
    description: "Focus ring shadow for danger buttons",
    usage: "Applied on focus-visible for danger buttons",
  },
  // Disabled Tokens
  {
    name: "Background - Disabled",
    cssVariable: "var(--bg-disabled)",
    description: "Background color for disabled buttons",
    usage: "Applied when button is disabled",
  },
  {
    name: "Foreground - Disabled",
    cssVariable: "var(--fg-disabled)",
    description: "Text color for disabled buttons",
    usage: "Text color when button is disabled",
  },
  {
    name: "Border - Disabled Subtle",
    cssVariable: "var(--border-disabled_subtle)",
    description: "Border color for disabled buttons",
    usage: "Border when button is disabled",
  },
  // Touch Target Tokens
  {
    name: "Touch Target - Min",
    cssVariable: "var(--touch-target-min)",
    description: "Minimum touch target size (44px)",
    usage: "Minimum height/width for accessible buttons",
  },
  {
    name: "Touch Target - Comfortable",
    cssVariable: "var(--touch-target-comfortable)",
    description: "Comfortable touch target size (48px)",
    usage: "Larger touch target for better accessibility",
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
          padding: "var(--spacing-md) to var(--spacing-2xl) (size-dependent)",
          gap: "var(--spacing-xs) to var(--spacing-sm) (between icon and text)",
          paddingTop: "var(--spacing-md) to var(--spacing-lg)",
          paddingBottom: "var(--spacing-md) to var(--spacing-lg)",
          paddingLeft: "var(--spacing-lg) to var(--spacing-2xl)",
          paddingRight: "var(--spacing-lg) to var(--spacing-2xl)",
          minHeight: "var(--touch-target-min) or var(--touch-target-comfortable)",
        }}
        typography={{
          fontSize: "text-sm (0.875rem) for xs/sm/md, text-base (1rem) for lg",
          fontWeight: "600 (semibold)",
          lineHeight: "1.5",
          fontFamily: "Inter (via --sans token)",
        }}
        colors={{
          background: "var(--bg-brand-solid) / var(--bg-secondary_solid) / var(--bg-error-solid)",
          text: "var(--text-primary_on_brand) / var(--text-primary) / var(--fg-brand-primary) / var(--fg-error-primary)",
          border: "var(--bg-brand-solid) / var(--border-primary) / var(--border-brand_solid) / var(--border-error_solid)",
          hover: {
            background: "var(--bg-brand-solid_hover) / var(--bg-secondary_hover) / var(--bg-brand-primary) / var(--bg-error-primary)",
            text: "var(--text-primary_on_brand) / var(--fg-brand-primary) / var(--fg-error-primary)",
            border: "var(--bg-brand-solid_hover) / var(--border-secondary) / var(--border-error_solid)",
            shadow: "var(--shadow-md)",
          },
          active: {
            background: "var(--bg-brand-solid_hover) / var(--bg-secondary_hover)",
            text: "var(--text-primary_on_brand) / var(--text-primary)",
            border: "var(--bg-brand-solid_hover) / var(--border-secondary)",
            transform: "scale(0.98)",
          },
          disabled: {
            background: "var(--bg-disabled)",
            text: "var(--fg-disabled)",
            border: "var(--border-disabled_subtle)",
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
        <ComponentSpecsTable tokens={buttonTokens} title="Button Token Reference - All Design System Tokens Used" />
      </div>
    </div>
  ),
};

// New story showcasing all token categories
export const TokenShowcase: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1200 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24, color: "var(--text-primary)" }}>
        Design System Tokens Used in Button
      </h2>
      
      {/* Spacing Tokens */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          📏 Spacing Tokens
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-xs</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>0.25rem (4px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Gap between icon and text</div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-sm</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>0.375rem (6px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Gap in large buttons</div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-md</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>0.5rem (8px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Vertical padding</div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-lg</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>0.75rem (12px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Horizontal padding</div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-xl</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>1rem (16px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Medium button padding</div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>--spacing-2xl</div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>1.25rem (20px)</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4 }}>Large button padding</div>
          </div>
        </div>
      </div>

      {/* Radius Tokens */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          ⭕ Radius Tokens
        </h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Button tone="brand" variant="solid" shape="square">Square (--radius-md)</Button>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>var(--radius-md) = 0.5rem</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <Button tone="brand" variant="solid" shape="circle">○</Button>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>var(--radius-full) = 9999px</div>
          </div>
        </div>
      </div>

      {/* Shadow Tokens */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          🌑 Shadow Tokens
        </h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Button tone="brand" variant="solid">Default (--shadow-sm)</Button>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>var(--shadow-sm)</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Button tone="brand" variant="solid">Hover (--shadow-md)</Button>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>var(--shadow-md) on hover</div>
          </div>
        </div>
      </div>

      {/* Color Tokens */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          🎨 Color Tokens (Semantic)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Brand</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button tone="brand" variant="solid" size="sm">Solid</Button>
              <Button tone="brand" variant="outline" size="sm">Outline</Button>
              <Button tone="brand" variant="ghost" size="sm">Ghost</Button>
              <Button tone="brand" variant="link" size="sm">Link</Button>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 12 }}>
              Uses: --bg-brand-solid, --fg-brand-primary, --border-brand_solid
            </div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Neutral</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button tone="neutral" variant="solid" size="sm">Solid</Button>
              <Button tone="neutral" variant="outline" size="sm">Outline</Button>
              <Button tone="neutral" variant="ghost" size="sm">Ghost</Button>
              <Button tone="neutral" variant="link" size="sm">Link</Button>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 12 }}>
              Uses: --bg-secondary_solid, --fg-primary, --border-primary
            </div>
          </div>
          <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Danger</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button tone="danger" variant="solid" size="sm">Solid</Button>
              <Button tone="danger" variant="outline" size="sm">Outline</Button>
              <Button tone="danger" variant="ghost" size="sm">Ghost</Button>
              <Button tone="danger" variant="link" size="sm">Link</Button>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 12 }}>
              Uses: --bg-error-solid, --fg-error-primary, --border-error_solid
            </div>
          </div>
        </div>
      </div>

      {/* Size Tokens */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
          📐 Size Tokens
        </h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <Button tone="brand" variant="solid" size="xs">XS</Button>
          <Button tone="brand" variant="solid" size="sm">SM</Button>
          <Button tone="brand" variant="solid" size="md">MD</Button>
          <Button tone="brand" variant="solid" size="lg">LG</Button>
          <Button tone="brand" variant="solid" size="mini">○</Button>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 12 }}>
          All sizes use spacing tokens for padding and gap. Minimum height: var(--touch-target-min) = 44px
        </div>
      </div>
    </div>
  ),
};
