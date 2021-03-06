export interface ColumnDefinition {
  headerName: string;
  field?: string;
  sortable?: boolean;
  filter?: boolean;
  valueGetter?: Function;
  width?: number;
  cellRenderer?: any;
  cellRendererParams?: any;
}
