import * as React from "react";
import { useEffect, useState } from "react";

import { useAppStore } from "./store";
import { get } from "./network";
import { Table } from "./table";

import type { TableType } from "./types";

function useTableList() {
  const { appActions } = useAppStore();
  useEffect(() => {
    (async () => {
      // const url = "http://127.0.0.1:5000/tables";
      const url = "https://interview.torodata.io/tables";
      const tables = await get(url);
      appActions.setTables(tables);
      // TODO(DAN): try catch error handling
    })();
  }, []);
}

function formatSchemaTable(table: TableType) {
  return `${table.schema}.${table.table}`;
}

export function TableList() {
  const { appState } = useAppStore();
  const [search, setSearch] = useState("");
  const tables = appState.tables.filter((table: TableType) => {
    if (!search) {
      return true;
    }
    return formatSchemaTable(table).includes(search);
  });
  useTableList();
  // TODO(DAN): table list loading state
  return (
    <div>
      <h3>Tables</h3>
      <Search
        onChange={(event: any) => setSearch(event.target.value)}
        search={search}
        onClear={() => setSearch("")}
      />
      {tables.map((table: TableType) => (
        <Table key={formatSchemaTable(table)} {...table} />
      ))}
    </div>
  );
}

type SearchProps = {
  onChange: (event: any) => void;
  search: string;
  onClear: () => void;
};

function Search(props: SearchProps) {
  const { search, onChange, onClear } = props;
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        autoFocus
        onChange={onChange}
        value={search}
      />
      {search.length > 0 && (
        <button type="button" onClick={onClear} className="clear-button">
          x
        </button>
      )}
    </div>
  );
}
