import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Register from './Register';

import { AuthContext } from '../AuthProvider';

import { getByTestId } from '../../../utils/TestUtils';

const mockRegisterUserFlow = jest.fn();

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
  registerUserFlow: mockRegisterUserFlow,
};

const setup = () =>
  render(
    <BrowserRouter>
      <AuthContext.Provider value={defaultContextValues}>
        <Register />
      </AuthContext.Provider>
    </BrowserRouter>,
  );

describe('Register component tests', () => {
  test('Renders the Register component', () => {
    const componentWrapper = setup();
    const component = getByTestId(componentWrapper.container, 'register');
    expect(component).toBeInTheDocument();
  });
  test('Allows user to enter username and password, confirmPassword', async () => {
    setup();
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    act(() => {
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'password123' },
      });
    });
    await waitFor(
      () => expect(usernameInput).toHaveValue('testuser'),
      expect(passwordInput).toHaveValue('password123'),
      expect(confirmPasswordInput).toHaveValue('password123'),
    );
  });

  test('Navigates to the Sign in page when "Sign In" link is clicked', () => {
    setup();
    const signUpLink = screen.getByTestId('register-signin_span');
    fireEvent.click(signUpLink);
    // Add assertions for navigation to the registration page.
  });

  test('Calls registerUserFlow with correct values on form submission', async () => {
    setup();
    // Simulate form submission
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    // Wait for form submission
    await act(async () => {
      fireEvent.click(screen.getByTestId('register-signup_button'));
    });

    // Check if registerUserFlow is called with the correct values
    expect(mockRegisterUserFlow).toHaveBeenCalledWith('testuser', 'password123');
  });
});
