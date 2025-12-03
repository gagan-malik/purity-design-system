export interface IColumnType<T> {
    key: string;
    title: string;
    headerStyle?: string;
    columnStyle?: string;
    render?: (column: IColumnType<T>, item: T) => any;
    /** Enable sorting for this column */
    sortable?: boolean;
    /** Custom sort function */
    sortFn?: (a: T, b: T) => number;
    /** Enable filtering for this column */
    filterable?: boolean;
    /** Custom filter function */
    filterFn?: (item: T, filterValue: string) => boolean;
    /** Enable column resizing */
    resizable?: boolean;
    /** Default width for column */
    width?: number;
}

