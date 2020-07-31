import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "./router";
import { AppProvider } from "./store";
import "./app.less";

export function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

const root = document.getElementById("root") || document.createElement("div");
ReactDOM.render(<App />, root);
