import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import Tables from "./tables";

test("<Tables />", () => {
  const tree = TestRenderer.create(<Tables />).toJSON();
  expect(tree).toMatchSnapshot();
});
