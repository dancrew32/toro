import * as React from "react";
import { createContext, useContext, useReducer, ReactNode } from "react";

import type { TableType, MetricType } from "./types";

type AppStateType = {
  currentTableId: number;
  tables: Array<TableType>;
  metrics: Array<MetricType>;
};

type ContextType = {
  appState: AppStateType;
  appActions: any;
};

type ActionType =
  | { type: "SET_CURRENT_TABLE_ID"; currentTableId: number }
  | { type: "SET_TABLES"; tables: Array<TableType> }
  | { type: "SET_METRICS"; metrics: Array<MetricType> };

type ProviderPropsType = {
  children: ReactNode;
};

const initialState: AppStateType = {
  currentTableId: null,
  tables: [],
  metrics: [],
};

const Context = createContext<ContextType>({
  appState: initialState,
  appActions: null,
});

function reducer(state: AppStateType, action: ActionType) {
  switch (action.type) {
    case "SET_CURRENT_TABLE_ID":
      return { ...state, currentTableId: action.currentTableId };
    case "SET_TABLES":
      return { ...state, tables: action.tables };
    case "SET_METRICS":
      return { ...state, metrics: action.metrics };
    default:
      throw new Error(`Invalid action ${action}`);
  }
}

function mapReducer(dispatch: any) {
  return {
    setCurrentTableId: (currentTableId: number) =>
      dispatch({ type: "SET_CURRENT_TABLE_ID", currentTableId }),
    setTables: (tables: Array<TableType>) =>
      dispatch({ type: "SET_TABLES", tables }),
    setMetrics: (metrics: Array<MetricType>) =>
      dispatch({ type: "SET_METRICS", metrics }),
  };
}

export function AppProvider(props: ProviderPropsType) {
  const [appState, appDispatch] = useReducer(reducer, initialState);
  const appActions = mapReducer(appDispatch);
  return (
    <Context.Provider value={{ appState, appActions }}>
      {props.children}
    </Context.Provider>
  );
}

export function useAppStore() {
  return useContext(Context);
}
