import * as React from "react";
import { useState } from "react";

import { A } from "hookrouter";
import clsx from "clsx";

import { useAppStore } from "./store";

import type { TableType, ColumnType } from "./types";

import { Column } from "./column";

export function Table(props: TableType) {
  const { appState } = useAppStore();
  const { columns, id, schema, table } = props;
  const [showColumns, setShowColumns] = useState(false);
  return (
    <div>
      <div
        className={clsx("table-schema", {
          "table-schema-active": id === +appState.currentTableId,
        })}
      >
        <A href={`/tables/${id}`}>
          <span>{schema}</span>
          <span>.</span>
          <span>{table}</span>
        </A>
        <Toggle
          open={!showColumns}
          onClick={() => setShowColumns(!showColumns)}
        />
      </div>

      <div
        className={clsx("table-columns", {
          "table-columns-collapsed": !showColumns,
        })}
      >
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {columns.map((column: ColumnType) => (
              <Column key={column.name} {...column} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ToggleProps = {
  open: boolean;
  onClick: any;
};

function Toggle(props: ToggleProps) {
  return (
    <span
      className={clsx("table-columns-toggle", {
        "table-columns-toggle-open": props.open,
      })}
      onClick={props.onClick}
    >
      {">"}
    </span>
  );
}
