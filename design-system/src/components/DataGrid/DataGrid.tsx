import React from "react";
import { Table } from "../Table";
import type { IColumnType } from "../Table/types";

export interface DataGridProps<T> {
  data: T[];
  columns: IColumnType<T>[];
  title?: string | JSX.Element;
  /** Enable sorting */
  sortable?: boolean;
  /** Enable filtering */
  filterable?: boolean;
  /** Enable column resizing */
  resizable?: boolean;
  /** Enable multi row select */
  multiSelect?: boolean;
  className?: string;
  testId?: string;
}

export function DataGrid<T>({
  data,
  columns,
  title = "DataGrid",
  sortable = true,
  filterable = true,
  resizable = false,
  multiSelect = true,
  className,
  testId = "data-grid",
}: DataGridProps<T>) {
  return (
    <div className={className} data-testid={testId}>
      <Table
        data={data}
        columns={columns}
        TableTitle={title}
        sortable={sortable}
        filterable={filterable}
        resizable={resizable}
        multiSelect={multiSelect}
        paginationEnabled={false}
        showTopSection={true}
        mobileView="table"
      />
    </div>
  );
}

export default DataGrid;

