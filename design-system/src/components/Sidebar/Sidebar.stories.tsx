import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuItem,
} from "./Sidebar";
import { ThemeProvider } from "../../contexts/ThemeContext";
// Simple SVG icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
  </svg>
);
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Organisms/Sidebar",
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-96 border border-border rounded-lg overflow-hidden">
      <Sidebar>
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Navigation</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup label="Main">
            <SidebarMenuItem href="#" active icon={<HomeIcon />}>
              Home
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<SearchIcon />}>
              Search
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<FileTextIcon />}>
              Documents
            </SidebarMenuItem>
          </SidebarGroup>
          <SidebarGroup label="Account">
            <SidebarMenuItem href="#" icon={<UserIcon />}>
              Profile
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<MailIcon />}>
              Messages
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<SettingsIcon />}>
              Settings
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-muted-foreground">
            Version 1.0.0
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  ),
};

export const Inset: Story = {
  render: () => (
    <div className="h-96 border border-border rounded-lg overflow-hidden">
      <Sidebar variant="inset">
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Navigation</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenuItem href="#" active icon={<HomeIcon />}>
              Home
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<SearchIcon />}>
              Search
            </SidebarMenuItem>
            <SidebarMenuItem href="#" icon={<FileTextIcon />}>
              Documents
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  ),
};
