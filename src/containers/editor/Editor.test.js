import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Editor from './Editor';

import { AuthContext } from '../auth/AuthProvider';

import { checkProps, getByTestId } from '../../utils/TestUtils';

const defaultContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
};

const setup = () =>
  render(
    <BrowserRouter>
      <AuthContext.Provider value={defaultContextValues}>
        <Editor />
      </AuthContext.Provider>
    </BrowserRouter>,
  );

test('validate props types', () => {
  checkProps(Editor);
});

describe('default component rendering tests', () => {
  test('Editor component should be available', () => {
    const componentWrapper = setup();
    const component = getByTestId(componentWrapper.container, 'component-editor');
    expect(component).toBeInTheDocument();
  });
});
