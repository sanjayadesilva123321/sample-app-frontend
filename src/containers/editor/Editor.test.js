/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Editor from "./Editor";

import { AuthContext } from "../auth/AuthProvider";
import { checkProps, getByTestId } from "../../utils/TestUtils";

const defaultProps = {};

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={setupContextValues}>
        <Editor {...setupProps} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

test("validate props types", () => {
  checkProps(Editor, defaultProps);
});

describe("default component rendering tests", () => {
  test("Editor component should be available", () => {
    const componentWrapper = setup();
    const component = getByTestId(
      componentWrapper.container,
      "component-editor"
    );
    expect(component).toBeInTheDocument();
  });
});
