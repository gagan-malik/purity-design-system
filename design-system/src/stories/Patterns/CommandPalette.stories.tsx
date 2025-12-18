import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CommandMenu, CommandMenuItem } from "../../components/CommandMenu";
import { Button } from "../../components/Button";
import { Kbd } from "../../components/Kbd";

const meta: Meta = {
  title: "Patterns/CommandPalette",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: Command palette (Cmd+K style) for quick actions, navigation, and search. Provides keyboard-first interface for power users.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const commandItems: CommandMenuItem[] = [
  // Navigation
  { id: "nav-home", label: "Go to Home", group: "Navigation", keywords: ["home", "dashboard"], onSelect: () => alert("Navigate to Home") },
  { id: "nav-components", label: "Go to Components", group: "Navigation", keywords: ["components", "ui"], onSelect: () => alert("Navigate to Components") },
  { id: "nav-settings", label: "Go to Settings", group: "Navigation", keywords: ["settings", "preferences"], onSelect: () => alert("Navigate to Settings") },
  
  // Actions
  { id: "action-new", label: "Create New Document", group: "Actions", keywords: ["new", "create", "document"], onSelect: () => alert("Create new document") },
  { id: "action-save", label: "Save", group: "Actions", keywords: ["save", "store"], onSelect: () => alert("Save") },
  { id: "action-export", label: "Export Data", group: "Actions", keywords: ["export", "download"], onSelect: () => alert("Export data") },
  
  // Search
  { id: "search-users", label: "Search Users", group: "Search", keywords: ["users", "people"], onSelect: () => alert("Search users") },
  { id: "search-files", label: "Search Files", group: "Search", keywords: ["files", "documents"], onSelect: () => alert("Search files") },
  
  // Settings
  { id: "settings-theme", label: "Toggle Theme", group: "Settings", keywords: ["theme", "dark", "light"], onSelect: () => alert("Toggle theme") },
  { id: "settings-profile", label: "Edit Profile", group: "Settings", keywords: ["profile", "account"], onSelect: () => alert("Edit profile") },
];

export const Reference: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
      <div style={{ padding: 24, maxWidth: 800 }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Command Palette
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
            Press <Kbd>⌘K</Kbd> (or <Kbd>Ctrl+K</Kbd> on Windows/Linux) to open the command palette
          </p>
          <Button tone="brand" variant="solid" onClick={() => setOpen(true)}>
            Open Command Palette
          </Button>
        </div>

        <CommandMenu
          open={open}
          onClose={() => setOpen(false)}
          items={commandItems}
          placeholder="Type a command or search..."
        />
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
            CommandMenu Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Core command palette component with search, grouping, and keyboard navigation
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<CommandMenu open={open} onClose={onClose} items={items} />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Keyboard Shortcut Handler
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Global keyboard listener for Cmd+K / Ctrl+K to open palette
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    setOpen(true);
  }
});`}
          </code>
        </div>
      </div>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 800 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        Keyboard Navigation
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Kbd>⌘K</Kbd> or <Kbd>Ctrl+K</Kbd>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
              Open/Close Command Palette
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Toggle the command palette from anywhere in the application
          </div>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
              Navigate Items
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Move selection up and down through filtered results
          </div>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Kbd>Enter</Kbd>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
              Execute Command
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Execute the currently selected command
          </div>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Kbd>Esc</Kbd>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
              Close Palette
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Close the command palette without executing
          </div>
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
            ✅ Keyboard-First Design
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Command palette is designed for keyboard navigation. All actions are accessible via keyboard shortcuts.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Focus Management
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            When opened, focus automatically moves to the search input. Focus is trapped within the palette.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Screen Reader Support
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Menu items are properly labeled. Search results and selected items are announced. Groups are identified.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Visual Feedback
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Selected item is highlighted. Search results update in real-time. Loading states are indicated.
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
            <li>Quick actions and shortcuts (Cmd+K style)</li>
            <li>Navigation to different pages/sections</li>
            <li>Searching across application features</li>
            <li>Power user workflows</li>
            <li>Applications with many actions/commands</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ❌ Don't use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Simple navigation (use NavigationMenu instead)</li>
            <li>Context-specific actions (use ContextMenu instead)</li>
            <li>Mobile-only interfaces (use BottomNav or Sheet)</li>
            <li>Applications with very few actions</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
