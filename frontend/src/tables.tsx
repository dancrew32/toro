import * as React from "react";
import { useEffect } from "react";

import { Nav } from "./nav";
import { TableList } from "./tablelist";
import { Metrics } from "./metrics";
import { useAppStore } from "./store";

type TablesPropsType = {
  currentTableId?: number;
};

function useTitle() {
  // TODO(DAN): helper for getting current table from context, update title.
  useEffect(() => {
    document.title = "Tables & Metrics";
  }, []);
}

function useCurrentTableId(currentTableId: number) {
  const { appActions } = useAppStore();
  useEffect(() => {
    appActions.setCurrentTableId(currentTableId);
  }, [currentTableId]);
}

export default function Tables(props: TablesPropsType) {
  useTitle();
  useCurrentTableId(props.currentTableId);

  return (
    <div className="container">
      <Nav />
      <aside>
        <div className="inner">
          <TableList />
        </div>
      </aside>
      <main>
        <div className="inner">
          <Metrics />
        </div>
      </main>
    </div>
  );
}
