/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Home from "./Home";
import store from "../../store/store";

import { AuthContext } from "../auth/AuthProvider";
import { checkProps, getByTestId } from "../../utils/TestUtils";
import * as userSelector from "../../store/selectores/user";

const defaultProps = {};

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
  signOut: jest.fn(),
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };

  // Mock the userName selector here
  userSelector.userName = jest.fn(() => "TestUserName");

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthContext.Provider value={setupContextValues}>
          <Home {...setupProps} />
        </AuthContext.Provider>
      </BrowserRouter>
      ,
    </Provider>
  );
};

test("validate props types", () => {
  checkProps(Home, defaultProps);
});

describe("default component rendering tests", () => {
  test("Home component should be available", () => {
    const componentWrapper = setup();
    const component = getByTestId(componentWrapper.container, "component-home");
    expect(component).toBeInTheDocument();
  });

  test("Check if the user name is displayed", () => {
    const setIsBackendAuthorized = jest.fn();
    userSelector.userName = jest.fn(() => "TestUserName");
    setup(
      {},
      {
        hasPermission: jest.fn(() => true), // Provide the necessary permissions
        setIsBackendAuthorized,
      }
    );
    expect(
      screen.getByText("You are logged in! - TestUserName")
    ).toBeInTheDocument();
  });

  test('Clicking "Sign Out" button should trigger sign out', () => {
    const signOut = jest.fn();
    const setIsBackendAuthorized = jest.fn();
    setup(
      {},
      {
        hasPermission: jest.fn(() => true), // Provide the necessary permissions
        signOut,
        setIsBackendAuthorized,
      }
    );
    // Find the "Sign Out" button by its text content and click it
    const signOutButton = screen.getByTestId("sign-out-button");
    fireEvent.click(signOutButton);

    // Assertions for sign out
    expect(signOut).toHaveBeenCalledWith();
  });
});
