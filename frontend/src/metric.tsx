import * as React from "react";

import type { MetricType } from "./types";

export function Metric(props: MetricType) {
  const { column, currentValue, id, metric } = props;
  return (
    <tr>
      <td>{id}</td>
      <td>{column}</td>
      <td>{currentValue}</td>
      <td>{metric}</td>
    </tr>
  );
}
