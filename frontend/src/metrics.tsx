import * as React from "react";
import { useEffect } from "react";

import { useAppStore } from "./store";
import { get } from "./network";
import { Metric } from "./metric";

import type { ColumnType, TableType, MetricType } from "./types";

function useMetrics() {
  const { appState, appActions } = useAppStore();
  useEffect(() => {
    if (!appState.currentTableId) {
      appActions.setMetrics([]);
      return;
    }
    (async () => {
      // const url = `http://127.0.0.1:5000/metrics/${appState.currentTableId}`;
      const url = `https://interview.torodata.io/metrics/${appState.currentTableId}`;
      const metrics = await get(url);
      appActions.setMetrics(metrics);
      // TODO(DAN): try catch fetch
    })();
  }, [appState.currentTableId]);
}

// Thought it might be nice to augment the metrics response with a type
function getColumnType(currentTable: TableType, name: string): string {
  const column = currentTable.columns.find((column: ColumnType) => column.name === name);
  return column ? column.type : ' ';
}

export function Metrics() {
  const { appState } = useAppStore();
  useMetrics();
  if (!appState.currentTableId) {
    return <div>Please select a schema & table to view its metrics.</div>;
  }
  // TODO(DAN): actual loading state
  if (!appState.metrics.length) {
    return <div>No Metrics.</div>;
  }

  if (!appState.tables.length) {
    return <div>No Tables.</div>;
  }

  const currentTable = appState.tables.find((table: TableType) => {
    return table.id === +appState.currentTableId;
  });

  return (
    <div>
      <h3>
        <span>Metrics:</span> <code>{currentTable.schema}.{currentTable.table}</code>
      </h3>
      <table className="metric">
        <thead>
          <tr>
            <th>ID</th>
            <th>Column</th>
            <th>Type</th>
            <th>Current Value</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody>
          {appState.metrics.map((metric: MetricType) => (
            <Metric key={metric.id} {...metric} columnType={getColumnType(currentTable, metric.column)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
