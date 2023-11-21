/* eslint-disable no-import-assign */
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

import { AuthContext } from '../auth/AuthProvider';

import { checkProps, getByTestId, storeFactory } from '../../utils/TestUtils';

import reducerTypes from '../../store/reducerTypes';

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
  signOut: jest.fn(),
};

const initialState = {
  [reducerTypes.user]: {
    name: 'TestUserName',
  },
};

const store = storeFactory(initialState);

const setup = (props = {}, contextValues = {}) => {
  const setupProps = { ...props };
  const setupContextValues = { ...defaultContextValues, ...contextValues };

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthContext.Provider value={setupContextValues}>
          <Home {...setupProps} />
        </AuthContext.Provider>
      </BrowserRouter>
    </Provider>,
  );
};

test('validate props types', () => {
  checkProps(Home);
});

describe('default component rendering tests', () => {
  test('Home component should be available', () => {
    const componentWrapper = setup();
    const component = getByTestId(componentWrapper.container, 'home');
    expect(component).toBeInTheDocument();
  });

  test('Check if the user name is displayed', async () => {
    const setIsBackendAuthorized = jest.fn();

    act(() => {
      setup(
        {},
        {
          hasPermission: jest.fn(() => true), // Provide the necessary permissions
          setIsBackendAuthorized,
        },
      );
    });

    // Wait for the element to appear
    await waitFor(() => {
      expect(screen.getByText('You are logged in! - TestUserName')).toBeInTheDocument();
    });
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
      },
    );
    // Find the "Sign Out" button by its text content and click it
    const signOutButton = screen.getByTestId('home-sign-out');
    fireEvent.click(signOutButton);

    // Assertions for sign out
    expect(signOut).toHaveBeenCalled();
  });
});
