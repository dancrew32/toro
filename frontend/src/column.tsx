import * as React from "react";

import type { ColumnType } from "./types";

export function Column(props: ColumnType) {
  const { name, type } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
    </tr>
  );
}
