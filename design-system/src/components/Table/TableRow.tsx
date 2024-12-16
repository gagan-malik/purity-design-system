import React from "react";
import { Checkbox } from "../Checkbox";
import { IColumnType } from "./types";
import { TableRowCell } from "./TableRowCell";

interface Props<T> {
  data: T[];
  columns: IColumnType<T>[];
  selectedRows: number[];
  onRowSelect: (index: number) => void;
  startIndex: number;
  multiSelect: boolean;
}

export function TableRow<T>({
  data,
  columns,
  selectedRows,
  onRowSelect,
  startIndex,
  multiSelect
}: Props<T>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => {
        const rowIndex = startIndex + itemIndex;

        return (
          <tr
            key={`table-body-${rowIndex}`}
            className={`${selectedRows.includes(rowIndex) ? "bg-gray-200" : "bg-bg-primary"} hover:bg-bg-primary_hover`}
          >
            <td className="px-6 py-3 flex items-center gap-3">
              {multiSelect && <Checkbox
                id={`row-checkbox-${rowIndex}`}
                checked={selectedRows.includes(rowIndex) ? "basic" : "unchecked"}
                label=""
                onChange={() => onRowSelect(rowIndex)}
              />}
              <TableRowCell
                key={`table-row-cell-first-${rowIndex}`}
                item={item}
                column={columns[0]}
              />
            </td>

            {columns.slice(1).map((column, columnIndex) => (
              <TableRowCell
                key={`table-row-cell-${rowIndex}-${columnIndex}`}
                item={item}
                column={column}
              />
            ))}
          </tr>
        );
      })}
    </>
  );
}
