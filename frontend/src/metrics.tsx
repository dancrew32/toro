import * as React from "react";
import { useEffect } from "react";

import { useAppStore } from "./store";
import { get } from "./network";
import { Metric } from "./metric";

import type { MetricType } from "./types";

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

export function Metrics() {
  const { appState } = useAppStore();
  useMetrics();
  if (!appState.currentTableId) {
    return <div>Please select a schema & table to view its metrics.</div>;
  }
  // TODO(DAN): actual loading state
  if (!appState.metrics.length) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Metrics</h3>
      <table className="metric">
        <thead>
          <tr>
            <th>ID</th>
            <th>Column</th>
            <th>Current Value</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody>
          {appState.metrics.map((metric: MetricType) => (
            <Metric key={metric.id} {...metric} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
