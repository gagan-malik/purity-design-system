import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import type { IColumnType } from "../Table/types";

type Row = { id: number; name: string; status: string };

const meta: Meta<typeof DataGrid<Row>> = {
  title: "Organisms/DataGrid",
  component: DataGrid as any,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof DataGrid<Row>>;

export const Default: Story = {
  render: () => {
    const data: Row[] = [
      { id: 1, name: "Alpha", status: "active" },
      { id: 2, name: "Beta", status: "paused" },
      { id: 3, name: "Gamma", status: "active" },
    ];

    const columns: IColumnType<Row>[] = [
      { key: "id", title: "ID", sortable: true },
      { key: "name", title: "Name", sortable: true, filterable: true },
      { key: "status", title: "Status", sortable: true, filterable: true },
    ];

    return (
      <div className="max-w-5xl">
        <DataGrid data={data} columns={columns} title="Projects" sortable filterable />
      </div>
    );
  },
};

