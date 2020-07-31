import * as React from "react";
import { lazy, Suspense } from "react";
import { useRoutes } from "hookrouter";

const Home = lazy(() => import("./home"));
const Tables = lazy(() => import("./tables"));

const routes = {
  "/": () => <Home />,
  "/tables": () => <Tables />,
  "/tables/:tableId": (params: any) => (
    <Tables currentTableId={params.tableId} />
  ),
};

export function Router() {
  const routeResult = useRoutes(routes);
  return <Suspense fallback={"Loading..."}>{routeResult || "404"}</Suspense>;
}
