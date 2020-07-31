export type ColumnType = {
  name: string;
  type: string;
};

export type TableType = {
  columns: Array<ColumnType>;
  id: number;
  schema: string;
  table: string;
};

export type MetricType = {
  column: string;
  currentValue: number;
  id: number;
  metric: string;
};
