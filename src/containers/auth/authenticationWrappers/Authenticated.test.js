/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable react/jsx-no-constructed-context-values */
import { render } from "@testing-library/react";

import Authenticated from "./Authenticated";

import { AuthContext } from "../AuthProvider";

import { checkProps } from "../../../utils/TestUtils";

const defaultProps = {
  children: "Children Text",
};

const defaultContextValues = {
  isProcessing: true,
  isBackendAuthorized: true,
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };
  return render(
    <AuthContext.Provider value={setupContextValues}>
      <Authenticated {...setupProps} />
    </AuthContext.Provider>
  );
};

test("validate props types", () => {
  checkProps(Authenticated, defaultProps);
});

describe("isBackendAuthorized = true", () => {
  describe("isProcessing = true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test('"loading" component should be available', () => {
      expect(wrapper.getByTestId("component-loading")).toBeVisible();
    });
    test('"children" should not be available', () => {
      expect(
        wrapper.queryByText(defaultProps.children)
      ).not.toBeInTheDocument();
    });
  });
  describe("isProcessing = false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isProcessing: false });
    });
    test('"loading" component should not be available', () => {
      expect(
        wrapper.queryByTestId("component-loading")
      ).not.toBeInTheDocument();
    });
    test('"children" should be available', () => {
      expect(wrapper.getByText(defaultProps.children)).toBeVisible();
    });
  });
});
describe("isBackendAuthorized = false", () => {
  describe("isProcessing = true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isBackendAuthorized: false });
    });
    test('"loading" component should not be available', () => {
      expect(
        wrapper.queryByTestId("component-loading")
      ).not.toBeInTheDocument();
    });
    test('"children" should not be available', () => {
      expect(
        wrapper.queryByText(defaultProps.children)
      ).not.toBeInTheDocument();
    });
  });
  describe("isProcessing = false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({}, { isBackendAuthorized: false, isProcessing: false });
    });
    test('"loading" component should not be available', () => {
      expect(
        wrapper.queryByTestId("component-loading")
      ).not.toBeInTheDocument();
    });
    test('"children" should not be available', () => {
      expect(
        wrapper.queryByText(defaultProps.children)
      ).not.toBeInTheDocument();
    });
  });
});
