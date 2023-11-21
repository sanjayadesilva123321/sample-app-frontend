import React from "react";
import { render } from "@testing-library/react";

import Layout from "./Layout";

test("renders the Layout component", () => {
  const { container } = render(<Layout />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const mainElement = container.querySelector("main.App");

  expect(mainElement).toBeInTheDocument();
});
