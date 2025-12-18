import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BottomNav, IBottomNavItem } from "../../components/BottomNav";
import { MobileSheet } from "../../components/MobileSheet";
import { ActionSheet } from "../../components/ActionSheet";
import { Button } from "../../components/Button";
import { MenuDrawer } from "../../components/Drawer/MenuDrawer";

const meta: Meta = {
  title: "Patterns/MobileNavigation",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: Mobile app navigation patterns including bottom navigation, drawer menus, and action sheets. Optimized for touch interactions and mobile-first design.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock icons (in real app, these would be SVG imports)
const homeIcon = "🏠";
const homeSelectedIcon = "🏡";
const searchIcon = "🔍";
const searchSelectedIcon = "🔎";
const profileIcon = "👤";
const profileSelectedIcon = "👥";
const settingsIcon = "⚙️";
const settingsSelectedIcon = "⚙️";

const bottomNavItems: IBottomNavItem[] = [
  {
    icon: homeIcon,
    iconSelected: homeSelectedIcon,
    label: "Home",
    href: "/",
  },
  {
    icon: searchIcon,
    iconSelected: searchSelectedIcon,
    label: "Search",
    href: "/search",
  },
  {
    icon: profileIcon,
    iconSelected: profileSelectedIcon,
    label: "Profile",
    href: "/profile",
  },
  {
    icon: settingsIcon,
    iconSelected: settingsSelectedIcon,
    label: "Settings",
    onClick: () => alert("Settings clicked"),
  },
];

export const BottomNavigation: Story = {
  render: () => {
    const [activePath, setActivePath] = React.useState("/");

    return (
      <div style={{ maxWidth: 375, margin: "0 auto", minHeight: "100vh", position: "relative", paddingBottom: 64 }}>
        <div style={{ padding: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
            Mobile App
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
            Content area with bottom navigation
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-secondary)",
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                  Content Item {i}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  This is sample content that scrolls above the bottom navigation.
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <BottomNav
            navItems={bottomNavItems.map((item) => ({
              ...item,
              onClick: item.onClick || (() => setActivePath(item.href || "/")),
            }))}
            activePath={activePath}
          />
        </div>
      </div>
    );
  },
};

export const DrawerMenu: Story = {
  render: () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const drawerData = [
      [
        { heading: "NAVIGATION" },
        { title: "Home", subHeading: "Go to home page" },
        { title: "Profile", subHeading: "View your profile" },
        { title: "Settings", subHeading: "App settings" },
      ],
      [
        { title: "Help & Support" },
        { title: "About" },
      ],
    ];

    return (
      <div style={{ padding: 24, maxWidth: 375, margin: "0 auto" }}>
        <Button tone="brand" variant="solid" onClick={() => setDrawerOpen(true)}>
          Open Menu Drawer
        </Button>

        <MenuDrawer
          datas={drawerData as any}
          childern={<div />}
          style={{}}
        />
      </div>
    );
  },
};

export const ActionSheet: Story = {
  render: () => {
    const [sheetOpen, setSheetOpen] = React.useState(false);

    return (
      <div style={{ padding: 24, maxWidth: 375, margin: "0 auto" }}>
        <Button tone="brand" variant="solid" onClick={() => setSheetOpen(true)}>
          Show Action Sheet
        </Button>

        <ActionSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Choose an action"
          actions={[
            { label: "Take Photo", onClick: () => alert("Take Photo") },
            { label: "Choose from Library", onClick: () => alert("Choose from Library") },
            { label: "Cancel", onClick: () => setSheetOpen(false), destructive: true },
          ]}
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
            BottomNav Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Fixed bottom navigation bar with icons and labels. Perfect for primary app navigation.
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<BottomNav navItems={items} activePath="/" />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            MenuDrawer Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Slide-up drawer menu for secondary navigation and actions
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<MenuDrawer datas={menuData} />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            ActionSheet Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Bottom sheet for action selection (iOS-style)
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<ActionSheet open={open} onClose={onClose} actions={actions} />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            MobileSheet Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Flexible bottom sheet for any content (forms, details, etc.)
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<MobileSheet open={open} onClose={onClose}>{content}</MobileSheet>`}
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
            <li>BottomNav is visible and fixed at bottom</li>
            <li>Touch targets are minimum 44px (Apple HIG)</li>
            <li>Drawer menus slide up from bottom</li>
            <li>Action sheets use native iOS/Android patterns</li>
            <li>Safe area insets respected (notch/home indicator)</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Tablet/Desktop (≥ 768px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>BottomNav typically hidden (use SideNav instead)</li>
            <li>Drawer menus may appear as side panels</li>
            <li>Action sheets may appear as modals</li>
            <li>Navigation adapts to larger screen real estate</li>
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
            ✅ Touch Targets
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            All interactive elements meet minimum 44px touch target size (Apple HIG recommendation). Spacing between targets prevents accidental taps.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Screen Reader Support
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Navigation items have proper labels. Drawer and sheet states are announced. Focus management ensures proper navigation flow.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Gesture Support
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Swipe gestures for dismissing drawers and sheets. Haptic feedback for interactions (if available).
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Safe Areas
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Bottom navigation respects safe area insets for devices with home indicators. Content doesn't overlap system UI.
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
            ✅ Use BottomNav for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Primary app navigation (3-5 main sections)</li>
            <li>Mobile-first applications</li>
            <li>Thumb-friendly navigation zones</li>
            <li>Apps with frequent section switching</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Use Drawer/MenuDrawer for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Secondary navigation and settings</li>
            <li>User account menus</li>
            <li>Workspace/project selection</li>
            <li>Contextual actions</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Use ActionSheet for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Quick action selection (photo, share, etc.)</li>
            <li>iOS/Android native-style actions</li>
            <li>Destructive actions with confirmation</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ❌ Don't use mobile navigation for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Desktop-only applications (use SideNav or NavigationMenu)</li>
            <li>Complex navigation hierarchies (use SideNav with nesting)</li>
            <li>Web applications that aren't mobile-first</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
