import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Table } from "../../components/Table";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import type { IColumnType } from "../../components/Table/types";

const meta: Meta = {
  title: "Patterns/DataTable",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pattern: Data table with filters, search, pagination, and sorting. Use this pattern for displaying large datasets with interactive controls.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
}

const sampleUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", lastActive: "2025-12-18" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", lastActive: "2025-12-17" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "inactive", lastActive: "2025-12-15" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "active", lastActive: "2025-12-18" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "active", lastActive: "2025-12-16" },
];

const columns: IColumnType<User>[] = [
  {
    key: "name",
    title: "Name",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-primary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-primary",
    sortable: true,
  },
  {
    key: "email",
    title: "Email",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-primary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-secondary",
    sortable: true,
    filterable: true,
  },
  {
    key: "role",
    title: "Role",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-primary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-primary",
    sortable: true,
    filterable: true,
  },
  {
    key: "status",
    title: "Status",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-primary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm",
    render: (_, item) => (
      <span
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 500,
          backgroundColor: item.status === "active" ? "var(--bg-success-primary)" : "var(--bg-error-primary)",
          color: item.status === "active" ? "var(--text-success-primary)" : "var(--text-error-primary)",
        }}
      >
        {item.status}
      </span>
    ),
  },
  {
    key: "lastActive",
    title: "Last Active",
    headerStyle: "px-3 py-3.5 text-left text-sm font-semibold text-text-primary",
    columnStyle: "whitespace-nowrap px-3 py-4 text-sm text-text-secondary",
    sortable: true,
  },
];

export const Reference: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;

    const filteredData = sampleUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Users
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            Manage user accounts and permissions
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px", minWidth: 200 }}>
              <SearchInput
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button tone="brand" variant="solid">
              Add User
            </Button>
            <Button tone="neutral" variant="outline">
              Export
            </Button>
          </div>
        </div>

        <Table
          data={paginatedData}
          columns={columns}
          TableTitle="User List"
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          paginationEnabled={true}
          sortable={true}
          filterable={true}
          multiSelect={true}
          showTopSection={true}
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
            Table Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Core table component with sorting, filtering, and pagination
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<Table data={data} columns={columns} sortable filterable />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            SearchInput Component
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Global search across table data
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<SearchInput placeholder="Search..." onChange={handleSearch} />`}
          </code>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Button Components
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 8 }}>
            Action buttons for table operations (Add, Export, Delete, etc.)
          </div>
          <code style={{ fontSize: 12, fontFamily: "monospace", color: "var(--text-tertiary)" }}>
            {`<Button tone="brand" variant="solid">Add User</Button>`}
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
            <li>Table switches to card view (mobileView="cards")</li>
            <li>Search bar becomes full-width</li>
            <li>Action buttons stack vertically</li>
            <li>Pagination controls adapt to touch targets</li>
            <li>Swipe actions available on cards (if configured)</li>
          </ul>
        </div>

        <div style={{ padding: 16, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>
            Desktop (≥ 768px)
          </div>
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Full table view with all columns visible</li>
            <li>Horizontal layout for search and actions</li>
            <li>Column sorting and filtering enabled</li>
            <li>Multi-select checkboxes for bulk actions</li>
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
            Table is fully keyboard navigable. Use Tab to move between controls, Arrow keys to navigate cells, Enter to sort/filter.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Screen Reader Support
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Table headers are properly labeled. Sort states and filter values are announced. Pagination controls are accessible.
          </div>
        </div>

        <div style={{ padding: 12, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ✅ Focus Management
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Focus rings are visible on all interactive elements. Focus moves logically through table cells and controls.
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
            <li>Displaying large datasets (10+ rows)</li>
            <li>Data that needs sorting and filtering</li>
            <li>User management interfaces</li>
            <li>Admin dashboards and data tables</li>
            <li>Any tabular data requiring search and pagination</li>
          </ul>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--border-secondary)", borderRadius: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>
            ❌ Don't use this pattern for:
          </div>
          <ul style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Simple lists (use Item or List components)</li>
            <li>Small datasets (< 10 items)</li>
            <li>Non-tabular data (use Card grid instead)</li>
            <li>Read-only displays without interaction</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};
