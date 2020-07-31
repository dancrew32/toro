import * as React from "react";

import type { MetricType } from "./types";

export function Metric(props: MetricType) {
  const { column, currentValue, columnType, id, metric } = props;
  return (
    <tr>
      <td>{id}</td>
      <td>{column}</td>
      <td>{columnType}</td>
      <td>{currentValue}</td>
      <td>{metric}</td>
    </tr>
  );
}
