import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import { App } from "./app";

test("<App />", () => {
  const tree = TestRenderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
