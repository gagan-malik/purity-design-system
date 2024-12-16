import React from "react";
import { IColumnType } from "./types";

interface Props<T> {
  item: T;
  column: IColumnType<T>;
}

export function TableRowCell<T>({ item, column }: Props<T>): JSX.Element {
  return (
    <td className={column.columnStyle}>
      {column.render 
        ? column.render(column, item) 
        : <div>{(item as any)[column.key] ?? ''}</div>}
    </td>
  );
}
