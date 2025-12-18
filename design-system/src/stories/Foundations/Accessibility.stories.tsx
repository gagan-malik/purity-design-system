import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button, IconButton } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Toggle } from "../../components/Toggle";
import { Slider } from "../../components/Slider";
import { Rating } from "../../components/Rating";
import { Input } from "../../components/FormInput/Input";
import { Select } from "../../components/Select";
import { Modal } from "../../components/Modal";
import { CardDashboard } from "../../components/Card/DashboardCards";

const meta: Meta = {
  title: "Foundations/Accessibility",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessibility foundations: keyboard interactions, focus management, ARIA usage, screen reader support, and contrast requirements for Purity Design System components.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)" }}>
          Accessibility
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Purity Design System is built with accessibility as a core principle. All components follow WCAG 2.1 Level AA guidelines and are designed to work with keyboard navigation, screen readers, and assistive technologies.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>⌨️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Keyboard Navigation</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            All interactive elements are fully keyboard accessible with logical tab order and keyboard shortcuts.
          </p>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>👁️</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Focus Management</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Visible focus indicators and proper focus management for modals, dropdowns, and dynamic content.
          </p>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🔊</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Screen Reader Support</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            Proper ARIA labels, roles, and live regions for comprehensive screen reader support.
          </p>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🎨</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>Color Contrast</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>
            All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).
          </p>
        </div>
      </div>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Keyboard Navigation Patterns
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        All interactive components support keyboard navigation. Use these patterns consistently across the design system.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Basic Navigation</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong>Tab</strong> - Move forward through interactive elements</li>
            <li><strong>Shift + Tab</strong> - Move backward through interactive elements</li>
            <li><strong>Enter / Space</strong> - Activate buttons, links, and form controls</li>
            <li><strong>Escape</strong> - Close modals, dropdowns, and popovers</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Form Controls</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong>Arrow Keys</strong> - Navigate radio groups, select options, sliders</li>
            <li><strong>Home / End</strong> - Jump to first/last option in lists</li>
            <li><strong>Type to search</strong> - Filter options in searchable selects</li>
            <li><strong>Enter</strong> - Select option in dropdowns</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Complex Components</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong>Command Palette (⌘K)</strong> - Open command menu</li>
            <li><strong>Arrow Keys</strong> - Navigate command menu items</li>
            <li><strong>Tab</strong> - Navigate between form fields</li>
            <li><strong>Escape</strong> - Close any overlay component</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Try It Out</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            Tab through these controls to see keyboard navigation in action:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button tone="brand" variant="solid">Button</Button>
            <Button tone="neutral" variant="outline">Outline</Button>
            <IconButton ariaLabel="Add" tone="brand" icon={<span aria-hidden>＋</span>} />
            <Checkbox id="a11y-kb-checkbox" label="Checkbox" />
            <Toggle id="a11y-kb-toggle" label="Toggle" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const FocusManagement: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Focus Management
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Proper focus management ensures users can navigate efficiently and understand where they are in the interface.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Focus Indicators</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            All interactive elements have visible focus rings using <code style={{ fontFamily: "monospace", fontSize: 12, padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4 }}>var(--ring-ring/50)</code>.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <Button tone="brand" variant="solid">Focus me (Tab)</Button>
            <Button tone="neutral" variant="outline">Focus me (Tab)</Button>
          </div>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Focus Trap</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Modals and dialogs trap focus within the component. Focus returns to the trigger element when closed.
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Focus moves to first focusable element when modal opens</li>
            <li>Tab navigation is trapped within modal</li>
            <li>Escape key closes modal and returns focus</li>
            <li>Focus returns to trigger element after close</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Focus Order</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Tab order follows visual flow: left-to-right, top-to-bottom.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <Input label="First field" placeholder="Tab here first" />
            <Input label="Second field" placeholder="Then here" />
            <div style={{ display: "flex", gap: 12 }}>
              <Button tone="brand" variant="solid">Primary action</Button>
              <Button tone="neutral" variant="outline">Secondary action</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ARIAUsage: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        ARIA Usage
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Components use ARIA attributes to provide semantic information to assistive technologies.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Common ARIA Attributes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <code style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 8px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, display: "block", marginBottom: 4 }}>aria-label</code>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Provides accessible name for icon buttons and decorative elements</p>
            </div>
            <div>
              <code style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 8px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, display: "block", marginBottom: 4 }}>aria-describedby</code>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Links elements to descriptive text (e.g., error messages, hints)</p>
            </div>
            <div>
              <code style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 8px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, display: "block", marginBottom: 4 }}>aria-expanded</code>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Indicates if collapsible content is open or closed</p>
            </div>
            <div>
              <code style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 8px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, display: "block", marginBottom: 4 }}>aria-invalid</code>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Marks form fields with validation errors</p>
            </div>
            <div>
              <code style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 8px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, display: "block", marginBottom: 4 }}>role</code>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Defines semantic role (e.g., dialog, menu, button)</p>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Examples</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 8 }}>Icon button with aria-label:</p>
              <IconButton ariaLabel="Close dialog" tone="neutral" icon={<span aria-hidden>×</span>} />
            </div>
            <div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 8 }}>Input with error state (aria-invalid):</p>
              <Input label="Email" type="email" error hintText="Invalid email address" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ScreenReaderSupport: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Screen Reader Support
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        All components are designed to work with screen readers like NVDA, JAWS, and VoiceOver.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Semantic HTML</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Components use semantic HTML elements where possible:
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><code style={{ fontFamily: "monospace", fontSize: 12 }}>&lt;button&gt;</code> for interactive buttons</li>
            <li><code style={{ fontFamily: "monospace", fontSize: 12 }}>&lt;input&gt;</code> for form inputs</li>
            <li><code style={{ fontFamily: "monospace", fontSize: 12 }}>&lt;nav&gt;</code> for navigation</li>
            <li><code style={{ fontFamily: "monospace", fontSize: 12 }}>&lt;dialog&gt;</code> for modals</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Live Regions</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Dynamic content updates are announced to screen readers:
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Loading states are announced</li>
            <li>Error messages are associated with inputs</li>
            <li>Success messages use <code style={{ fontFamily: "monospace", fontSize: 12 }}>aria-live</code> regions</li>
            <li>Modal open/close states are announced</li>
          </ul>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Labels and Descriptions</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            All form controls have associated labels:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <Input label="Email address" type="email" placeholder="name@example.com" />
            <Input label="Password" type="password" hintText="Must be at least 8 characters" />
            <Select
              label="Country"
              options={[
                { id: "us", name: "United States" },
                { id: "uk", name: "United Kingdom" },
              ]}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ContrastRequirements: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Color Contrast Requirements
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        All text in Purity Design System meets WCAG 2.1 Level AA contrast requirements.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Contrast Ratios</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Normal Text</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>4.5:1 minimum</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Large Text</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>3:1 minimum (18px+ or 14px+ bold)</div>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>UI Components</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>3:1 minimum (icons, borders)</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Component-Specific Contrast</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Buttons</div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Text on button backgrounds meets 4.5:1 contrast</p>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Inputs</div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Input text and labels meet 4.5:1 contrast</p>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Error States</div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Error text uses high-contrast colors for visibility</p>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>Disabled States</div>
              <p style={{ color: "var(--text-secondary)", fontSize: 13, margin: 0 }}>Disabled elements maintain sufficient contrast (not grayed out completely)</p>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Testing Contrast</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Use these tools to verify contrast ratios:
          </p>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><a href="https://webaim.org/resources/contrastchecker/" target="_blank" rel="noreferrer" style={{ color: "var(--text-brand-primary)" }}>WebAIM Contrast Checker</a></li>
            <li><a href="https://www.tpgi.com/color-contrast-checker/" target="_blank" rel="noreferrer" style={{ color: "var(--text-brand-primary)" }}>TPGI Color Contrast Analyzer</a></li>
            <li>Browser DevTools (Chrome Lighthouse, Firefox Accessibility Inspector)</li>
            <li>Storybook a11y addon (automated checks)</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveExamples: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Interactive Examples
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Try keyboard navigation and screen reader announcements with these interactive examples.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Form Controls</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 16 }}>Tab through these controls:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input label="Email" type="email" placeholder="name@example.com" />
            <Input label="Password" type="password" hintText="At least 8 characters" />
            <Checkbox id="a11y-ex-checkbox" label="I agree to the terms" />
            <Toggle id="a11y-ex-toggle" label="Enable notifications" />
            <Slider value={50} onValueChange={() => {}} showValue ariaLabel="Volume" />
          </div>
        </div>

        <div style={{ padding: 20, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>Buttons & Actions</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 16 }}>Try keyboard navigation:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button tone="brand" variant="solid">Primary Action</Button>
            <Button tone="neutral" variant="outline">Secondary Action</Button>
            <Button tone="danger" variant="solid">Destructive Action</Button>
            <IconButton ariaLabel="Add item" tone="brand" icon={<span aria-hidden>＋</span>} />
            <Rating value={4} onValueChange={() => {}} label="Quality rating" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Checklist: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Accessibility Checklist
      </h2>
      <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
        Use this checklist when implementing components to ensure accessibility compliance.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>✅ Keyboard Navigation</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>All interactive elements are keyboard accessible</li>
            <li>Tab order follows visual flow</li>
            <li>Keyboard shortcuts are documented</li>
            <li>Focus is visible on all interactive elements</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>✅ Screen Reader Support</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>All images have alt text or are marked decorative</li>
            <li>Form controls have associated labels</li>
            <li>ARIA attributes are used appropriately</li>
            <li>Dynamic content updates are announced</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>✅ Color & Contrast</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Text meets 4.5:1 contrast ratio (normal text)</li>
            <li>Large text meets 3:1 contrast ratio</li>
            <li>Color is not the only indicator of information</li>
            <li>Focus indicators are clearly visible</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 12, backgroundColor: "var(--bg-primary)" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>✅ Focus Management</h3>
          <ul style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Focus is trapped in modals and dialogs</li>
            <li>Focus returns to trigger after closing overlays</li>
            <li>Focus indicators are visible and consistent</li>
            <li>Focus order is logical and predictable</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
