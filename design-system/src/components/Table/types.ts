export interface IColumnType<T> {
    key: string;
    title: string;
    headerStyle?: string;
    columnStyle?: string;
    render?: (column: IColumnType<T>, item: T) => any;
}

