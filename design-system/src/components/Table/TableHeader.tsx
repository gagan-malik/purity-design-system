import React from "react";
import { IColumnType } from "./types";
import { Checkbox } from "../Checkbox";

interface Props<T> {
  columns: IColumnType<T>[];
  TableTitle: string | JSX.Element;
  selectAll: boolean;
  onSelectAll: (isChecked: boolean) => void;
  multiSelect: boolean;
}

export function TableHeader<T>({
  columns,
  TableTitle,
  selectAll,
  onSelectAll,
  multiSelect
}: Props<T>): JSX.Element {
  return (
    <tr className="bg-bg-secondary">
      <th className={`${multiSelect ? 'px-6' : 'px-9'} py-3.5 text-left text-sm font-semibold text-text-tertiary`}>
        <div className="flex items-center gap-3">
          {multiSelect && <Checkbox
            id="select-all-checkbox"
            checked={selectAll ? "basic" : "unchecked"}
            label=""
              onChange={(newValue) => onSelectAll(newValue === "basic")}
            />}
          {columns[0].title}
        </div>
      </th>

      {columns.slice(1).map((column, index) => (
        <th
          key={`table-header-${index}`}
          className={
            column.headerStyle ||
            "px-3 py-3.5 text-left text-sm font-semibold text-text-tertiary"
          }
        >
          {column.title}
        </th>
      ))}
    </tr>
  );
}
