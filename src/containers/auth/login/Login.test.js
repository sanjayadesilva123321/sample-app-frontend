/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "./Login";
import { AuthContext } from "../AuthProvider";
const defaultProps = {};

const mockLoginUserFlow = jest.fn();

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
  loginUserFlow: mockLoginUserFlow,
};

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={setupContextValues}>
        <Login {...setupProps} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("Login component tests", () => {
  test("Renders the Login component", () => {
    setup();
    const signInHeader = screen.getByTestId("signin-button");
    expect(signInHeader).toBeInTheDocument();
  });
  test("Allows user to enter username and password", async () => {
    setup();
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    act(() => {
      fireEvent.change(usernameInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
    });
    await waitFor(
      () => expect(usernameInput).toHaveValue("testuser"),
      expect(passwordInput).toHaveValue("password123")
    );
  });

  test('Navigates to the registration page when "Sign Up" link is clicked', () => {
    setup();
    const signUpLink = screen.getByTestId("signup-span");
    fireEvent.click(signUpLink);
    // Add assertions for navigation to the registration page.
  });

  test("Calls loginUserFlow with correct values on form submission", async () => {
    setup();
    // Simulate form submission
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Wait for form submission
    await act(async () => {
      fireEvent.click(screen.getByTestId("signin-button"));
    });

    // Check if registerUserFlow is called with the correct values
    expect(mockLoginUserFlow).toHaveBeenCalledWith("testuser", "password123");
  });
});
